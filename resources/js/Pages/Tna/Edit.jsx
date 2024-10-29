import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import DateTimePicker from '@/Components/Form/DateTimePicker';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Edit = ({ tna, options }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('tnas.index'), text: 'TNA' },
	];
  
  const { course, bu, dept, position, user, title, objective, participant, training_time, location, trainer} = tna.data;
  const { courses, bus, depts, positions, users } = options;
  const trainingTime = new Date(training_time);

  const objectValue = (data) => {
    const arrObject = Object.values(data);
    return arrObject.map(item => item.value);
  }

  const arrayValue = (data) => {
    return data.map(item => item.value);
  }

  const { data, setData, patch, errors, processing } = useForm({
    courses: objectValue(course),
    courseSelected: Object.values(course),
		bu: bu.value,
		buSelected: bu,
		dept: dept.value,
    deptSelected: dept,
    positions:  objectValue(position),
    positionSelected: Object.values(position),
    users: objectValue(user),
    userSelected: Object.values(user),
    title: title,
    objective: objective,
    participant: participant,
    trainingTime: trainingTime.toISOString(),
    location: location,
    trainer: trainer,
	});

  const handleCourseChange = (option) => {
		const courseId = arrayValue(option);

		setData((prevData) => ({
			...prevData,
			courses: courseId,
			courseSelected: option
		}));
	}

	const handleDeptChange = (option) => {
		setData((prevData) => ({
			...prevData,
			dept: option.value,
			deptSelected: option,
		}));
	}
  const currentDeptOpt = depts.filter(dept => dept.bu_id === data.bu);
  const [optionDept, setDept] = useState(currentDeptOpt);
  const [optionPosition, setPosition] = useState(positions);
  const [optionUser, setUser] = useState(users);

  const handleBuChange = async (bu) => {
		const deptOptions = depts.filter(dept => dept.bu_id === bu.value);

    // Reset dependent fields
    setData((prevData) => ({
      ...prevData,
      bu: bu.value,
			buSelected: bu,
			dept: '',
			deptSelected: [],
      positions: [],
      positionSelected: [],
      users: [],
      userSelected: [],
    }));

		// Clear the options for departments, positions, and users
		setUser([]);
		setPosition([]);
    setDept(deptOptions);
    try {
      const response = await axios.get(route('buPosition'), {
        params: {buId: bu.value},
      });

      if(response.status === 200) {
        setPosition(response.data.positions);
      }
      
    } catch (error) {
      console.error(error, 'There\'s something was wrong when bu change');
    }
  }

  const handlePositionChange = async (position) => {
    const positionId = arrayValue(position);
		
		setData((prevData) => ({
      ...prevData,
      positions: positionId,
			positionSelected: position,
      users: [],
    }));
		setUser([]);

    try {
      const response = await axios.get(route('userPosition'), {
        params: {
          buId: data.bu.value,
          positions: positionId
        },
      });

      if(response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error, 'There\'s something was wrong when position change');
    }
  }

  const handleUserChange = (option) => {
		const userId = arrayValue(option);

		setData((prevData) => ({
			...prevData,
			users: userId,
			userSelected: option,
		}));
	}
  
  const handleParticipantChange = (e) => {
		const value = parseInt(e.target.value);
		setData('participant', isNaN(value) ? '' : value);
	}

  const submit = (e) => {
		e.preventDefault();
		patch(route('tnas.update', tna.data));
	}

  return (
    <div className='content-box'>
      <Breadcrumb title='Edit TNA' pageName='Edit' prevPage={prevPage} />

      <form onSubmit={submit} className='w-full'>
        {/* Select Course */}
        <FieldGroup 
          label='Course'
          name='course'
          error={errors.course}
          isPrimary={true}
        >
          <Select
            isMulti
            options={convertOptions(courses)}
            value={data.courseSelected}
            onChange={handleCourseChange}
          />
        </FieldGroup>

        {/* Select BU */}
        <FieldGroup 
          label='Business Unit'
          name='bu'
          error={errors.bu}
          isPrimary={true}
        >
          <Select
            options={convertOptions(bus)}
            value={data.buSelected}
            onChange={handleBuChange}
          />
        </FieldGroup>

        {/* Select Dept */}
        <FieldGroup 
          label='Department'
          name='dept'
          error={errors.dept}
          isPrimary={true}
        >
          <Select
            options={optionDept}
            value={data.deptSelected}
            onChange={handleDeptChange}
          />
        </FieldGroup>

        {/* Input Title */}
				<FieldGroup 
					label='Title'
					name='title'
					error={errors.title}
					isPrimary={true}
				>
					<TextInput
						name='title'
						className="mt-1 block w-full"
						value={data.title}
						onChange={(e) => setData('title', e.target.value)}
						required
						autoComplete="tna_title"
						placeholder="TNA Title..."
					/>
				</FieldGroup>

        {/* Input Objective */}
        <FieldGroup 
          label='Objective'
          name='objective'
          error={errors.objective}
          isPrimary={true}
        >
          <TextInput
            name='objective'
            className="mt-1 block w-full"
            value={data.objective}
            onChange={(e) => setData('objective', e.target.value)}
            required
            autoComplete="objective"
            placeholder="TNA Objective..."
          />
        </FieldGroup>

        {/* Input Total Participants */}
        <FieldGroup 
          label='Estimated Participants'
          name='participant'
          error={errors.participant}
          isPrimary={true}
        >
         <TextInput
            name="participant"
            type="number"
            min="0"
            value={data.participant}
            onChange={handleParticipantChange}
            className="mt-1 block w-full"
            required
            autoComplete="participant"
						placeholder="Estimated Total Participants..."
          />
        </FieldGroup>

        {/* Input Start Time */}
        <FieldGroup 
          label='Training Time'
          name='trainingTime'
          error={errors.trainingTime}
          isPrimary={true}
        >
          <DateTimePicker 
            value={data.trainingTime}
            currentDate={data.start_time}
            onChange={(value) => setData('trainingTime', value)}
            className='mt-1 block w-full'
            name='trainingTime'
            placeholder='Select start datetime...'
            required
          />
        </FieldGroup>

        {/* Input Location */}
        <FieldGroup 
          label='Location'
          name='location'
          error={errors.location}
          isPrimary={true}
        >
          <TextInput
            name='location'
            className="mt-1 block w-full"
            value={data.location}
            onChange={(e) => setData('location', e.target.value)}
            required
            autoComplete="location"
            placeholder="Training Location..."
          />
        </FieldGroup>

        {/* Input Trainer */}
        <FieldGroup 
          label='Trainer'
          name='trainer'
          error={errors.trainer}
          isPrimary={true}
        >
          <TextInput
            name='trainer'
            className="mt-1 block w-full"
            value={data.trainer}
            onChange={(e) => setData('trainer', e.target.value)}
            required
            autoComplete="trainer"
            placeholder="Training Instructor..."
          />
        </FieldGroup>

        {/* Select Position */}
        <FieldGroup 
          label='Position'
          name='positions'
          error={errors.position}
          isPrimary={true}
        >
          <Select
            isMulti
            options={optionPosition}
            value={data.positionSelected}
            onChange={handlePositionChange}
          />
        </FieldGroup>

        {/* Select User */}
        <FieldGroup 
          label='User'
          name='users'
          error={errors.users}
          isPrimary={true}
        >
          <Select
            isMulti
            options={optionUser}
            value={data.userSelected}
            onChange={handleUserChange}
          />
        </FieldGroup>

        <PrimaryButton disabled={processing}>
          Submit
        </PrimaryButton>
      </form>
    </div>
  );
}

Edit.layout = page => (
  <DashboardLayout title='TNA Edit' children={page} />
);

export default Edit;
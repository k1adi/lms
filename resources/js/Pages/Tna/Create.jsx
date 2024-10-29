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

const Create = ({ depts, bus, courses }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('tnas.index'), text: 'TNA' },
	];

  const { data, setData, post, errors, processing } = useForm({
    courses: [],
		courseSelected: [],
		bu: '',
		buSelected: '',
		dept: '',
		deptSelected: '',
    positions: [],
    positionSelected: [],
    users: [],
		userSelected: [],
    title: '',
    objective: '',
    participant: '',
    trainingTime: '',
    location: '',
    trainer: '',
	});
	
	const handleCourseChange = (option) => {
		const courseId = option.map(item => item.value);

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

  const [deptOpts, setDeptOpts] = useState([]);
  const [positions, setPosition] = useState([]);
  const [users, setUser] = useState([]);

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
    }));

		setDeptOpts(deptOptions);
		// Clear the options for positions, and users
		setPosition([]);
		setUser([]);
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
    const positionId = position.map(option => option.value);
		
		setData((prevData) => ({
      ...prevData,
			positions: positionId,
			positionSelected: position,
      users: [],
    }));
		setUser([]);

		if(position.length !== 0) {
			try {
				const response = await axios.get(route('userPosition'), {
					params: {
						buId: data.bu,
						positions: positionId
					},
				});
	
				if(response.status === 200) {
					setUser(response.data.users);
				}
			} catch (error) {
				console.error(error, 'There\'s something was wrong when position change');
			}
		}
  }

	const handleUserChange = (option) => {
		const userId = option.map(item => item.value);
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
		post(route('tnas.store'))
	}

  return (
    <div className='content-box'>
			<Breadcrumb title='Create TNA' pageName='Create' prevPage={prevPage} />

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
            options={deptOpts}
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
						minDate='today'
            value={data.trainingTime}
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
					error={errors.positions}
					isPrimary={true}
				>
					<Select
            isMulti
            options={positions}
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
            options={users}
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

Create.layout = page => (
  <DashboardLayout title='TNA Create' children={page} />
)

export default Create;
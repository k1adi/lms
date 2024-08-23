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

const Create = ({ bus, courses }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('tnas.index'), text: 'TNA' },
	];

  const { data, setData, post, errors, processing } = useForm({
    course: '',
		bu: null,
		dept: '',
    positions: [],
    users: [],
    objective: '',
    participant: '',
    trainingTime: '',
    location: '',
    trainer: '',
	});

  const [depts, setDept] = useState([]);
  const [positions, setPosition] = useState([]);
  const [users, setUser] = useState([]);

  const handleBuChange = async (bu) => {
    setData('bu', bu);
    // Reset dependent fields
    setData((prevData) => ({
      ...prevData,
      dept: '',
      positions: [],
      users: [],
    }));

		// Clear the options for departments, positions, and users
		setDept([]);
		setPosition([]);
		setUser([]);
    try {
      const response = await axios.get(route('deptPosition'), {
        params: {buId: bu.value},
      });

      if(response.status === 200) {
        setDept(response.data.depts);
        setPosition(response.data.positions);
      }
      
    } catch (error) {
      console.error(error, 'There\'s something was wrong when bu change');
    }
  }

  const handlePositionChange = async (position) => {
    setData('positions', position);
    const selectedPosition = position.map(option => option.value);
		
		setData((prevData) => ({
      ...prevData,
      users: [],
    }));
		setUser([]);

    try {
      const response = await axios.get(route('userPosition'), {
        params: {
          buId: data.bu.value,
          positions: selectedPosition
        },
      });

      if(response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error, 'There\'s something was wrong when position change');
    }
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
            options={convertOptions(courses)}
            value={data.course}
            onChange={(option) => setData('course', option)}
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
            value={data.bu}
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
            options={depts}
            value={data.dept}
            onChange={(option) => setData('dept', option)}
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
						name='participant'
						className="mt-1 block w-full"
						value={+data.participant}
						onChange={(e) => setData('participant', +e.target.value)}
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
            value={data.positions}
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
            value={data.users}
            onChange={(option) => setData('users', option)}
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
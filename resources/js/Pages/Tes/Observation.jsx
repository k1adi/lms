import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import TextInput from '@/Components/TextInput';
import FieldGroup from '@/Components/Form/FieldGroup';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Observation = ({ assignments }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Assignment' },
		{ link: route('tests.index'), text: 'Test' },
	];

  const [users, setUser] = useState([]);
  const { data, setData, post, errors, processing } = useForm({
		assignment_id: '',
    selectAssignment: '',
    user_id: '',
    selectUser: '',
    score: '',
    status: '',
    selectStatus: ''
	});

  const handleSelectAssignment = async (option) => {
    setUser([]);
    setData((prevData) => ({
      ...prevData,
      selectAssignment: option,
      assignment_id: option.value,
      user_id: '',
      selectUser: ''
    }));

    try {
      const assignment = assignments.find(data => data.id === option.value);

      const response = await axios.get(route('observation.user'), {
        params: {positions: assignment.position}
      });

      if(response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error, 'There\'s something was wrong when assignment change');
    }
  }

  const handleSelectUser = (option) => {
    setData((prevData) => ({
      ...prevData,
      selectUser: option,
      user_id: option.value,
    }));
  }

  const handleSelectStatus = (option) => {
    setData((prevData) => ({
      ...prevData,
      status: option.value,
      selectStatus: option,
    }));
  }

  const handleScoreChange = (e) => {
    const value = Math.max(0, Math.min(100, parseInt(e.target.value))); // Ensure value is between 0 and 100
    setData('score', isNaN(value) ? '' : value); // Handle NaN for invalid input
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('observation.store'))
  }

  return (
    <div className='content-box'>
      <Breadcrumb pageName='Observation Summary' prevPage={prevPage}/>
      <form onSubmit={submit} className='w-full'>
        <FieldGroup
          label='Assignment'
          name='assignment'
          error={errors.assignment_id}
          isPrimary={true}
        >
          <Select
            options={convertOptions(assignments, 'code')}
            value={data.selectAssignment}
            onChange={handleSelectAssignment}
          />
        </FieldGroup>
        
        <FieldGroup
            label='User'
            name='user'
            error={errors.user_id}
            isPrimary={true}
          >
          <Select
            options={users}
            value={data.selectUser}
            onChange={handleSelectUser}
          />
        </FieldGroup>

        <FieldGroup
          label="Score"
          name="score"
          error={errors.score}
          isPrimary={true}
        >
          <TextInput
            name="score"
            type="number"
            min="0"
            max="100"
            value={data.score}
            onChange={handleScoreChange}
            className="mt-1 block w-full"
            placeholder="Score (0-100)..."
            required
          />
        </FieldGroup>

        <FieldGroup 
					label='Status'
					name='status'
					error={errors.status}
					isPrimary={true}
				>
					<Select
						name='status'
						placeholder={'Select Status...'}
            options={[
							{value: '0', label: 'Tidak Lulus'},
							{value: '1', label: 'Lulus' }
						]}
            value={data.selectStatus}
            onChange={handleSelectStatus}
						className='mt-1 block w-full'
						required
          />
				</FieldGroup>

        <PrimaryButton disabled={processing}>
          Submit
        </PrimaryButton>
      </form>
    </div>
  )
}

Observation.layout = (page) => (
  <DashboardLayout title='Input Observation' children={page} />
);

export default Observation;
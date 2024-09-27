import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';
import { Plus, Trash2 } from 'lucide-react';

const Create = ({ courses }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('tests.index'), text: 'Test' },
	];

  const { data, setData, post, errors, processing } = useForm({
    course_id: '',
    selectCourse: '',
		// access_time: '',
		minimum_score: '',
    type: '',
    selectType: '',
    questions: [{
      text:  '',
      answers: [
        { text: '', is_correct: '', }
      ],
    }],
	});

  const handleSelectCourse = (option) => {
    setData((prevData) => ({
      ...prevData,
      course_id: option.value,
      selectCourse: option,
    }));
  }

  const handleSelectType = (option) => {
    setData((prevData) => ({
      ...prevData,
      type: option.value,
      selectType: option,
    }));
  }

  const handleScoreChange = (e) => {
    const value = Math.max(0, Math.min(100, parseInt(e.target.value))); // Ensure value is between 0 and 100
    setData('minimum_score', isNaN(value) ? '' : value); // Handle NaN for invalid input
  };

  const handleAddQuestion = () => {
    setData('questions', [...data.questions, { text: '', answers: [{ text: '', is_correct: '' }]}]);
  }

  const handleRemoveQuestion = (qIndex) => {
    const questions = data.questions.filter((_, i) => i !== qIndex);
    setData('questions', questions);
  }

  // const handleAddAnswer = (qIndex) => {
  //   const questions = [...data.questions];
  //   questions[qIndex].answers.push({ text: '', is_correct: '' });
  //   setData('questions', questions);
  // }
  // const handleRemoveAnswer = (qIndex, aIndex) => {
  //   const questions = [...data.questions];
  //   questions[qIndex].answers = questions[qIndex].answers.filter((_, i) => i !== aIndex);
  //   setData('questions', questions);
  // }

  const submit = (e) => {
		e.preventDefault();
		post(route('tests.store'))
	}

  return (
    <form onSubmit={submit} className='w-full'>
      <div className='content-box'>
        <Breadcrumb pageName='Create Test' prevPage={prevPage}/>

        {/* Course */}
        <FieldGroup 
					label='Course'
					name='selectCourse'
					error={errors.course}
					isPrimary={true}
				>
					<Select
						name='selectCourse'
						placeholder={'Select Course...'}
            options={convertOptions(courses)}
            value={data.selectCourse}
            onChange={handleSelectCourse}
						className='mt-1 block w-full'
						required
          />
				</FieldGroup>
        
        {/* Type */}
        <FieldGroup 
					label='Course Type'
					name='type'
					error={errors.type}
					isPrimary={true}
				>
        <Select
						name='type'
						placeholder={'Select Type...'}
            options={[
							{value: 'knowledge', label: 'Knowledge'},
							{value: 'skill', label: 'Skill'}
						]}
            value={data.selectType}
            onChange={handleSelectType}
						className='mt-1 block w-full'
						required
          />
				</FieldGroup>

        {data.type == 'knowledge' && (
        <>
          {/* Minimum Score */}
          <FieldGroup
            label="Minimum Score"
            name="minimumScore"
            error={errors.minimum_score}
            isPrimary={true}
          >
            <TextInput
              name="minimumScore"
              type="number"
              min="0"
              max="100"
              value={data.minimum_score}
              onChange={handleScoreChange}
              className="mt-1 block w-full"
              placeholder="Minimum score (0-100)..."
              required
            />
          </FieldGroup>

          {/* Access Time */}
          {/* <FieldGroup 
            label='Access Time'
            name='accessTime'
            error={errors.access_time}
          >
            <DateTimePicker 
              minDate='today'
              withTime={false}
              value={data.access_time}
              onChange={(value) => setData('access_time', value)}
              className='mt-1 block w-full'
              name='accessTime'
              placeholder='Select access time...'
            />
          </FieldGroup> */}
        </>
        )}

        {data.type !== 'knowledge' && (
          <PrimaryButton disabled={processing}>
            Submit
          </PrimaryButton>
        )}
      </div>

      {data.type == 'knowledge' && (
				<div className='content-box mt-2'>
					<div className='flex flex-row items-center justify-between'>
						<h2 className='text--sub-heading'>Question</h2>
						<button className='btn btn--primary' type='button' onClick={handleAddQuestion}>
							<Plus />
						</button>
					</div>
				</div>
			)}
      
      {data.type == 'knowledge' && data.questions.map((question, qIndex) => (
        <div className='content-box mt-2' key={qIndex}>
          <FieldGroup
						label={`Question no. ${qIndex + 1}`}
						name={`questions.${qIndex}.text`}
						error={errors[`questions.${qIndex}.text`]}
					>
						<div className='flex flex-row items-end gap-x-2'>
							<TextInput
								name={`questions.${qIndex}.text`}
								className='flex-1 mt-1'
								value={question.text}
								onChange={(e) => {
									const questions = [...data.questions];
									questions[qIndex].text = e.target.value;
									setData('questions', questions);
								}}
								placeholder='Question Text...'
							/>
							<button className='btn btn--danger' type='button' onClick={() => handleRemoveQuestion(qIndex)}>
								<Trash2 />
							</button>
						</div>
					</FieldGroup>

          {/* <div className='flex flex-row items-center justify-between mt-5 mb-3'>
						<h2 className='text--sub-heading'>Answer</h2>
						<button className='btn-sm btn--primary' type='button' onClick={() => handleAddAnswer(qIndex)}>
							<Plus size={18} />
						</button>
					</div> */}

          {/* Answer */}
          {[...Array(3)].map((_, aIndex) => {
            // Check if the answer already exists, otherwise provide a default empty answer.
            const answer = question.answers[aIndex] || { text: '', is_correct: false };

            return (
              <div className='flex flex-row items-center gap-2 mt-2' key={aIndex}>
                <input
                  type="checkbox"
                  name={`questions.${qIndex}.answers.${aIndex}.isCorrect`}
                  checked={answer.is_correct}
                  value={answer.is_correct}
                  onChange={() => {
                    const questions = [...data.questions];
                    questions[qIndex].answers = questions[qIndex].answers.map((ans, idx) => ({
                      ...ans,
                      is_correct: idx === aIndex,
                    }));
                    setData('questions', questions);
                  }}
                />
                <div className='flex-1'>
                  <TextInput
                    name={`questions.${qIndex}.answers.${aIndex}.text`}
                    className='w-full'
                    value={answer.text}
                    onChange={(e) => {
                      const questions = [...data.questions];
                      questions[qIndex].answers[aIndex] = {
                        ...answer,
                        text: e.target.value,
                      };
                      setData('questions', questions);
                    }}
                    placeholder='Answer Text...'
                  />
                  <InputError message={errors[`questions.${qIndex}.answers.${aIndex}.name`]} className='mt-2' />
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {data.type == 'knowledge' && (
        <div className='content-box mt-2 text-center'>
          <PrimaryButton className='w-full justify-center' disabled={processing}>
            Submit
          </PrimaryButton>
        </div>
      )}
    </form>
  );
}

Create.layout = (page) => (
  <DashboardLayout title='Tes Create' children={page} />
)

export default Create;
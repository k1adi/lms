import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import PrimaryButton from '@/Components/PrimaryButton';

const Test = ({ assignment }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
    { link: route('training.online.index'), text: 'Online' },
	];

  const { data, setData, post, errors, processing } = useForm({
    id: assignment.id,
    answers: {},  // answers will be an object containing questionId: answerId
  });

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setData({
      ...data,
      answers: { ...data.answers, [questionId]: answerId }
    });
  };

  // Submit the selected answers to Laravel
  const submit = (e) => {
    e.preventDefault();
    post(route('training.test.validate'));
  };

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb pageName='Training Test' prevPage={prevPage} className='mb-0' />
      </div>
      <form onSubmit={submit} className='content-box'>
        {assignment.questions.map((question, qIndex) => (
          <div className='mb-4' key={qIndex}>
            <p>{qIndex + 1}. {question.text}</p>
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className='mb-1'>
                <label name={`${qIndex}.answers.${aIndex}`}>
                  <input
                    type="radio"
                    name={`${qIndex}.answers.${aIndex}`}
                    value={answer.id}
                    checked={data.answers[question.id] === answer.id}
                    onChange={() => handleAnswerSelect(question.id, answer.id)}
                  />
                  <span className='ml-2'>{answer.text}</span>
                </label>
              </div>
            ))}
            {errors.answers && <div className="text-red-500">{errors.answers}</div>}
          </div>
        ))}
        <PrimaryButton disabled={processing}>
          Submit
        </PrimaryButton>
      </form>
    </>
  );
}

Test.layout = (page) => (
  <DashboardLayout title='Training Test' children={page}/>
);

export default Test;
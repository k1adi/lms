export default function FieldGroup({ label, name, error = '', isPrimary, children, className }) {
  return (
    <div className={'mb-3 ' + className}>
      {label && (
        <label className='block text-gray-800 select-none' htmlFor={name}>
          {label} {isPrimary && <span className='text-danger font-bold'>*</span> }
        </label>
      )}
      {children}
      {error != '' && <div className='text-red-600 dark:text-red-400 mt-2 text-sm'>{error}</div>}
    </div>
  );
}
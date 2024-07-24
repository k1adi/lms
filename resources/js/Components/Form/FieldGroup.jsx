export default function FieldGroup({ label, name, error, isPrimary, children }) {
  return (
    <div className='mb-3'>
      {label && (
        <label className='block text-gray-800 select-none' htmlFor={name}>
          {label} {isPrimary && <span className='text-danger font-bold'>*</span> }
        </label>
      )}
      {children}
      {error && <div className='text-danger mt-2 text-sm'>{error}</div>}
    </div>
  );
}
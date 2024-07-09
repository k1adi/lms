export default function SelectOption({
  className = '',
  currentValue = '',
  options = [],
  ...props}
){
  return (
    <select
      {...props}
      defaultValue={currentValue}
      className={
        'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
        className
      }
    >
      {options?.map(({value, label}, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
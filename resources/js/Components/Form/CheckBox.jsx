import { useRef } from 'react';

const CheckBox = ({ ...props }) => {
  const checkboxRef = useRef(null);

  const handleCheckboxChange = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }
  };

  return (
    <div>
      <label htmlFor="checkboxLabel" className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabel"
            className="sr-only"
            ref={checkboxRef}
            onChange={handleCheckboxChange}
            {...props}
          />
        </div>
        <div
          className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
            checkboxRef.current?.checked ? 'border-primary bg-gray dark:bg-transparent' : ''
          }`}
        >
          <span className={`opacity-0 ${checkboxRef.current?.checked ? 'opacity-100' : ''}`}>
            <svg
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0915 0.951976L0.946154 7.11008L0.0812867 6.15482L0.946154 6.15398"
                fill="#3056D3"
                stroke="#3056D3"
              />
            </svg>
          </span>
        </div>
      </label>
    </div>
  );
};

export default CheckBox;

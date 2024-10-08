import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, disabled = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    const styleEnable = 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm';
    
    const styleDisable = 'rounded-md shadow-sm border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700'

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={`${(disabled ? styleDisable : styleEnable)} ${className}`}
            ref={input}
            readOnly={disabled}
            disabled={disabled}
        />
    );
});

import React, { useId } from "react";
const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    divWidth="w-full",
    errors='',
    ...props
}, ref) {
    const id = useId()
    const name = props.name || '';
    return (
        <div className={`${divWidth}`}>
            {label && <label
                className="inline-block mb-1 pl-1"
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
            {errors && errors[name] && (
                <span className="text-red-500">{errors[name].message}</span>
            )}
        </div>
    )
})
export default Input
import React from "react";

function Button({
    children,
    type = 'button',
    bgColor = 'bg-black',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg hover:bg-opacity-10 hover:text-black hover:font-semibold ${bgColor} ${textColor} ${className}`}{...props}>
            {children}
        </button>
    )
}
export default Button
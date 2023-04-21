import React from 'react';

const Button = ({ title }) => {
    return (
        <button className='w-[300px] font-bold text-white bg-green-400 h-14 flex place-items-center'>
            {title}
        </button>
    );
}

export default Button;
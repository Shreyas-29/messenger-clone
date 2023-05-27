'use client';

import React from 'react';
import ReactSelect from 'react-select';


interface SelectProps {
    disabled?: boolean;
    label: string;
    options: Record<string, any>[];
    onChnage: (value: Record<string, any>) => void;
    value: Record<string, any>;
}

const Select: React.FC<SelectProps> = ({
    disabled,
    label,
    options,
    onChnage,
    value
}) => {
    return (
        <div className='z-[100]'>
            <label className='block text-sm text-gray-800 font-medium leading-6'>
                {label}
            </label>
            <div className='mt-2'>
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChnage}
                    isMulti
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 999
                        })
                    }}
                    classNames={{
                        control: () => 'text-sm'
                    }}
                />
            </div>
        </div>
    )
}

export default Select

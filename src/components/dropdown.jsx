import React, { useState, useEffect } from 'react';

const Dropdown = ({ options, defaultValue, onChange, onBlur, label }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className='w-100 d-flex flex-column'>
      <label htmlFor={label}>{label}</label>
      <select value={selectedValue} onBlur={onBlur} id={label} className='dropdown' onChange={handleSelectChange}>
        {defaultValue && 
                <option value={"default"}>
                {defaultValue}
              </option>
              }
        {options.map((option, i) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
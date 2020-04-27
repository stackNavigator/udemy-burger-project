import React from 'react'

import classes from './Input.css'

const Input = ({ elementType, elementConfig, value, changed, invalid, shouldValidate, touched }) => {
  const { Input, InputElement, Label, Invalid } = classes
  let inputElement = null
  const inputClasses = [InputElement]
  if (invalid && shouldValidate && touched)
    inputClasses.push(Invalid)
  switch (elementType) {
    case 'input':
      inputElement = <input
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed} />
      break
    case 'textarea':
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed} />
      break
    case 'select':
      inputElement = <select
        className={inputClasses.join(' ')}
        value={value}
        onChange={changed}>
        {elementConfig.options.map(({ value, displayValue }) => <option key={value} value={value}>
          {displayValue}
        </option>)}
      </select>
      break
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed} />
  }
  return (
    <div className={Input}>
      <label className={Label}></label>
      {inputElement}
    </div>
  )
}

export default Input
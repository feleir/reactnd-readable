import React from 'react'
import {
  FormGroup,
  FormControl
} from 'react-bootstrap'

export function capitalize (str = '') {
    return typeof str !== 'string'
      ? ''
      : str[0].toUpperCase() + str.slice(1)
  }

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function renderField(field) {
  const { meta: { touched, error } } = field;
  const className = touched && error ? 'error': null;
  
  return (
      <FormGroup validationState={className}>
          <label>{field.label}</label>
          <FormControl
              type="text"
              {...field.input}
          />
          <div className="text-help">
              {touched ? error : ''}
          </div>
      </FormGroup>
  );
}
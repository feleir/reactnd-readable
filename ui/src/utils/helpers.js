import React from 'react'
import TextField from 'material-ui/TextField';

export const toolbarStyles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    firstIcon: {
        marginLeft: 'auto'
    },
    toolbar: {
        backgroundColor: 'transparent'
    }
}

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
  const { meta: { error } } = field;
  
  return (
      <div>
        <TextField
            hintText={field.label}
            {...field.input}
            errorText={error}
            fullWidth={true}
            multiLine={field.multiLine}
            rows={field.rows}
        />
    </div>
  )
}
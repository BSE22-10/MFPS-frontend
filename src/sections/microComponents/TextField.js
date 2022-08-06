import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

export const TextField1 = ({ ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  var name = props.name;
  // if(meta.error){
  //   isetSu
  // }
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '5px', marginTop: '10px' }}>
        <label>
          {props.label}
          <span style={{ color: 'red' }}>{props.isRequired ? '*' : ''}</span>
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          type={props.type}
          // min={props.min}
          placeholder={props.placeholder}
          {...field}
          helperText={errorText}
          InputProps={{
            inputProps: { min: 0 },
          }}
          error={!!errorText}
          variant="outlined"
          fullWidth
          sx={{
            input: {
              color: '#542A52',
              height: '6px',
            },
          }}
        />
      </div>
    </div>
  );
};

import React from 'react';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { useField } from 'formik';

export default function SelectField({ ...props }) {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '5px', marginTop: '10px' }}>
        <label>
          {props.label}
          <span style={{ color: 'red' }}>{props.isRequired ? '*' : ''}</span>
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <FormControl
          style={{
            width: '100%',
          }}
        >
          <Select
            fullWidth
            as={Select}
            //  value={props.values.gender}
            defaultValue={props.MenuItems[0]['value']}
            value="Male"
            name={props.name}
            id={props.id}
            {...field}
            helperText={errorText}
            error={!!errorText}
            variant="outlined"
            sx={{
              color: '#542A52',
              height: '40px',
            }}
          >
            {!!props.MenuItems?.length &&
              props.MenuItems.map((menuItem) => {
                return (
                  <MenuItem value={menuItem.value} key={menuItem.value}>
                    {menuItem.value}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

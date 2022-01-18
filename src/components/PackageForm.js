import { Button, CircularProgress, MenuItem, TextField } from '@material-ui/core';
import React from 'react'
import { sizes, weights } from '../static/enums';

const PackageForm = ({ onSubmit, classes, packageInfo, onChange, loading}) => {
  return (
    <form onSubmit={onSubmit} className={classes.form} autoComplete="off" >
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Name"
        className={classes.textField}
        value={packageInfo.name}
        onChange={onChange}
        required
      />
      <TextField
        select
        margin="normal"
        name="weight"
        label="Weight"
        className={`${classes.textField} ${classes.textFieldSmall}`}
        value={packageInfo.weight}
        onChange={onChange}
        required
      >
        {weights.map((item, index) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        margin="normal"
        name="size"
        label="Size"
        className={`${classes.textField} ${classes.textFieldSmall}`}
        value={packageInfo.size}
        onChange={onChange}
        required
      >
        {sizes.map((item, index) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
      </TextField>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        color="primary"
      >
        {loading ? <CircularProgress size={24} /> : 'Create'}
      </Button>
    </form>
  );
};

export default PackageForm;

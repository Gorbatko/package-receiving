import React from 'react';
import { Button, CircularProgress, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { sizes, weights } from '../static/enums';

const AreaForm = ({ onSubmit, classes, areaInfo, onChange, loading }) => {
  return (
    <form onSubmit={onSubmit} className={classes.form} autoComplete="off" >
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Name"
        className={classes.textField}
        value={areaInfo.name}
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        type="number"
        margin="normal"
        name="priority"
        label="Priority"
        className={classes.textField}
        value={areaInfo.priority}
        onChange={onChange}
        required
      />
      <FormControl margin="normal" required className={`${classes.textField} ${classes.textFieldSmall}`}
      >
        <InputLabel id="weight-label">Weight</InputLabel>
        <Select
          labelId="weight-label"
          multiple
          name="weightRange"
          value={areaInfo.weightRange}
          onChange={onChange}
          input={<Input />}
        >
          {weights.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl margin="normal" required className={`${classes.textField} ${classes.textFieldSmall}`}>
        <InputLabel id="size-label">Size</InputLabel>
        <Select
          labelId="size-label"
          multiple
          name="sizeRange"
          value={areaInfo.sizeRange}
          onChange={onChange}
          input={<Input />}
        >
          {sizes.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default AreaForm;

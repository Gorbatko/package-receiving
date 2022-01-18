import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Card, CircularProgress, Collapse, FormControl, Grid, Input, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import fakeApi from '../fake-api';
import useAreas from '../hooks/useAreas';
import { sizes, weights } from '../static/enums';
import { areaModel } from '../static/models';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flexGrow: '1',
    minWidth: '200px',
  },
  textFieldSmall: {
    flexBasis: '0',
  },
  loader: {
    margin: '0 auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }
}))

const Areas = () => {
  const classes = useStyles();
  const history = useHistory();
  const [areas, areasLoading] = useAreas();
  const [areaInfo, setAreaInfo] = useState(areaModel);
  const [areaLoading, setAreaLoading] = useState(false);

  const [alert, setAlert] = useState(false);

  const handleAreaChange = (event) => {
    setAreaInfo({ ...areaInfo, [event.target.name]: event.target.value });
  }

  const handleSubmitPackage = async (event) => {
    event.preventDefault();
    try {
      setAreaLoading(true);
      const data = await fakeApi.post('/areas', areaInfo);
      setAlert({ severity: 'success', body: "Area successfuly created" })
      setAreaLoading(false);
      setAreaInfo(areaModel);
    } catch (error) {
      console.error(error);
      setAlert({ severity: 'error', body: error })
      setAreaLoading(false);
    }
  }

  return (
    <div>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1">Create New Receiving Area</Typography>
            <form onSubmit={handleSubmitPackage} className={classes.form} autoComplete="off" >
              <TextField
                fullWidth
                margin="normal"
                name="name"
                label="Name"
                className={classes.textField}
                value={areaInfo.name}
                onChange={handleAreaChange}
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
                onChange={handleAreaChange}
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
                  onChange={handleAreaChange}
                  input={<Input />}
                >
                  {weights.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" required className={`${classes.textField} ${classes.textFieldSmall}`}
                  >
                <InputLabel id="size-label">Size</InputLabel>
                <Select
                  labelId="size-label"
                  multiple
                  name="sizeRange"
                  value={areaInfo.sizeRange}
                  onChange={handleAreaChange}
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
                disabled={areaLoading}
                color="primary"
              >
                {areaLoading ? <CircularProgress size={24} /> : 'Create'}
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Collapse in={!!alert}>
            <Alert severity={alert.severity}>{alert.body}</Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper className={classes.paper}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1">Areas</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {areas.map((area) => (
                <Grid key={area.id} item xs={12} sm={6} md={3}>
                  <Card
                    className={classes.card}
                    elevation={2}
                    onClick={() => history.push(`/areas/${area.id}`)}
                  >
                    <Typography variant="subtitle2">{area.name}</Typography>
                    <Typography variant="caption">{area.weightRange.join(', ')}</Typography>
                    <div></div>
                    <Typography variant="caption">{area.sizeRange.join(', ')}</Typography>
                  </Card>
                </Grid>
              ))}
              {areasLoading && <CircularProgress className={classes.loader} />}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Areas;

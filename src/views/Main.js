import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Card, CircularProgress, Collapse, Grid, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import fakeApi from '../fake-api';
import useAreas from '../hooks/useAreas';
import { sizes, weights } from '../static/enums';
import { packageModel } from '../static/models';

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

const Main = () => {
  const classes = useStyles();
  const history = useHistory();
  const [areas, areasLoading] = useAreas();
  const [packageInfo, setPackageInfo] = useState(packageModel);
  const [packageLoading, setPackageLoading] = useState(false);

  const [alert, setAlert] = useState(false);

  const handlePackageChange = (event) => {
    setPackageInfo({ ...packageInfo, [event.target.name]: event.target.value });
  }

  const handleSubmitPackage = async (event) => {
    event.preventDefault();
    try {
      setPackageLoading(true);
      const data = await fakeApi.post('/packages', packageInfo);
      setAlert({ severity: 'success', body: <>Your package will be delivered to <strong>{data.area.name}</strong></> })
      setPackageLoading(false);
      setPackageInfo(packageModel);
    } catch (error) {
      console.error(error);
      setAlert({ severity: 'error', body: error })
      setPackageLoading(false);
    }
  }

  return (
    <div>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1">Create New Package</Typography>
            <form onSubmit={handleSubmitPackage} className={classes.form} autoComplete="off" >
                <TextField
                  fullWidth
                  margin="normal"
                  name="name"
                  label="Name"
                  className={classes.textField}
                  value={packageInfo.name}
                  onChange={handlePackageChange}
                  required
                />
                <TextField
                  select
                  margin="normal"
                  name="weight"
                  label="Weight"
                  className={`${classes.textField} ${classes.textFieldSmall}`}
                  value={packageInfo.weight}
                  onChange={handlePackageChange}
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
                  onChange={handlePackageChange}
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
                  disabled={packageLoading}
                  color="primary"
                >
                  {packageLoading ? <CircularProgress size={24} /> : 'Create'}
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
              <Grid item><Button variant="text" onClick={() => history.push('/areas')}>More</Button></Grid>
            </Grid>
            <Grid container spacing={3}>
              {areas.map((area) => (
                <Grid key={area.id} item xs={12} sm={6} md={3}>
                  <Card
                    className={classes.card}
                    elevation={2}
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

export default Main;

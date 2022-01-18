import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, CircularProgress, Collapse, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import fakeApi from '../fake-api';
import useAreas from '../hooks/useAreas';
import { packageModel } from '../static/models';
import AreaCard from '../components/AreaCard';
import PackageForm from '../components/PackageForm';

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

  const handleSubmitForm = async (event) => {
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
            <PackageForm
              packageInfo={packageInfo}
              classes={classes}
              loading={packageLoading}
              onSubmit={handleSubmitForm}
              onChange={handlePackageChange}
            />
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
              {!areasLoading && areas.length === 0 && (
                <Typography variant="body1">No areas found</Typography>
              )}
              {areas.map((area) => (
                <AreaCard key={area.id} area={area} cardClassName={classes.card} history={history} />
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

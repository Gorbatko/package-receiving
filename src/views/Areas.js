import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CircularProgress, Collapse, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import fakeApi from '../fake-api';
import useAreas from '../hooks/useAreas';
import { areaModel } from '../static/models';
import AreaCard from '../components/AreaCard';
import AreaForm from '../components/AreaForm';

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
  const [areas, areasLoading, refetchAreas] = useAreas();
  const [areaInfo, setAreaInfo] = useState(areaModel);
  const [areaLoading, setAreaLoading] = useState(false);

  const [alert, setAlert] = useState(false);

  const handleAreaChange = (event) => {
    setAreaInfo({ ...areaInfo, [event.target.name]: event.target.value });
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      setAreaLoading(true);
      const data = await fakeApi.post('/areas', areaInfo);
      if (data) {
        setAlert({ severity: 'success', body: "Area successfuly created" })
        setAreaInfo(areaModel);
        refetchAreas();
      }
      setAreaLoading(false);
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
            <AreaForm
              areaInfo={areaInfo}
              classes={classes}
              loading={areaLoading}
              onSubmit={handleSubmitForm}
              onChange={handleAreaChange}
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
            </Grid>
            <Grid container spacing={3}>
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

export default Areas;

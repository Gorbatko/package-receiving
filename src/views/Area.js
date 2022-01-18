import { Button, CircularProgress, Grid, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useArea from '../hooks/useArea';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  loader: {
    margin: '0 auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const Area = () => {
  const { id } = useParams();
  const [area, loading] = useArea(id);
  const classes = useStyles();
  const history = useHistory();
  console.log(area)
  return (
    <div>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10}>
          <Button onClick={() => history.goBack()}>Back</Button>
          <Paper className={classes.paper}>
            {loading ? <CircularProgress className={classes.loader} /> : (
              <>
                <Typography variant="subtitle1">{area.name}</Typography>
                <Typography display="block" variant="body">{area.weightRange?.join(', ')}</Typography>
                <Typography display="block" variant="body">{area.sizeRange?.join(', ')}</Typography>
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1">Packages in this area</Typography>
            {loading ? <CircularProgress className={classes.loader} /> : (
              <>
                <List>
                  {area.packages?.map((pack) => (
                    <ListItem>
                      <ListItemText
                        primary={pack.name}
                        secondary={`${pack.weight} ${pack.size}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Area

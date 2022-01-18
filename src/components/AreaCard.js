import React from 'react'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import StraightenIcon from '@material-ui/icons/Straighten';
import { Card, Grid, Typography } from '@material-ui/core';

const AreaCard = ({ area, cardClassName, history }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        className={cardClassName}
        elevation={2}
        onClick={() => history.push(`/areas/${area.id}`)}
      >
        <Typography variant="subtitle2">{area.name}</Typography>
        <Typography display="block" variant="body2"><FitnessCenterIcon />{area.weightRange.join(', ')}</Typography>
        <Typography display="block" variant="body2"><StraightenIcon />{area.sizeRange.join(', ')}</Typography>
      </Card>
    </Grid>
  );
};

export default AreaCard;

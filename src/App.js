import { AppBar, Container, makeStyles, Menu, Toolbar, Typography } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import Main from './views/Main';
import Areas from './views/Areas';
import { useHistory } from 'react-router-dom';
import Area from './views/Area';

const useStyles = makeStyles((theme) => ({
  header: {
    cursor: 'pointer',
  },
}));

function App() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.header} variant="h6" noWrap onClick={() => { history.push('/') }}>
            Package Receiving
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/areas/:id" component={Area}/>
          <Route path="/areas" component={Areas}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;

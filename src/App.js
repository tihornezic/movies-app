import Home from './components/Home'
import Header from './components/Header'
import Watchlist from './components/Watchlist'
import Watched from './components/Watched'
import Movie from './components/Movie'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/movie/:id'>
          <Movie />
        </Route>

        <Route path='/watchlist'>
          <Watchlist />
        </Route>

        <Route path='/watched'>
          <Watched />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;

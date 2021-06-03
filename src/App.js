import Home from './components/pages/Home'
import Header from './components/layout/Header'
import Watchlist from './components/pages/Watchlist'
import Watched from './components/pages/Watched'
import Movie from './components/pages/Movie'
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

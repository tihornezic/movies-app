import Home from './components/pages/Home'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Watchlist from './components/pages/Watchlist'
import Watched from './components/pages/Watched'
import Movie from './components/pages/Movie'
import Tv from './components/pages/Tv'
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

        <Route path='/tv/:id'>
          <Tv />
        </Route>

        <Route path='/watchlist'>
          <Watchlist />
        </Route>

        <Route path='/watched'>
          <Watched />
        </Route>

      </Switch>

      <Footer />
    </Router>
  );
}

export default App;

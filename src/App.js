import Home from './components/pages/Home'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Watchlist from './components/pages/Watchlist'
import Watched from './components/pages/Watched'
import Movie from './components/pages/Movie'
import Tv from './components/pages/Tv'
import Actor from './components/pages/Actor'
import Crew from './components/pages/Crew'
import DiscoverMovies from './components/pages/DiscoverMovies'
import NowPlayingMoviesPage from './components/pages/NowPlayingMoviesPage'
import TopRatedMovies from './components/pages/TopRatedMovies'
import Directors from './components/pages/Directors'
import Actors from './components/pages/Actors'
import DiscoverTvShows from './components/pages/DiscoverTvShows'
import PopularTvShowsPage from './components/pages/PopularTvShowsPage'
import TopRatedTvShows from './components/pages/TopRatedTvShows'
import FourOhFour from './components/pages/FourOhFour'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path='/'>
          <Header />
          <Home />
          <Footer />
        </Route>

        <Route path='/movie/:id'>
          <Header />
          <Movie />
          <Footer />
        </Route>

        <Route path='/tv/:id'>
          <Header />
          <Tv />
          <Footer />
        </Route>

        <Route path='/actor/:id'>
          <Header />
          <Actor />
          <Footer />
        </Route>

        <Route path='/crew/:id'>
          <Header />
          <Crew />
          <Footer />
        </Route>

        <Route path='/movies/discover'>
          <Header />
          <DiscoverMovies />
          <Footer />
        </Route>

        <Route path='/movies/now_playing'>
          <Header />
          <NowPlayingMoviesPage />
          <Footer />
        </Route>

        <Route path='/movies/top_rated'>
          <Header />
          <TopRatedMovies />
          <Footer />
        </Route>

        <Route path='/directors'>
          <Header />
          <Directors />
          <Footer />
        </Route>

        <Route path='/actors'>
          <Header />
          <Actors />
          <Footer />
        </Route>

        <Route path='/tvs/discover'>
          <Header />
          <DiscoverTvShows />
          <Footer />
        </Route>

        <Route path='/tvs/popular'>
          <Header />
          <PopularTvShowsPage />
          <Footer />
        </Route>

        <Route path='/tvs/top_rated'>
          <Header />
          <TopRatedTvShows />
          <Footer />
        </Route>

        <Route path='/watchlist'>
          <Header />
          <Watchlist />
          <Footer />
        </Route>

        <Route path='/watched'>
          <Header />
          <Watched />
          <Footer />
        </Route>

        <Route path='/login'>
            <Login />
        </Route>

        <Route path='/signup'>
            <Signup />
        </Route>

        <Route path='*'>
          <FourOhFour />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;

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
import Profile from './components/pages/Profile'
import ForgotPassword from './components/pages/ForgotPassword'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'

function App() {
  return (

    <AuthProvider>
      <Router>

        <Switch>
          <Route exact path='/'>
            <Header />
            <Home />
            <Footer />
          </Route>

          <Route
            path='/movie/:id'
            render={(props) =>
              <>
                <Header />
                <Movie key={props.location.key} />
                {/* Footer is inside the component */}
              </>
            }
          />

          <Route
            path='/tv/:id'
            render={(props) =>
              <>
                <Header />
                <Tv key={props.location.key} />
                {/* Footer is inside the component */}
              </>
            }
          />

          <Route
            path='/actor/:id'
            render={(props) =>
              <>
                <Header />
                <Actor key={props.location.key} />
                {/* Footer is inside the component */}
              </>
            }

          />

          <Route path='/crew/:id'>
            <Header />
            <Crew />
            {/* Footer is inside the component */}
          </Route>

          <Route path='/movies/discover'>
            <Header />
            <DiscoverMovies />
            <Footer />
          </Route>

          <Route path='/movies/now-playing'>
            <Header />
            <NowPlayingMoviesPage />
            <Footer />
          </Route>

          <Route path='/movies/top-rated'>
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

          <Route path='/tvs/top-rated'>
            <Header />
            <TopRatedTvShows />
            <Footer />
          </Route>

          <Route path='/watchlist'>
            <Header />
            <Watchlist />
            {/* Footer is inside the component */}
          </Route>

          <Route path='/watched'>
            <Header />
            <Watched />
            {/* Footer is inside the component */}
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/signup'>
            <Signup />
          </Route>

          <Route path='/profile'>
            <Header />
            <Profile />
            <Footer />
          </Route>

          <Route path='/forgot-password'>
            <Header />
            <ForgotPassword />
            <Footer />
          </Route>

          <Route path='*'>
            <FourOhFour />
          </Route>

        </Switch>

      </Router>
    </AuthProvider>
  );
}

export default App;

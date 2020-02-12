import React from 'react';
import StyleFinder from './components/CountryFinder/CountryFinder';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CountryDetails from './components/CountryDetails/CountryDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Route path='/countryDetails' component={CountryDetails}/>
        <Route path='/' component={StyleFinder} exact/>
      </div>
    </Router>
  )
}

export default App;
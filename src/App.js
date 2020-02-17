import React from 'react';
import './App.css';
import { Home } from './components/Home';
import { Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PortfolioContainer from './containers/PortfolioContainer';
import TransactionsContainer from './containers/TransactionsContainer';

function App() {
  return (
    <div >
      <Home /> 
     
      <Switch>
        <Route exact path='/' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/portfolio' component={PortfolioContainer} />
        <Route exact path='/transactions' component={TransactionsContainer} />
      </Switch>
    </div>
  );
}

export default App;

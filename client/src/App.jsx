import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GameRoom from './pages/GameRoom';
import Main from './pages/Main';

function App() {

  return (
    <div className="App">
          <Switch>
              <Route exact path='/' component={Main} />
              <Route exact path='/room/:room' component={GameRoom} />
              <Redirect to="/" />
          </Switch>

    </div>
  );
}

export default App;

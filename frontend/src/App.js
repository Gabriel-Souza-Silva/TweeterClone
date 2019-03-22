import React, { Component } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './pages/Login';
import Timeline from './pages/Timeline';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            {/* A PALAVRA EXACT NA LINHA DE BAIXO É PRA ROTA SER EXATAMENTE IGUAL AO PATH, PQ  SE NAO O PATH DA TIMELINE TAMBEM TEM UMA BARRA '/'E GERARIA CONFUSAO */}
            <Route path="/" exact component={Login}></Route>
            <Route path="/timeline" component={Timeline}></Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import './App.css';
import { Route, Switch } from 'react-router-dom';

import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home";
import CreateGame from './components/CreateGame/CreateGame';
import NavBar from './components/NavBar/NavBar';
import Detail from "./components/Detail/Detail";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
          <Switch>
          <Route exact path = "/" component={LandingPage}/>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/CreateGame" component={CreateGame}/>
          <Route exact path="/details/:id" component={Detail}/>
          <Route path ="/" component={NavBar} />
          </Switch> 
  );
}

export default App;

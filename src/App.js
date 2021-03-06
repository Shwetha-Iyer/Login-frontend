import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
function App() {
  return <>
  <Router>
      <Switch>
        <Route path="/" component={Main} exact={true}/>
        <Route path="/login" component={Login} exact={true}/>
        <Route path="/register" component={Register} exact={true}/>
        <Route path="/dashboard/:id" component={Dashboard} exact={true}/>
      </Switch>
  </Router>
  </>
}

export default App;

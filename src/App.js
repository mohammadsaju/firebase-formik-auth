import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
import RegisterTwo from './components/RegisterTwo';
import PrivetRoute from './components/PrivetRoute';

function App() {
  const [{user}, dispatch] = useStateValue();
  
  useEffect(() => {
    auth.onAuthStateChanged((userauth) => {
      if(userauth){
        //user is logged in
        dispatch({
          type: 'SET_USER',
          user: {
            email: userauth.email,
            name: userauth.displayName,
            id: userauth.uid
          }
        })
      }
      else{
        //the user is log out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Login/>
          </Route>
          <Route path='/login' exact>
            <Login/>
          </Route>
          <Route path='/register' exact>
            <RegisterTwo/>
          </Route>
          <PrivetRoute path='/dashboard' exact>
            <Dashboard user={user}/>
            {/* {user?.email ? <Redirect to='/dashboard'/> : <Redirect to='/login'/>} */}
          </PrivetRoute>
          <Route path='*' exact>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

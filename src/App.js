import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import axios from 'axios';

import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert'
import About from './components/Pages/About'
import User from './components/Users/User';
import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

 

  //get single user
  const getUser = async (username) => {
    setLoading(true);

    const user = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);

    setUser(user.data);
    setLoading(false);
  }

  //get user's repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const repos = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    setRepos(repos.data);
    setLoading(false);
  }



  //show alert
  const showAlert = (message, type) => {
    setAlert({message, type})

    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }

  return (
    <GithubState>
    <Router>
      <div className="app" >
        <Navbar />

        <div className="container">
          <Switch>
            <Route exact path='/' render={props =>
              <Fragment>
                <div className="users">
                  {alert && <Alert alert={alert} />}
                  <Search
                    showAlert={showAlert}
                  />
                  <Users />
                </div>
              </Fragment>
            } />
            <Route path='/about' component={About} />
            <Route path='/user/:login' render={props =>
              <User {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading} />
            } />
          </Switch>
        </div>
      </div>
    </Router>
    </GithubState>
  )
}

export default App;
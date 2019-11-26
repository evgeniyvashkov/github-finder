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

  //search users on submit form
  const searchUsers = async (text) => {
    setLoading(true);

    const users = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);

    setUsers(users.data.items);
    setLoading(false);
  }

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

  //delete users from state
  const deleteUsers = () => setUsers([]);

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
                    searchUsers={searchUsers}
                    deleteUsers={deleteUsers}
                    showClear={users.length > 0}
                    showAlert={showAlert}
                  />
                  <Users loading={loading} users={users} getUser={getUser} />
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
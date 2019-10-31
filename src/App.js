import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import axios from 'axios';

import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert'
import About from './components/Pages/About'
import User from './components/Users/User';

import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  //search users on submit form
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const users = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    this.setState({ loading: false, users: users.data.items });
  }

  //get single user
  getUser = async (username) => {
    this.setState({ loading: true });
    const user = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    this.setState({ loading: false, user: user.data });
  }

  //get user's repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const repos = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    console.log(repos.data)
    this.setState({ loading: false, repos: repos.data });
  }

  //delete users from state
  deleteUsers = () => this.setState({ users: [] })

  //show alert
  showAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => {
      this.setState({ alert: null })
    }, 3000)
  }

  render() {
    const {loading, users, user, repos} = this.state;
    return (
      <Router>
        <div className="app" >
          <Navbar />

          <div className="container">
            <Switch>
              <Route exact path='/' render={props =>
                <Fragment>
                  <div className="users">
                    {this.state.alert && <Alert alert={this.state.alert} />}
                    <Search
                      searchUsers={this.searchUsers}
                      deleteUsers={this.deleteUsers}
                      showClear={users.length > 0}
                      showAlert={this.showAlert}
                    />
                    <Users loading={loading} users={users} getUser={this.getUser} />
                  </div>
                </Fragment>
              } />
              <Route path='/about' component={About} />
              <Route path='/user/:login' render={props =>
                <User {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading} />
              } />
            </Switch>
          </div>
        </div>
      </Router>

    );
  }
}

export default App;

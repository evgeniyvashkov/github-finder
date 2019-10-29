import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import axios from 'axios';

import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert'
import About from './components/Pages/About'

import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  //search users on submit form
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const users = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    this.setState({ loading: false, users: users.data.items });
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
    return (
      <Router>
        <div className="App" >
          <Navbar />
          <Switch>
            <Route exact path='/' render={props =>
              <Fragment>
                <div className="users container">
                  {this.state.alert && <Alert alert={this.state.alert} />}
                  <Search
                    searchUsers={this.searchUsers}
                    deleteUsers={this.deleteUsers}
                    showClear={this.state.users.length > 0}
                    showAlert={this.showAlert}
                  />
                  <Users loading={this.state.loading} users={this.state.users} />
                </div>
              </Fragment>
            } />
            <Route path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;


    //cbtn btn-light btn -block 

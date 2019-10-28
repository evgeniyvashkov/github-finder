import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';

import './App.css';
import { throwStatement } from '@babel/types';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  //search users on submit form
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const users = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    this.setState({ loading: false, users: users.data.items });
  }

  //delete users from state
  deleteUsers = () => this.setState({ users: [] })

  render() {
    return (
      <div className="App" >
        <Navbar />
        <div className="users container">
          <Search searchUsers={this.searchUsers} deleteUsers={this.deleteUsers} showClear={this.state.users.length > 0} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;


//cbtn btn-light btn -block 

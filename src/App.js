import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';

import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    // this.setState({ loading: true });
    // const users = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    // this.setState({ loading: false, users: users.data });
  }

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const users = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    this.setState({ loading: false, users: users.data });
  }

  render() {
    return (
      <div className="App" >
        <Navbar />
        <div className="users container" style={styleUsersComponent}>
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

const styleUsersComponent = {
  display: "grid",
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: "1rem"
}

export default App;

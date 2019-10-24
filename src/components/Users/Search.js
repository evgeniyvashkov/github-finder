import React, { Component } from "react";

class Search extends Component {
  state = {
    text: ""
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state.text);
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit} style={formStyles}>
        <input
          type="text"
          name="text"
          value={this.state.text}
          placeholder="Search users..."
          onChange={this.onChange}
        />
        <input
          type="submit"
          className="btn btn-dark btn-block"
          placeholder="Search"
        />
      </form>
    );
  }
}

const formStyles = {
  gridColumn: "1/4"
};

export default Search;

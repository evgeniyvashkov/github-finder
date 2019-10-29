import React, { Component } from "react";

class Search extends Component {
  state = {
    text: ""
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.text) {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    } else {
      this.props.showAlert('The field can\'t to be empty', 'light');
    }
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { deleteUsers, showClear } = this.props;

    return (
      <form
        className="users__search-form"
        onSubmit={this.onSubmit}
        style={formStyles}
      >
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
        {showClear && (
          <button className="btn btn-light btn-block" onClick={deleteUsers}>
            clear
          </button>
        )}
      </form>
    );
  }
}

const formStyles = {
  gridColumn: "1/4"
};

export default Search;

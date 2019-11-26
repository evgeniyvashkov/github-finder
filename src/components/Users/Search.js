import React, { useState, useContext } from "react";
import GithubContext from '../../context/github/githubContext';

const Search = ({ showAlert }) => {
  const githubContext = useContext(GithubContext)

  const [text, setText] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    if (text) {
      githubContext.searchUsers(text);
      setText('');
    } else {
      showAlert('The field can\'t to be empty', 'light');
    }
  };

  const onChange = event => setText(event.target.value)

  return (
    <form
      className="users__search-form"
      onSubmit={onSubmit}
      style={formStyles}>
      <input
        type="text"
        name="text"
        value={text}
        placeholder="Search users..."
        onChange={onChange}
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
  )
}


const formStyles = {
  gridColumn: "1/4"
};

export default Search;

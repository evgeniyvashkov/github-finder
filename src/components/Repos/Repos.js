import React from 'react'
import ReposItem from './ReposItem';

const Repos = ({ repos }) =>
    repos.map(repo => <ReposItem repo={repo} key={repo.id} />)

export default Repos;
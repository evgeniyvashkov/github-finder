import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

import Spinner from '../Layout/Spinner'

class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }

    render() {
        const {
            name,
            company,
            avatar_url,
            location,
            login,
            bio,
            blog,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user;

        const { loading } = this.props;

        if (loading) return <Spinner />
        console.log(!!hireable)
        return (
            <Fragment>
                <Link to='/' className="btn btn-light">Back to search</Link>
                Hireable:{' '}
                {hireable ? <i className="fas fa-check text-success"></i> : <i className='fas fa-times-circle text-danger' />}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="" className="round-img" style={{ width: "150px" }} />
                        <h1>{name}</h1>
                        <p>Location: {location} </p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio:</h3>
                            <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                        <ul>
                            {
                                login && <li>
                                    Username: {login}
                                </li>
                            }

                            {
                                company && <li>
                                    Company: {company}
                                </li>
                            }

                            {
                                blog && <li>
                                    Website: {blog}
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
            </Fragment>
        )
    }
}

export default User;


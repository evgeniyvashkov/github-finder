import React, { Component } from 'react';

export class Navbar extends Component {
    static defaultProps = {
        title: 'Github Finder',
        icon: 'fab fa-github'
    }

    render() {
        const { title, icon } = this.props;
        return (
            <div className="navbar bg-primary">
                <h1>
                    <i className={icon} /> {title}
                </h1>
            </div>
        )
    }
}

export default Navbar

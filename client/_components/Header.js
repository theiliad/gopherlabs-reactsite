import React from 'react';
// import AppBar from 'material-ui/AppBar';

import LOGO from '../img/logo.svg';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            // <AppBar
            //     title="Gopher Labs Org."
            // />

            <div id="header">
                <img src={LOGO} />
            </div>
        )
    }
}
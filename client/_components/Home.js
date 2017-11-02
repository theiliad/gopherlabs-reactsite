// React-related
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    IndexRoute
} from 'react-router-dom'

// Material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import INFO_ICON from 'material-ui/svg-icons/action/info';

//Axios
import axios from 'axios';

// Utilities
import USERS_LIST from '../_utils/users';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: []
        };
    }

    componentWillMount() {
        axios.get(`https://api.github.com/orgs/GopherLabsLtd/repos`)
        .then(function (response) {
          if (response.data && response.data.length > 0) {
            this.setState({
                repos: response.data
            });
          }
        }.bind(this))
    }
    
    render() {
        const marginRight = { marginRight: "10px" }
        return (
            <div>
                <div style={{
                boxShadow: "0 5px 35px -2px rgba(0, 0, 0, 0.1)",
                borderRadius: "2px",
                marginBottom: "30px"
            }}>
                    <List>
                        <Subheader>All Repositories {this.state.repos !== [] && "(" + this.state.repos.length + ")"}</Subheader>

                        {this.state.repos !== [] && this.state.repos.map((repo, i) => {
                            return(
                                <a href={repo.html_url} target="blank">
                                    <ListItem
                                        primaryText={
                                            <span>
                                                <span className="language">
                                                    {repo.language}
                                                </span>

                                                {repo.name}
                                            </span>
                                        }
                                        secondaryText={
                                            repo.description &&
                                            <p style={{ paddingTop: "7.5px" }}>
                                                {repo.description}
                                            </p>
                                        }
                                    />
                                </a>
                            )
                        })}
                    </List>
                </div>
                
                {/* <div>
                    <RaisedButton label="Refresh" primary={true} style={marginRight} />
                    <RaisedButton label="Next Page" disabled={true} />
                </div> */}
            </div>
        )
    }
}
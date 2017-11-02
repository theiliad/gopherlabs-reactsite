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
import CircularProgress from 'material-ui/CircularProgress';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import INFO_ICON from 'material-ui/svg-icons/action/info';

// Utilities
import USERS_LIST from '../_utils/users';
import GITHUB_LANG_COLORS from '../_utils/githubLanguageColors';

//Axios
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: undefined
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
                marginBottom: "30px",
                backgroundColor: "#fff"
            }}>
                    <List>
                        <Subheader>All Repositories {this.state.repos !== undefined && "(" + this.state.repos.length + ")"}</Subheader>

                        {this.state.repos === undefined &&
                            <CircularProgress size={80} thickness={5} style={{ margin: "auto", display: "block" }} />
                        }

                        {this.state.repos !== undefined && this.state.repos.map((repo, i) => {
                            return(
                                <a href={repo.html_url} target="blank">
                                    <ListItem
                                        primaryText={
                                            <span>
                                                <span className="language"
                                                      style={{ background: GITHUB_LANG_COLORS[repo.language], color: repo.language === "JavaScript" ? "#333" : "" }}>
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
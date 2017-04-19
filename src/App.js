import React, {Component} from "react";
import logo from "./logo.svg";
import {Route, Link} from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Hi... Welcome to React</h2>
                </div>
                <p className="App-intro">
                    <Link to="projects">Projects</Link>
                </p>

                <Route path="/projects" component={ProjectsPage}/>
            </div>
        );
    }
}

export default App;

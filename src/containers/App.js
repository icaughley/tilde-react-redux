import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginPage from "./LoginPage";
import ProjectsPage from "./ProjectsPage";
import InvoicingPage from "./InvoicingPage";
import Nav from "./Nav";
import SecureZone from "./SecureZone";

class App extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <SecureZone>
                            <Nav />
                            <div className="page-holder">
                                <Route exact path="/projects" component={ProjectsPage}/>
                                <Route exact path="/invoicing" component={InvoicingPage}/>
                            </div>
                        </SecureZone>
                    </Switch>
                </BrowserRouter>
                <Footer />
            </div>
        );
    }
}

export default App;

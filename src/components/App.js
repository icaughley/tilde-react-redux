import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginPage from "../containers/LoginPage";
import ProjectsPage from "../containers/ProjectsPage";
import InvoicingPage from "../containers/InvoicingPage";
import TimeSheetPage from "../containers/TimeSheetPage";
import PageMessage from "../containers/PageMessage";
import Nav from "../containers/Nav";
import SecureZone from "../containers/SecureZone";

export default () => {
    return (
        <div className="main">
            <Header />
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <SecureZone>
                        <Nav />
                        <div className="page-holder">
                            <PageMessage />
                            <Route path="/projects" component={ProjectsPage}/>
                            <Route path="/invoicing" component={InvoicingPage}/>
                            <Route path="/timeSheet" component={TimeSheetPage}/>
                        </div>
                    </SecureZone>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

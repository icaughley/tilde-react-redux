import React, {Component} from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

class App extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Nav username="icaughley"/>
                <Footer />
            </div>
        );
    }
}

export default App;

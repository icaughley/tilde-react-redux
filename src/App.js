import React, {Component} from "react";
import Header from "./components/Header";
import SecurityPageWrapper from "./pages/SecurityPageWrapper";
import Footer from "./components/Footer";

class App extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <SecurityPageWrapper />
                <Footer />
            </div>
        );
    }
}

export default App;

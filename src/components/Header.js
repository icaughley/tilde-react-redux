import React from "react";
import logo from "../images/logo.gif";
import stocksoftware from "../images/stocksoftware.gif";

export default () => {
    return (
        <div className="page-header">
            <a href="http://www.stocksoftware.com.au"><img src={stocksoftware} alt="Stock Software"/></a>
            <img className="logo" src={logo} alt="logo"/>
        </div>
    );
}

import React from "react";
import "../style/style.css";
import logo from "../images/logo.gif";
import stocksoftware from "../images/stocksoftware.gif";

export default function Header() {
    return (
        <div className="page_header">
            <a href="http://www.stocksoftware.com.au"><img src={stocksoftware} alt="Stock Software"/></a>
            <img className="logo" src={logo} alt="logo"/>
        </div>
    );
}
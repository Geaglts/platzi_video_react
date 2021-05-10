import React from "react";
import "../assets/styles/App.scss";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
    <div className="App">
        <Header />
        {children}
        <Footer />
    </div>
);

export default Layout;

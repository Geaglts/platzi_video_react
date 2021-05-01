import React from "react";
import { Link } from "react-router-dom";
import "@styles/components/Header.scss";

import logo from "@static/img/logo-platzi-video-BW2.png";
import userIcon from "@static/img/user-icon.png";

// Componente presentational
const Header = () => {
    const account_text = "Cuenta";
    const login_text = "Iniciar Sesión";

    return (
        <header className="header">
            <Link to="/">
                <img
                    className="header__img"
                    src={logo}
                    alt="Logo de platzi video"
                />
            </Link>
            <div className="header__menu">
                <div className="header__menu--profile">
                    <img src={userIcon} alt="Icono del menu desplegable" />
                    <p>Perfil</p>
                </div>
                <ul>
                    <li>
                        <a href="/">{account_text}</a>
                    </li>
                    <li>
                        <Link to="/login">{login_text}</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;

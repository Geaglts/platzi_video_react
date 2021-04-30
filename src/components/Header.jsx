import React from "react";
import "@styles/components/Header.scss";

import logo from "@static/img/logo-platzi-video-BW2.png";
import userIcon from "@static/img/user-icon.png";

// Componente presentational
const Header = () => {
    const account_text = "Cuenta";
    const logout_text = "Cerrar Sesión";

    return (
        <header className="header">
            <img
                className="header__img"
                src={logo}
                alt="Logo de platzi video"
            />
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
                        <a href="/">{logout_text}</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;

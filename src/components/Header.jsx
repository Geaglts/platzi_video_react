import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "@styles/components/Header.scss";

import logo from "@static/img/logo-platzi-video-BW2.png";
import userIcon from "@static/img/user-icon.png";

// Utils
import gravatar from "../utils/gravatar";

// Componente presentational
const Header = ({ user }) => {
    const account_text = "Cuenta";
    const login_text = "Iniciar Sesión";

    const hasUser = Object.keys(user).length > 0;

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
                    <img
                        src={hasUser ? gravatar(user.email) : userIcon}
                        alt="Icono del usuario"
                    />
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, null)(Header);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutRequest } from "../actions";
import { Link } from "react-router-dom";
import "@styles/components/Header.scss";

import logo from "@static/img/logo-platzi-video-BW2.png";
import userIcon from "@static/img/user-icon.png";

// Utils
import gravatar from "../utils/gravatar";

// Componente presentational
const Header = ({ user, logoutRequest }) => {
    const login_text = "Iniciar Sesión";
    const logout_text = "Cerrar Sesión";

    const hasUser = Object.keys(user).length > 0;

    const handleLogout = () => {
        logoutRequest({});
    };

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
                    {hasUser && (
                        <li>
                            <a href="/">{user.name}</a>
                        </li>
                    )}
                    {!hasUser ? (
                        <li>
                            <Link to="/login">{login_text}</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/" onClick={handleLogout}>
                                {logout_text}
                            </Link>
                        </li>
                    )}
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

const mapDispatchToProps = {
    logoutRequest,
};

Header.propTypes = {
    user: PropTypes.object,
    logoutRequest: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from "react";
import { Link } from "react-router-dom";
import "@styles/components/Login.scss";

import googleIcon from "@static/icons/google-icon.png";
import twitterIcon from "@static/icons/twitter-icon.png";

const Login = () => {
    return (
        <section className="login">
            <section className="login__container">
                <h2>Inicia sesión</h2>
                <form className="login__container--form">
                    <input type="text" className="input" placeholder="correo" />
                    <input
                        type="password"
                        className="input"
                        placeholder="contraseña"
                    />
                    <button className="button">Iniciar sesión</button>
                    <div className="login__container--remember-me">
                        <label>
                            <input
                                type="checkbox"
                                id="cbox1"
                                value="checkbox"
                            />
                            Recuerdame
                        </label>
                        <a href="/">Olvidé mi contraseña</a>
                    </div>
                </form>
                <section className="login__container--social-media">
                    <div>
                        <img src={googleIcon} alt="Logo de google" />
                        Inicia sesión con Google
                    </div>
                    <div>
                        <img src={twitterIcon} alt="Logo de twitter" />
                        Inicia sesión con Twitter
                    </div>
                </section>
                <p className="login__container--register">
                    No tienes ninguna cuenta{" "}
                    <Link to="/register">Registrate</Link>
                </p>
            </section>
        </section>
    );
};

export default Login;

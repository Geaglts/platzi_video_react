import React, { useState } from "react";
import { connect } from "react-redux";
import { loginRequest } from "../actions";
import { Link } from "react-router-dom";
import "../assets/styles/components/Login.scss";

import googleIcon from "../assets/static/icons/google-icon.png";
import twitterIcon from "../assets/static/icons/twitter-icon.png";

const Login = (props) => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleInput = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const name = form.email.split("@")[0];
        props.loginRequest({ ...form, name });
        props.history.push("/");
    };

    return (
        <section className="login">
            <section className="login__container">
                <h2>Inicia sesión</h2>
                <form
                    className="login__container--form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="email"
                        className="input"
                        placeholder="correo"
                        value={form.email}
                        onChange={handleInput}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="contraseña"
                        value={form.password}
                        onChange={handleInput}
                    />
                    <button
                        className="button"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Iniciar sesión
                    </button>
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

const mapDispatchToProps = {
    loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);

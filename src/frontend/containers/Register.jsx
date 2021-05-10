import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerRequest } from "../actions";
import { Link } from "react-router-dom";
import "../assets/styles/components/Register.scss";

const Register = ({ registerRequest, history }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleInput = (evt) => {
        setForm({ ...form, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        registerRequest(form);
        history.push("/");
    };

    return (
        <section className="register">
            <section className="register__container">
                <h2>Registrate</h2>
                <form
                    className="register__container--form"
                    onSubmit={handleSubmit}
                >
                    <input
                        name="name"
                        type="text"
                        className="input"
                        placeholder="nombre"
                        value={form.name}
                        onChange={handleInput}
                    />
                    <input
                        name="email"
                        type="text"
                        className="input"
                        placeholder="correo"
                        value={form.email}
                        onChange={handleInput}
                    />
                    <input
                        name="password"
                        type="password"
                        className="input"
                        placeholder="contraseña"
                        value={form.password}
                        onChange={handleInput}
                    />
                    <button className="button" type="submit">
                        Registrarse
                    </button>
                </form>
                <Link className="register__container--login" to="/login">
                    Iniciar sesión
                </Link>
            </section>
        </section>
    );
};

const mapDispatchToProps = {
    registerRequest,
};

Register.propTypes = {
    registerRequest: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Register);

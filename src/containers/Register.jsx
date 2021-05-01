import React from "react";
import { Link } from "react-router-dom";
import "@styles/components/Register.scss";

const Register = () => {
    return (
        <section className="register">
            <section className="register__container">
                <h2>Registrate</h2>
                <form className="register__container--form">
                    <input type="text" className="input" placeholder="nombre" />
                    <input type="text" className="input" placeholder="correo" />
                    <input
                        type="password"
                        className="input"
                        placeholder="contraseña"
                    />
                    <button className="button">Registrarse</button>
                </form>
                <Link className="register__container--login" to="/login">
                    Iniciar sesión
                </Link>
            </section>
        </section>
    );
};

export default Register;

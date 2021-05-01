import React from "react";
import "@styles/components/Register.scss";

const Register = () => {
    return (
        <section class="register">
            <section class="register__container">
                <h2>Registrate</h2>
                <form class="register__container--form">
                    <input type="text" class="input" placeholder="nombre" />
                    <input type="text" class="input" placeholder="correo" />
                    <input
                        type="password"
                        class="input"
                        placeholder="contraseña"
                    />
                    <button class="button">Registrarse</button>
                </form>
                <a class="register__container--login" href="/">
                    Iniciar sesión
                </a>
            </section>
        </section>
    );
};

export default Register;

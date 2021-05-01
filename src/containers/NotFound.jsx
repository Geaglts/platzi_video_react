import React from "react";
import "@styles/components/NotFound.scss";

const NotFound = () => {
    return (
        <section class="notFound__container">
            <h1 class="notFound__title pulse">404</h1>
            <p class="notFound__description">Pagina no encontrada</p>
        </section>
    );
};

export default NotFound;

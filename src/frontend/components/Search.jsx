import React from "react";
import "@styles/components/Search.scss";

const Search = () => {
    const main_title_text = "¿Qué quieres ver hoy?";
    const main_inptu_placeholder = "Buscar...";

    return (
        <section className="main">
            <h2 className="main__title">{main_title_text}</h2>
            <input
                className="main__input"
                type="text"
                placeholder={main_inptu_placeholder}
            />
        </section>
    );
};

export default Search;

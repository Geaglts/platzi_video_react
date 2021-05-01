import React from "react";
import PropTypes from "prop-types";
import "@styles/components/CarouselItem.scss";

import playIcon from "@static/icons/play-icon.png";
import plusIcon from "@static/icons/plus-icon.png";

const CarouselItem = ({ cover, title, year, contentRating, duration }) => {
    return (
        <div className="carousel-item">
            <img
                className="carousel-item__img"
                src={cover}
                alt="Persona en una terraza"
            />
            <div className="carousel-item__details--container">
                <div className="carousel-item__details">
                    <img src={playIcon} alt="Icono de play" />
                    <img src={plusIcon} alt="Icono de mas" />
                    <p className="carousel-item__details--title">{title}</p>
                    <p className="carousel-item__details--subtitle">
                        {`${year} ${contentRating} ${duration} minutos`}
                    </p>
                </div>
            </div>
        </div>
    );
};

CarouselItem.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number,
};

export default CarouselItem;

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFavorite, deleteFavorite } from '../actions';
import '../assets/styles/components/CarouselItem.scss';

import playIcon from '../assets/static/icons/play-icon.png';
import plusIcon from '../assets/static/icons/plus-icon.png';
import removeIcon from '../assets/static/icons/remove-icon.png';

const CarouselItem = (props) => {
  const { cover, title, year, contentRating, duration, id, isMyList } = props;

  const handleSetFavorite = () => {
    props.setFavorite({ cover, title, year, contentRating, duration, id });
  };

  const handleDeleteFavorite = () => {
    props.deleteFavorite(id);
  };

  return (
    <div className='carousel-item'>
      <img
        className='carousel-item__img'
        src={cover}
        alt='Persona en una terraza'
      />
      <div className='carousel-item__details--container'>
        <div className='carousel-item__details'>
          <Link to={`/player/${id}`}>
            <img src={playIcon} alt='Icono de play' />
          </Link>
          {!isMyList ? (
            <img
              src={plusIcon}
              alt='Icono de mas'
              onClick={handleSetFavorite}
            />
          ) : (
            <img
              src={removeIcon}
              alt='Icono de eliminar'
              onClick={() => handleDeleteFavorite(id)}
            />
          )}
          <p className='carousel-item__details--title'>{title}</p>
          <p className='carousel-item__details--subtitle'>
            {`${year} ${contentRating} ${duration} minutos`}
          </p>
        </div>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  id: PropTypes.number,
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite,
};

export default connect(null, mapDispatchToProps)(CarouselItem);

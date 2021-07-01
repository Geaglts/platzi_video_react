import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';
import '../assets/styles/components/Player.scss';

const Player = (props) => {
  const { match, getVideoSource, history, playing } = props;

  const [loading, setLoading] = useState(true);
  const { id } = match.params;

  useEffect(() => {
    getVideoSource(id);
    setLoading(false);
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  if (loading) return null;

  const hasPlaying = Object.keys(playing).length > 0 || null;

  return hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={handleBack}>
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <Redirect to='/404/' />
  );
};

Player.propTypes = {};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getVideoSource } from "../actions";
import "@styles/components/Player.scss";

const Player = (props) => {
    const [loading, setLoading] = useState(true);
    const { id } = props.match.params;

    useEffect(() => {
        props.getVideoSource(id);
        setLoading(false);
    }, []);

    const handleBack = () => {
        props.history.goBack();
    };

    const hasPlaying = Object.keys(props.playing).length > 0;

    if (loading) return null;

    return hasPlaying ? (
        <div className="Player">
            <video controls autoPlay>
                <source src={props.playing.source} type="video/mp4" />
            </video>
            <div className="Player-back">
                <button type="button" onClick={handleBack}>
                    Regresar
                </button>
            </div>
        </div>
    ) : (
        <Redirect to="/404/" />
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

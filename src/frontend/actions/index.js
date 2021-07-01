// Dependencies
import axios from 'axios';

export const actions = {
  setFavorite: 'SET_FAVORITE',
  deleteFavorite: 'DELETE_FAVORITE',
  registerRequest: 'REGISTER_REQUEST',
  loginRequest: 'LOGIN_REQUEST',
  logoutRequest: 'LOGOUT_REQUEST',
  getVideoSource: 'GET_VIDEO_SOURCE',
};

export const setFavorite = (payload) => ({
  type: actions.setFavorite,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: actions.deleteFavorite,
  payload,
});

export const loginRequest = (payload) => ({
  type: actions.loginRequest,
  payload,
});

export const logoutRequest = (payload) => ({
  type: actions.logoutRequest,
  payload,
});

export const registerRequest = (payload) => ({
  type: actions.registerRequest,
  payload,
});

export const getVideoSource = (payload) => ({
  type: actions.getVideoSource,
  payload,
});

// Promises
export const registerUser = (payload, redirectUrl) => {
  return async (dispatch) => {
    const { data } = await axios.post('/auth/sign-up', payload);
    dispatch(registerRequest(data));
    window.location.href = redirectUrl;
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: '/auth/sign-in',
        method: 'post',
        auth: {
          username: email,
          password,
        },
      });
      document.cookie = `email=${data.user.email}`;
      document.cookie = `name=${data.user.name}`;
      document.cookie = `id=${data.user.id}`;
      dispatch(loginRequest(data));
      window.location.href = redirectUrl;
    } catch (error) {
      console.log('Error');
    }
  };
};

export const addUserMovie = (userMovie) => {
  return async (dispatch) => {
    const { userId, ...restUserMovie } = userMovie;
    try {
      await axios({
        url: '/user-movies',
        method: 'post',
        data: { userId, movieId: restUserMovie.movieId },
      });

      dispatch(setFavorite(restUserMovie));
    } catch (error) {}
  };
};

export const removeUserMovie = ({ movieId, userMovies }) => {
  return async (dispatch) => {
    const userMovieId = userMovies.find(
      (userMovie) => userMovie.movieId === movieId,
    );
    try {
      await axios({
        url: `/user-movies/${userMovieId._id}`,
        method: 'delete',
      });
      dispatch(deleteFavorite(movieId));
    } catch (error) {}
  };
};

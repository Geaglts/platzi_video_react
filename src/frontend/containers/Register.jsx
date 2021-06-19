import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions';
import '../assets/styles/components/Register.scss';

const Register = ({ registerUser, history }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(form);
    history.push('/');
  };

  return (
    <section className='register'>
      <section className='register__container'>
        <h2>Registrate</h2>
        <form
          className='register__container--form'
          onSubmit={handleSubmit}
        >
          <input
            name='name'
            type='text'
            className='input'
            placeholder='nombre'
            value={form.name}
            onChange={handleInput}
          />
          <input
            name='email'
            type='text'
            className='input'
            placeholder='correo'
            value={form.email}
            onChange={handleInput}
          />
          <input
            name='password'
            type='password'
            className='input'
            placeholder='contraseña'
            value={form.password}
            onChange={handleInput}
          />
          <button className='button' type='submit'>
            Registrarse
          </button>
        </form>
        <Link className='register__container--login' to='/login'>
          Iniciar sesión
        </Link>
      </section>
    </section>
  );
};

const mapDispatchToProps = {
  registerUser,
};

Register.propTypes = {
  registerUser: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Register);

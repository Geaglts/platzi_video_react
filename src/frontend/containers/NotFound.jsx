import React from 'react';
import '../assets/styles/components/NotFound.scss';

const NotFound = () => {
  return (
    <section className='notFound__container'>
      <h1 className='notFound__title pulse'>404</h1>
      <p className='notFound__description'>Pagina no encontrada</p>
    </section>
  );
};

export default NotFound;

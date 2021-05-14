import React from 'react';
import '../assets/styles/components/Search.scss';

const Search = () => {
  const mainTitleText = '¿Qué quieres ver hoy?';
  const mainInputPlaceholder = 'Buscar...';

  return (
    <section className='main'>
      <h2 className='main__title'>{mainTitleText}</h2>
      <input
        className='main__input'
        type='text'
        placeholder={mainInputPlaceholder}
      />
    </section>
  );
};

export default Search;

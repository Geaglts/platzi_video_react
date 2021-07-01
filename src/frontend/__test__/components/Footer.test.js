import React from 'react';
import { mount } from 'enzyme';
import Footer from '../../components/Footer';

// suite = cuando es mas de una prueba
describe('<Footer />', () => {
  const footer = mount(<Footer />);

  test('Reder Footer Component', () => {
    expect(footer.length).toEqual(1);
  });

  test('Footer haves 3 anchors', () => {
    expect(footer.find('a')).toHaveLength(3);
  });
});

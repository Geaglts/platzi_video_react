import { expect, test } from '@jest/globals';
import React from 'react';
import Register from '../../containers/Register';
import { mount } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';

describe('<Register />', () => {
  test('', () => {
    const preventDefault = jest.fn();
    const register = mount(
      <ProviderMock>
        <Register />
      </ProviderMock>,
    );
    register.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    register.unmount();
  });
});

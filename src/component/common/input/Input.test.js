import React from 'react';
import Input from './Input';
import { shallow } from 'enzyme';

describe('<Input />', () => {
  it('Should render as expected', () => {
    const wrapper = shallow(
      <Input 
        value="test" 
        placeholder="Search" 
        type="search" 
        onChange={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  })
});
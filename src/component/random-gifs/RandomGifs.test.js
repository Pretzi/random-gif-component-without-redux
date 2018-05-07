import React from 'react';
import RandomGifs from './RandomGifs';
import { shallow } from 'enzyme';

describe('<RandomGifs />', () => {
  it('Should render empty ', () => {
    const wrapper = shallow(
      <RandomGifs gifs={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render 3 images ', () => {
    const wrapper = shallow(
      <RandomGifs gifs={[
        { image_url: '1' },
        { image_url: '2' },
        { image_url: '3' }
      ]} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.RandomGifs__img').length).toBe(3);
  });
});
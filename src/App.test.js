import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import RandomGifs from './App';
import { Spinner } from "@blueprintjs/core";

describe('<RandomGifs />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RandomGifs />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should render as expected', () => {
    const wrapper = shallow(
      <RandomGifs />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render without numberOfImages and Timer', () => {
    const wrapper = shallow(
      <RandomGifs
        showNumberOfImages={false}
        showTimer={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  })

  it('Should render with Spinner', () => {
    const wrapper = shallow(
      <RandomGifs loading={true} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains(<Spinner />)).toEqual(true);
  })

  it('Should render with error message', () => {
    const wrapper = shallow(
      <RandomGifs error={true} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains(
      <span className="RandomGifsComponent__error">There was an error</span>
    )).toEqual(true);
  })

  it('Should render with notFound message', () => {
    const wrapper = shallow(
      <RandomGifs notFound={true} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains(
      <span className="RandomGifsComponent__error">Gifs not found</span>
    )).toEqual(true);
  })

  it('Should change value of category state when onChange', () => {
    const wrapper = shallow(
      <RandomGifs />
    );
    wrapper.find('Input').first().simulate('change', {
      target: {
        name: 'category',
        value: 'pizza'
      }
    })
    expect(wrapper.state().category).toBe('pizza')
  })

  it('Should change value of numberofImages state when onChange', () => {
    const wrapper = shallow(
      <RandomGifs />
    );
    wrapper.find('Input').first().simulate('change', {
      target: {
        name: 'numberOfImages',
        value: '10'
      }
    })
    expect(wrapper.state().numberOfImages).toBe('10')
  })

  it('Should change value of timer state when onChange', () => {
    const wrapper = shallow(
      <RandomGifs />
    );
    wrapper.find('Input').first().simulate('change', {
      target: {
        name: 'timer',
        value: '7'
      }
    })
    expect(wrapper.state().timer).toBe('7')
  })
});
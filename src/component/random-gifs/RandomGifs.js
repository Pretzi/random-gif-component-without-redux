import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RandomGifs.css';

class RandomGifs extends Component {
  render() {
    const randomGifs = this.props.gifs.map((gif, i) => (
      <div 
        key={i} 
        style={{backgroundImage: `url(${gif.image_url})`}}
        className="RandomGifs__img"
      />
    ))

    return (
      <div className="RandomGifs__container">
        {randomGifs}
      </div>
    );
  }
}

RandomGifs.displayName = 'RandomGifs';
RandomGifs.propTypes = {
  gifs: PropTypes.array
};

export default RandomGifs;
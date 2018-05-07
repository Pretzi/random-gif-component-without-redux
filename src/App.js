import React, { Component } from 'react';
import { FormGroup, Button, Spinner } from "@blueprintjs/core";
import Input from './components/common/input/Input';
import RandomGifs from './components/random-gifs/RandomGifs';
import PropTypes from 'prop-types';
import './App.css';

class RandomGifsComponent extends Component {
  constructor(props) {
    super(props);

    const {
      category,
      timer,
      numberOfImages,
      gifs
    } = this.props;

    this.state = {
      category,
      timer,
      numberOfImages,
      gifs
    };
  }

  render() {
    const {
      gifs,
      showNumberOfImages,
      showTimer,
      loading,
      notFound,
      error
    } = this.props

    return (
      <div className="RandomGifsComponent">
        <div className="RandomGifsComponent__container">
          <h2 className="RandomGifsComponent__title">Search Random Gifs</h2>

          <form
            className="RandomGifsComponent__form"
            onSubmit={this.handleSubmit}
          >
            <FormGroup label="Gif Category">
              <Input
                value={this.state.category}
                onChange={e => this.handleInputChange(e)}
                placeholder="Tacos"
                type="string"
                name="category"
                icon="pt-icon-tag"
              />
            </FormGroup>

            {showNumberOfImages &&
              <FormGroup label="Number Of Images">
                <Input
                  value={this.state.numberOfImages}
                  onChange={e => this.handleInputChange(e)}
                  placeholder="3"
                  name="numberOfImages"
                  type="number"
                  icon="pt-icon-media"
                />
              </FormGroup>
            }

            {showTimer &&
              <FormGroup label="Timer" helperText="Time is in seconds">
                <Input
                  value={this.state.timer}
                  onChange={e => this.handleInputChange(e)}
                  placeholder="10 seconds"
                  name="timer"
                  type="number"
                  icon="pt-icon-time"
                />
              </FormGroup>
            }

            <Button
              intent="PRIMARY"
              text="Search"
              large
              onClick={this.handleSubmit}
              type="submit"
            />
          </form>

          <div className="RandomGifsComponent__gif-container">
            <RandomGifs gifs={gifs} />

            {loading && <Spinner />}

            {notFound &&
              <span className="RandomGifsComponent__error">
                Gifs not found
              </span>
            }
            {error &&
              <span className="RandomGifsComponent__error">
                There was an error
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}

RandomGifsComponent.displayName = 'RandomGifsComponent';
RandomGifsComponent.propTypes = {
  fetchGifs: PropTypes.func
};
RandomGifsComponent.defaultProps = {
  category: '',
  numberOfImages: 3,
  timer: 10,
  showNumberOfImages: true,
  showTimer: true,
  gifs: []
};

export default RandomGifsComponent;

import React, { Component } from 'react';
import { FormGroup, Button, Spinner } from "@blueprintjs/core";
import axios from 'axios';
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
      gifs,
      loading,
      error,
      notFound
    } = this.props;

    this.state = {
      category,
      timer,
      numberOfImages,
      loading,
      gifs,
      error,
      notFound
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchGif = this.fetchGif.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
      notFound: false,
      error: false
    }, () => {
      this.fetchGif();
    });
  }


  fetchGif(gifs = []) {
    const {
      category,
      numberOfImages,
      timer,
    } = this.state;

    const counter = [...gifs];
    let error = false;
    let notFound = false;

    axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: 'h7XYSMDQGAe7jdli56bt5jvHeE6BVR2m',
        tag: category
      }
    })
      .then(response => {
        if (response.data.data) {
          const gif = response.data.data;

          gif.length !== 0
            ? counter.push(gif)
            : notFound = true;
        }
        else {
          error = true
        }

        if (notFound || error) {
          this.setState({
            notFound,
            error,
            gifs: [],
            loading: false
          }, () => false)
        }
        else {
          counter.length !== Number(numberOfImages)
            ? this.fetchGif(counter)
            : this.setState({
              gifs: counter,
              loading: false
            }, () => {
              setTimeout(() => {
                this.setState({
                  loading: true
                }, this.fetchGif());
              }, timer * 1000)
            });
        }
      })
  }

  render() {
    const {
      showNumberOfImages,
      showTimer,
    } = this.props

    const {
      notFound,
      error,
      loading,
      gifs,
      category,
      numberOfImages,
      timer
    } = this.state;

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
                value={category}
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
                  value={numberOfImages}
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
                  value={timer}
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
  gifs: [],
  loading: false,
  error: false,
  notFound: false
};

export default RandomGifsComponent;

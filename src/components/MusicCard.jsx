import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
    this.checkBoxClicked = this.checkBoxClicked.bind(this);
  }

  async checkBoxClicked({ target: { id } }) {
    this.setState({ loading: true,
      checked: true,
    });
    await addSong(id);
    this.setState({ loading: false });
  }

  render() {
    const { trackName,
      previewUrl,
      trackId,
    } = this.props;

    const {
      loading,
      checked,
    } = this.state;

    return (
      loading ? <Carregando />
        : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor={ previewUrl }
            >
              Favorita
              <input
                onClick={ this.checkBoxClicked }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id={ trackId }
                defaultChecked={ checked }
              />
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

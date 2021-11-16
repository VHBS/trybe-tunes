import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import Carregando from '../pages/Carregando';

export default class MusicCard extends Component {
  render() {
    const { trackName,
      previewUrl,
      trackId,
      checkBoxClicked2,
      checked,
    } = this.props;

    return (
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
            onChange={ checkBoxClicked2 }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  checkBoxClicked2: PropTypes.func.isRequired,
};

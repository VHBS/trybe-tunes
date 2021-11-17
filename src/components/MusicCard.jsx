import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName,
      previewUrl,
      handleClick,
      checked,
      trackIdNumber,
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
          htmlFor={ trackIdNumber }
        >
          Favorita
          <input
            onChange={ handleClick }
            data-testid={ `checkbox-music-${trackIdNumber}` }
            type="checkbox"
            id={ trackIdNumber }
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
  // trackId: PropTypes.number.isRequired,
  trackIdNumber: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

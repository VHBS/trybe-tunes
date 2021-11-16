import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      checked: false,
    };
    this.checkBoxClicked = this.checkBoxClicked.bind(this);
    this.callingFavoritesSongs = this.callingFavoritesSongs.bind(this);
  }

  componentDidMount() {
    this.callingFavoritesSongs();
  }

  callingFavoritesSongs() {
    const { favoriteList, trackId } = this.props;
    const checkListSongs = favoriteList.some((id) => Number(id) === Number(trackId));
    this.setState({
      checked: checkListSongs,
    });
  }

  async checkBoxClicked({ target: { id } }) {
    const { checked } = this.state;
    // let { loading } = this.props;
    this.setState({ loading: true,
    });
    // this.props.loading = true;
    const resultado = await getFavoriteSongs();
    if (!resultado.includes(id)) {
      await addSong(id);
    }
    this.setState({
      loading: false,
      checked: !checked,
    });
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
                onChange={ this.checkBoxClicked }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id={ trackId }
                checked={ checked }
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
  favoriteList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

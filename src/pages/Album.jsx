import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      favoriteList: [],
      loading: true,
      idSearch: [],
    };
    this.callApiInit = this.callApiInit.bind(this);
  }

  componentDidMount() {
    this.callApiInit();
  }

  async callApiInit() {
    const { match: { params: { id } } } = this.props;
    const resultApi = await getMusics(id);
    const resultFavApi = await getFavoriteSongs();
    if (resultApi !== undefined) {
      this.setState({
        favoriteList: [...resultFavApi],
        idSearch: [...resultApi],
        loading: false,
      });
    } else {
      this.setState({
        idSearch: [],
      });
    }
  }

  render() {
    const { idSearch, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {loading ? <Carregando />
            : (
              <div>
                <h3 data-testid="artist-name">
                  {`Artista: ${idSearch[0].artistName}`}
                </h3>
                <p data-testid="album-name">
                  Album:
                  { idSearch[0].collectionName }
                </p>
                {idSearch.filter((music) => music.trackName && music.previewUrl)
                  .map((music, index) => (
                    <div key={ music.artistId + index + music.trackName }>
                      <MusicCard { ... music } { ... this.state } />
                    </div>))}
              </div>)}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

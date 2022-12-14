import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      favoriteList: [],
      loading: true,
      idSearch: [],
    };
    this.callApiInit = this.callApiInit.bind(this);
    this.verifyChecked = this.verifyChecked.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.callApiInit();
  }

  async handleClick(param, { target: { checked } }) {
    this.setState({ loading: true,
    });
    if (!checked) {
      await removeSong(param);
    } else {
      await addSong(param);
    }
    const listaAtualizada = await getFavoriteSongs();
    this.setState({
      favoriteList: listaAtualizada,
      loading: false,
    });
  }

  verifyChecked = ({ trackId }) => {
    const { favoriteList } = this.state;
    const checkListSongs = favoriteList
      .some((music2) => Number(music2.trackId) === Number(trackId));
    return checkListSongs;
  }

  async callApiInit() {
    const { match: { params: { id } } } = this.props;
    const resultApi = await getMusics(id);
    const resultFavApi = await getFavoriteSongs();
    this.setState({
      favoriteList: resultFavApi,
      idSearch: resultApi,
      loading: false,
    });
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
                      <MusicCard
                        { ... music }
                        trackIdNumber={ Number(music.trackId) }
                        handleClick={ (event) => this.handleClick(music, event) }
                        checked={ this.verifyChecked(music) }
                      />
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

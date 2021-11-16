import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
// import { addSong, getFavoriteSongs, removeSong } from '../services/
export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      favoriteList: [],
      loading: true,
      idSearch: [],
    };
    this.callApiInit = this.callApiInit.bind(this);
    // this.checkBoxClicked = this.checkBoxClicked.bind(this);
    // this.checkBoxValue = this.checkBoxValue.bind(this);
  }

  async componentDidMount() {
    await this.callApiInit();
  }

  teste = async (param) => {
    // console.log(param);
    this.setState({ loading: true,
    });
    await addSong(param);
    const listaAtualizada = await getFavoriteSongs();
    this.setState({
      favoriteList: listaAtualizada,
      loading: false,
    });
  }

  teste2 = ({ trackId }) => {
    const { favoriteList } = this.state;
    const checkListSongs = favoriteList
      .some((music2) => Number(music2.trackId) === Number(trackId));
    // console.log(checkListSongs);
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

  // checkBoxValue(param) { // ANTIGA
  //   const { favoriteList } = this.state;
  //   const checkListSongs = favoriteList
  //     .some((id) => Number(id) === Number(param.trackId));
  //   return checkListSongs;
  // }

  // async checkBoxClicked({ target: { id } }) { // ANTIGA
  //   const { favoriteList } = this.state;
  //   this.setState({ loading: true,
  //   });
  //   if (!favoriteList.includes(id)) {
  //     await addSong(id);
  //   }
  //   const listaAtualizada = await getFavoriteSongs();
  //   this.setState({
  //     favoriteList: listaAtualizada,
  //     loading: false,
  //   });
  // }

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
                        checkBoxClicked2={ () => this.teste(music) }
                        // checkBoxClicked={ this.checkBoxClicked } // antiga
                        // checked={ this.checkBoxValue(music) } // antiga
                        checked={ this.teste2(music) }
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

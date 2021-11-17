import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteList: [],
    };
    this.initRender = this.initRender.bind(this);
    this.verifyChecked = this.verifyChecked.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.initRender();
  }

  async handleClick(param) {
    this.setState({ loading: true,
    });
    await removeSong(param);
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

  async initRender() {
    const listSongs = await getFavoriteSongs();
    this.setState({
      favoriteList: listSongs,
      loading: false,
    });
  }

  render() {
    const { favoriteList, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Carregando />
          : favoriteList.map((music, index) => (
            <div key={ music.artistId + index + music.trackName }>
              <MusicCard
                trackIdNumber={ Number(music.trackId) }
                { ... music }
                handleClick={ (event) => this.handleClick(music, event) }
                checked={ this.verifyChecked(music) }
              />
            </div>))}
      </div>
    );
  }
}

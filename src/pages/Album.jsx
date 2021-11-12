import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
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
    if (resultApi !== undefined) {
      this.setState({
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
                <h6 data-testid="artist-name">
                  Artista:
                  { idSearch[0].artistName }
                </h6>
                <p data-testid="album-name">
                  Album:
                  { idSearch[0].collectionName }
                </p>
                {idSearch.filter((music) => music.trackName && music.previewUrl)
                  .map((music, index) => (
                    <div key={ music.artistId + index + music.trackName }>
                      <MusicCard { ... music } />
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

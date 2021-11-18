import React, { Component } from 'react';
import CardAlbumSearch from '../components/CardAlbumSearch';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchResult: [],
      loading: false,
      inputSearch: '',
      checkLength: true,
    };
    this.checkInputLength = this.checkInputLength.bind(this);
  }

  async checkInputLength({ target: { value } }) {
    const minVal = 2;
    const checkInput = value.length < minVal;
    this.setState({
      inputSearch: value,
      checkLength: checkInput,
    });
  }

  async callApi() {
    const { inputSearch } = this.state;
    this.setState({
      loading: true,
    });
    const resultadoApi = await searchAlbumsAPI(inputSearch);
    this.setState({
      loading: false,
      searchResult: resultadoApi,
    });
  }

  render() {
    const { inputSearch, checkLength, loading, searchResult } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Carregando />)
          : (
            <div>
              <label htmlFor="artist-input">
                Procurar por banda ou artista:
                <input
                  data-testid="search-artist-input"
                  type="text"
                  id="artist-input"
                  onChange={ this.checkInputLength }
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ checkLength }
                onClick={ async () => this.callApi() }
              >
                Pesquisar
              </button>
              <h4>
                Resultado de álbuns de:
                {' '}
                { inputSearch }
              </h4>
              {searchResult.length > 0 ? (searchResult.map((album) => (
                <div key={ album.collectionId }>
                  <CardAlbumSearch
                    { ... album }
                  />
                </div>
              ))) : (<p>Nenhum álbum foi encontrado</p>)}
            </div>
          )}
      </div>
    );
  }
}

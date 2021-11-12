import React, { Component } from 'react';
import CardAlbum from '../components/CardAlbum';
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
    const doidera = await searchAlbumsAPI(inputSearch);
    this.setState({
      loading: false,
      searchResult: [...doidera],
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
              <h4>
                Resultado de álbuns de:
                {' '}
                { inputSearch }
              </h4>
              {searchResult.length > 0 ? (searchResult.map((album) => (
                <div key={ album.collectionId }>
                  <CardAlbum
                    { ... album }
                  />
                </div>
              ))) : (<p>Nenhum álbum foi encontrado</p>)}
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ checkLength }
                onClick={ async () => this.callApi() }
              >
                Pesquisar
              </button>
            </div>
          )}
      </div>
    );
  }
}

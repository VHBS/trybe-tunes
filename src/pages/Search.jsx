import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      checkLength: true,
    };
    this.checkInputLength = this.checkInputLength.bind(this);
  }

  checkInputLength({ target: { value } }) {
    const minVal = 2;
    const checkInput = value.length < minVal;
    this.setState({
      inputSearch: value,
      checkLength: checkInput,
    });
  }

  render() {
    const { inputSearch, checkLength } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="artist-input">
          Procurar por banda ou artista:
          <input
            data-testid="search-artist-input"
            type="text"
            id="artist-input"
            onChange={ this.checkInputLength }
          />
        </label>
        <p>{ inputSearch }</p>
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ checkLength }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

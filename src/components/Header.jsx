import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
    this.renderFunc = this.renderFunc.bind(this);
  }

  componentDidMount() {
    this.renderFunc();
  }

  async renderFunc() {
    const { name } = await getUser();
    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      loading
        ? (<Carregando />)
        : (
          <header data-testid="header-component">
            <Link data-testid="link-to-search" to="/search">
              Search
            </Link>
            <Link data-testid="link-to-favorites" to="/favorites">
              Favorites
            </Link>
            <Link data-testid="link-to-profile" to="/profile">
              Profile
            </Link>
            <h1 data-testid="header-user-name">{ name }</h1>
          </header>
        )
    );
  }
}

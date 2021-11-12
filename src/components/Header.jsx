import React, { Component } from 'react';
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
            <h1 data-testid="header-user-name">{ name }</h1>
          </header>
        )
    );
  }
}

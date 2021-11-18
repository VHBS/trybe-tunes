import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: {},
    };
    this.gettingUser = this.gettingUser.bind(this);
  }

  componentDidMount() {
    this.gettingUser();
  }

  async gettingUser() {
    const user = await getUser();
    this.setState({
      loading: false,
      usuario: user,
    });
  }

  render() {
    const { usuario: { name, email, description, image }, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Carregando />
          : (
            <div>
              <h2>Usuário</h2>
              <h3>{name}</h3>
              <h2>Email</h2>
              <h3>{email}</h3>
              <h2>Descrição</h2>
              <h3>{description}</h3>
              <img
                data-testid="profile-image"
                src={ image }
                alt={ name }
              />
              <br />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

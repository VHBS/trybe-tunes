import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: {},
      disabledButton: true,
    };
    this.gettingUser = this.gettingUser.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.verifyDisabledButton = this.verifyDisabledButton.bind(this);
  }

  componentDidMount() {
    this.gettingUser();
  }

  async gettingUser() {
    const user = await getUser();
    this.setState({
      loading: false,
      usuario: user,
    }, () => {
      this.verifyDisabledButton();
    });
  }

  verifyDisabledButton() {
    const { usuario: { name, email, image, description } } = this.state;
    const arrayInputs = [name, email, image, description];
    const includesTrue = email.includes('@' && '.com');
    const arrayTrue = arrayInputs.every((input) => input.length > 0);
    if (includesTrue && arrayTrue) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  inputChange({ target: { id, value } }) {
    this.setState((state) => ({
      usuario: {
        ...state.usuario, [id]: value },
    }), () => this.verifyDisabledButton());
  }

  async clickSaveButton() {
    const { usuario: { name, email, image, description } } = this.state;
    this.setState({
      loading: true,
    });
    await updateUser({ name, email, image, description });
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const { disabledButton,
      loading,
      usuario: { name, email, image, description },
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Carregando />
          : (
            <div>
              <input
                data-testid="edit-input-name"
                type="text"
                defaultValue={ name }
                placeholder="Nome"
                onChange={ this.inputChange }
                id="name"
              />
              <input
                data-testid="edit-input-email"
                type="text"
                defaultValue={ email }
                placeholder="Email"
                onChange={ this.inputChange }
                id="email"
              />
              <input
                data-testid="edit-input-description"
                type="text"
                defaultValue={ description }
                placeholder="Descrição"
                onChange={ this.inputChange }
                id="description"
              />
              <input
                data-testid="edit-input-image"
                type="text"
                defaultValue={ image }
                placeholder="Url da Imagem"
                onChange={ this.inputChange }
                id="image"
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabledButton }
                onClick={ () => this.clickSaveButton() }
              >
                Salvar
              </button>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

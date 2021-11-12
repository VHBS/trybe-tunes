import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      inputName: '',
      checkDisable: true,
    };
    this.inputCheckLength = this.inputCheckLength.bind(this);
    this.clickEnter = this.clickEnter.bind(this);
    this.renderFunction = this.renderFunction.bind(this);
  }

  inputCheckLength({ target: { value } }) {
    const minVal = 3;
    this.setState({
      inputName: value,
      checkDisable: value.length < minVal,
    });
  }

  async clickEnter() {
    const { inputName } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: inputName });
    history.push('/search');
  }

  renderFunction() {
    const { checkDisable, loading } = this.state;
    if (loading) {
      return <Carregando />;
    } return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.inputCheckLength }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ checkDisable }
          onClick={ this.clickEnter }
        >
          Entrar
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderFunction()}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

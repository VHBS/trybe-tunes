import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbumSearch extends Component {
  render() {
    const { collectionName,
      artistName,
      collectionId,
    } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div>
          <h3>
            Nome do Album:
            {' '}
            { collectionName }
          </h3>
          <p>
            Artista:
            {' '}
            { artistName }
          </p>
        </div>
      </Link>
    );
  }
}

CardAlbumSearch.propTypes = {
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

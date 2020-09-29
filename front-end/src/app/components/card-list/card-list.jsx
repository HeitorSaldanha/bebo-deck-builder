import React from 'react';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import StyledListGroup from './Style';

const CardList = (props) => {
  const {
    cards, errors, isLoading, selectCard,
  } = props;

  return (
    <StyledListGroup>
      {
        isLoading && <Spinner animation="border" />
      }
      {
        !isLoading
        && errors
        && (
        <ListGroup.Item
          key="error"
          variant="danger"
        >
          {errors.details}
        </ListGroup.Item>
        )
      }
      {
        !isLoading
        && !errors
        && cards
        && cards.map((card) => (
          <ListGroup.Item
            action
            eventKey={card.id}
            key={card.id}
            onClick={() => selectCard(card)}
          >
            {card.name}
          </ListGroup.Item>
        ))
      }
    </StyledListGroup>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  errors: PropTypes.shape({
    details: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  selectCard: PropTypes.func,
};

CardList.defaultProps = {
  cards: [],
  errors: {},
  isLoading: false,
  selectCard: (el) => el.active,
};

export default CardList;

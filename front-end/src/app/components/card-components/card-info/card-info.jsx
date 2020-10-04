import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import ManaText from '../../mana-text/mana-text';
import LegalityTable from '../../legality-table/legality-table';

const CardInfo = (props) => {
  const { card } = props;

  return (
    <Card>
      <Card.Header>
        <b>
          {card.name}
          {' - '}
        </b>
        <ManaText>{card.mana_cost}</ManaText>
      </Card.Header>
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <b>Rullings</b>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Card.Text>
              <b>{card.type_line}</b>
              <br />
              <ManaText>{card.oracle_text}</ManaText>
            </Card.Text>
          </Card.Body>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          <b>Legality</b>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <LegalityTable legalities={card.legalities} />
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
      {
          card.flavor_text
          && (
          <Card.Footer>
            <blockquote className="blockquote mb-0">
              <footer className="blockquote-footer">
                {card.flavor_text}
              </footer>
            </blockquote>
          </Card.Footer>
          )
        }
    </Card>
  );
};

CardInfo.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    oracle_text: PropTypes.string,
    mana_cost: PropTypes.string,
    type_line: PropTypes.string,
    legalities: PropTypes.shape({}),
    flavor_text: PropTypes.string,
  }).isRequired,
};

export default CardInfo;

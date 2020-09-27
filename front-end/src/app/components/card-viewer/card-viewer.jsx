import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import ManaText from '../mana-text/mana-text';
import LegalityTable from '../legality-table/legality-table';

const CardViewer = (props) => {
  const [displayedFace, setdisplayedFace] = useState(0);
  const { card } = props;

  const cardImageUri = () => {
    if (card.image_uris) {
      return card.image_uris.normal;
    } if (card.card_faces) {
      return card.card_faces[displayedFace].image_uris.normal;
    }
    return '';
  };

  const flipCard = () => {
    const faceToDiplay = 1 - displayedFace;
    setdisplayedFace(faceToDiplay);
  };

  const getMultiFacedCard = () => (
    <Card>
      <Card.Header>
        <b>
          {card.card_faces[displayedFace].name}
          {' - '}
        </b>
        <ManaText>{card.card_faces[displayedFace].mana_cost}</ManaText>
      </Card.Header>
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <b>Rullings</b>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Card.Text>
              <b>{card.card_faces[displayedFace].type_line}</b>
              <br />
              <ManaText>{card.card_faces[displayedFace].oracle_text}</ManaText>
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
              {card.card_faces[displayedFace].flavor_text}
            </footer>
          </blockquote>
        </Card.Footer>
        )
      }
    </Card>
  );

  const getSingleFacedCard = () => (
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

  return (
    <>
      <Tabs defaultActiveKey="cardPrint">
        <Tab
          eventKey="cardPrint"
          title="Card Print"
        >
          <Card>
            <Card.Img variant="top" src={cardImageUri()} />
          </Card>
        </Tab>
        <Tab
          eventKey="cardInfo"
          title="Card Info"
        >
          {
            card.card_faces
              ? getMultiFacedCard()
              : getSingleFacedCard()
          }
        </Tab>
      </Tabs>
      {
        card.card_faces
        && (
        <Button
          variant="info"
          block
          onClick={() => flipCard()}
        >
          Flip Card
        </Button>
        )
      }
    </>
  );
};

CardViewer.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string,
    oracle_text: PropTypes.string,
    mana_cost: PropTypes.string,
    type_line: PropTypes.string,
    legalities: PropTypes.shape({}),
    flavor_text: PropTypes.string,
    image_uris: PropTypes.shape({
      normal: PropTypes.string,
    }),
    card_faces: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        oracle_text: PropTypes.string,
        mana_cost: PropTypes.string,
        type_line: PropTypes.string,
        flavor_text: PropTypes.string,
        image_uris: PropTypes.shape({
          normal: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};

export default CardViewer;

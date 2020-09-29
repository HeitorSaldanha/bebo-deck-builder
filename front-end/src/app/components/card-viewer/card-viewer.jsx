import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

import CardInfo from '../card-info/card-info';

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
              ? <CardInfo card={card.card_faces[displayedFace]} />
              : <CardInfo card={card} />
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

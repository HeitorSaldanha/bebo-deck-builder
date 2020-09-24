import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import CardSearch from '../../components/card-search/card-search';
import CardList from '../../components/card-list/card-list';
import deckBuilderContext from '../../../context/deck-builder-context';

const DecksView = () => {
  /* const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (!userData.user) {
      history.push('/auth/login');
    }
  }); */

  const [deckBuilderData, setDeckBuilderData] = useState({
      selectedCard: {}
  });

  const cardImageUri = () => {
    if (deckBuilderData.selectedCard.image_uris) {
      return deckBuilderData.selectedCard.image_uris.art_crop;
    } else if (deckBuilderData.selectedCard.card_faces) {
      return deckBuilderData.selectedCard.card_faces[0].image_uris.art_crop;
    }
  }

  return (
    <>
      <Container>
        <deckBuilderContext.Provider value={
          {
            deckBuilderData,
            setDeckBuilderData,
          }
        }
        >
          <Row>
            <Col>
              <h1>Decks</h1>
            </Col>
          </Row>
          <Row>
            <Col>
                <CardList />
            </Col>
            <Col>
            <Card>
              <Card.Img variant="top" src={cardImageUri()} />
              <Card.Body>
                <Card.Title>{deckBuilderData.selectedCard.name}</Card.Title>
                <Card.Text>{deckBuilderData.selectedCard.oracle_text}</Card.Text>
              </Card.Body>
            </Card>
            </Col>
            <Col>
                <CardSearch />
                <CardList />
            </Col>
          </Row>
        </deckBuilderContext.Provider>
      </Container>
    </>
  );
};

export default DecksView;

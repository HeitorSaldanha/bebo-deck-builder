import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'

import ManaText from '../../components/mana-text/mana-text';
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
      return deckBuilderData.selectedCard.image_uris.normal;
    } else if (deckBuilderData.selectedCard.card_faces) {
      return deckBuilderData.selectedCard.card_faces[0].image_uris.normal;
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
              <h1>Deck Builder</h1>
            </Col>
          </Row>
          <Row>
            <Col>
                <CardList />
            </Col>
            <Col>
              {
                deckBuilderData.selectedCard.name ?
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
                      <Card>
                        <Card.Header as="h5">{deckBuilderData.selectedCard.name}</Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <ManaText>{deckBuilderData.selectedCard.oracle_text}</ManaText>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Tab>
                  </Tabs> :
                <>
                </>
              }
            </Col>
            <Col>
            </Col>
          </Row>
        </deckBuilderContext.Provider>
      </Container>
    </>
  );
};

export default DecksView;

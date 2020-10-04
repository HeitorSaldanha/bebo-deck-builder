import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FormControl from 'react-bootstrap/FormControl';

import {
  BsChevronLeft, BsChevronRight, BsChevronDoubleLeft, BsChevronDoubleRight,
} from 'react-icons/bs';

import DeckViewer from '../../components/deck-viewer/deck-viewer';
import CardViewer from '../../components/card-components/card-viewer/card-viewer';
import CardSearch from '../../components/card-components/card-search/card-search';

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
    selectedCard: {},
  });

  const [deckList, setDeckList] = useState({
    name: '',
    author: '',
    colorIdentity: '',
    legalities: [],
    cards: [],
  });

  const updateDeckList = (card, operation, quant) => {
    if (operation === 'add') {
      const cardToAdd = { ...card, quant };
      const { cards } = deckList;
      let updatedList;
      if (cards.find((el) => el.id === cardToAdd.id)) {
        updatedList = cards.map((el) => {
          if (el.id === cardToAdd.id) {
            return {
              ...el,
              quant: el.quant + cardToAdd.quant,
            };
          }
          return el;
        });
      } else {
        updatedList = [...cards, cardToAdd];
      }
      setDeckList({
        ...deckList,
        cards: updatedList,
      });
    } else {

    }
  };

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
              <CardSearch />
            </Col>
            <Col>
              {
                deckBuilderData.selectedCard.name
                  ? (
                    <Container fluid>
                      <Row>
                        <CardViewer card={deckBuilderData.selectedCard} />
                      </Row>
                      <Row>
                        <Col>
                          <ButtonGroup aria-label="First group">
                            <Button onClick={() => updateDeckList(deckBuilderData.selectedCard, 'remove', 4)}>
                              <BsChevronDoubleLeft />
                            </Button>
                            <Button onClick={() => updateDeckList(deckBuilderData.selectedCard, 'remove', 1)}>
                              <BsChevronLeft />
                            </Button>
                            <Button onClick={() => updateDeckList(deckBuilderData.selectedCard, 'add', 1)}>
                              <BsChevronRight />
                            </Button>
                            <Button onClick={() => updateDeckList(deckBuilderData.selectedCard, 'add', 4)}>
                              <BsChevronDoubleRight />
                            </Button>
                          </ButtonGroup>
                        </Col>
                        <Col>
                          <InputGroup>
                            <FormControl placeholder="Ammount" />
                            <InputGroup.Append>
                              <Button>
                                <BsChevronDoubleRight />
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </Col>
                      </Row>
                    </Container>
                  )
                  : (
                    <>
                    </>
                  )
              }
            </Col>
            <Col>
              <DeckViewer cards={deckList.cards} />
            </Col>
          </Row>
        </deckBuilderContext.Provider>
      </Container>
    </>
  );
};

export default DecksView;

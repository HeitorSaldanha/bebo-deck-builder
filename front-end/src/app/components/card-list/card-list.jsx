import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import deckBuilderContext from '../../../context/deck-builder-context';

const CardList = () => {

  const [cardList, setCardList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {setDeckBuilderData} = useContext(deckBuilderContext);

  const handleSearch = async () => {
    const cardListResp = await Axios.get(`https://api.scryfall.com/cards/search?q=${searchQuery}`);
    if (cardListResp.data.object !== 'error') {
      setCardList(cardListResp.data.data);
    }
  }

  const selectCard = (card) => {
    setDeckBuilderData({
      selectedCard: card
    });
  };

  useEffect(() => {
    handleSearch();
  });

  return (
    <>
    <Form.Group>
      <Form.Control
        type="text"
        placeholder="Normal text"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </Form.Group>
      <ListGroup>
        {
          cardList.map((card) => {
            return (
              <ListGroup.Item
                eventKey={card.id}
                onClick={() => selectCard(card)}
              >
                {card.name}
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </>
  );
}

export default CardList;
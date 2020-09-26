import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { BsSearch } from 'react-icons/bs';

import ManaText from '../mana-text/mana-text';
import deckBuilderContext from '../../../context/deck-builder-context';
import StyledListGroup from './Style';

const CardList = () => {

  const [cardList, setCardList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const {setDeckBuilderData} = useContext(deckBuilderContext);

  const selectCard = (card) => {
    setDeckBuilderData({
      selectedCard: card
    });
  };

  useEffect(() => {
    setIsLoading(true);

    const handleSearch = async () => {
      Axios.get(`https://api.scryfall.com/cards/search?q=${searchQuery}`)
        .then(res => {
          const formatedCards = res.data.data.map((card) => {
            /*console.log('Hello');
            const formatedText = <ManaText text={card.oracle_text}/>;
            return ({
              ...card,
              oracle_text: formatedText
            })*/
            return card;
          });
          setCardList(res.data.data);
          setErrors(null);
        })
        .catch(err => {
          setCardList([]);
          setErrors(err.response.data);
        });
    }

    const delayDebounceFn = setTimeout(() => {
        handleSearch();
    }, 1000)
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(false);
  }, [cardList])

  return (
    <>
      <Form.Group>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Card Name"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <InputGroup.Append>
            <InputGroup.Text>
              {
                <BsSearch />
              }
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
      <StyledListGroup>
        {
          isLoading ?
            <Spinner animation="border" />
          :
            errors && searchQuery !== '' ?
              <ListGroup.Item
                variant="danger"
              >
                {errors.details}
              </ListGroup.Item>
            :
              cardList.length ?
                cardList.map((card) => {
                  return (
                    <ListGroup.Item
                      action
                      eventKey={card.id}
                      onClick={() => selectCard(card)}
                    >
                      {card.name}
                    </ListGroup.Item>
                  )
                })
              :
                <ListGroup.Item>
                  Start typing to search for a card
                </ListGroup.Item>
        }
      </StyledListGroup>
    </>
  );
}

export default CardList;
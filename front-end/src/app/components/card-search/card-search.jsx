import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';

import CardList from '../card-list/card-list';
import deckBuilderContext from '../../../context/deck-builder-context';

const CardSearch = () => {
  const [cardList, setCardSearch] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { setDeckBuilderData } = useContext(deckBuilderContext);

  const selectCard = (card) => {
    setDeckBuilderData({
      selectedCard: card,
    });
  };

  useEffect(() => {
    setIsLoading(true);

    const handleSearch = async () => {
      Axios.get(`https://api.scryfall.com/cards/search?q=${searchQuery}`)
        .then((res) => {
          setCardSearch(res.data.data);
          setErrors(null);
        })
        .catch((err) => {
          setCardSearch([]);
          setErrors(err.response.data);
        });
    };

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(false);
  }, [cardList]);

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
              <BsSearch />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
      <CardList
        cards={cardList}
        errors={errors}
        isLoading={isLoading}
        selectCard={selectCard}
      />
    </>
  );
};

export default CardSearch;

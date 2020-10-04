import React, { useState, Fragment } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const CardAutoComplete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`https://api.scryfall.com/cards/search?q=${query}`)
      .then((resp) => resp.json())
      .then((result) => {
        let optionsArr = [];
        if (result.object !== 'error') {
          optionsArr = result.data.map((i) => {
            const card = {
              name: i.name,
              id: i.id,
              image: '',
            };

            if (i.image_uris) {
              card.image = i.image_uris.art_crop;
            } else if (i.card_faces) {
              card.image = i.card_faces[0].image_uris.art_crop;
            }

            return card;
          });
        }

        setOptions(optionsArr);
        setIsLoading(false);
      });
  };

  return (
    <AsyncTypeahead
      id="teste"
      labelKey="name"
      isLoading={isLoading}
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option) => (
        <Fragment key={option.id}>
          <img
            alt={option.name}
            src={option.image}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span>{option.name}</span>
        </Fragment>
      )}
    />
  );
};

export default CardAutoComplete;

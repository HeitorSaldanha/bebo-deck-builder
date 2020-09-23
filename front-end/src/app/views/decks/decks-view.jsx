import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import CardSearch from '../../components/card-search/card-search';

const DecksView = () => {
  /* const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (!userData.user) {
      history.push('/auth/login');
    }
  }); */

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`https://api.scryfall.com/cards/search?q=${query}`)
      .then((resp) => resp.json())
      .then((result) => {
        let options = [];
        if (result.object !== 'error') {
          options = result.data.map((i) => {
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

        setOptions(options);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1>Decks</h1>
      <Card>
        <CardSearch />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Format</th>
              <th>Color Identity</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default DecksView;

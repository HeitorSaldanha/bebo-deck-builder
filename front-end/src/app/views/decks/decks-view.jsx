import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import mtg from 'mtgsdk';


const DecksView = () => {
  /*const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (!userData.user) {
      history.push('/auth/login');
    }
  });*/

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);
    mtg.card.all({name: query, pageSize: 1})
    .on('data', card => {
      setOptions([...options, card]);
      setIsLoading(false);
    });
  };

  return (
    <>
      <h1>Decks</h1>
      <AsyncTypeahead
        id="async-example"
        paginate={true}
        isLoading={isLoading}
        labelKey="login"
        minLength={3}
        onSearch={handleSearch}
        options={options}
        placeholder="Search for a Github user..."
        renderMenuItemChildren={(option, props) => (
          <Fragment id={option.id}>
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
      <Card>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Format</th>
              <th>Color Identity</th>
              <th></th>
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



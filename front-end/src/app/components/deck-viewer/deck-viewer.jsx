import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const DeckViewer = (props) => {
  const {
    cards, errors, isLoading, selectCard,
  } = props;

  return (
    <Container fluid>
      {
        !isLoading
        && errors
        && errors.details
        && (
          <Alert key="error" variant="danger">
            {errors.details}
          </Alert>
        )
      }
      {
        !isLoading
        && !errors
        && cards
        && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qauntity</th>
              </tr>
            </thead>
            <tbody>
              {
                cards.map((card) => (
                  <tr key={card.id}>
                    <td>{card.name}</td>
                    <td>{card.quant}</td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>
                  {
                        cards.reduce((prev, cur) => prev + cur.quant, 0)
                      }
                </td>
              </tr>
            </tfoot>
          </Table>
        )
      }
    </Container>
  );
};

DeckViewer.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  errors: PropTypes.shape({
    details: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  selectCard: PropTypes.func,
};

DeckViewer.defaultProps = {
  cards: [],
  errors: null,
  isLoading: false,
  selectCard: (el) => el.active,
};

export default DeckViewer;

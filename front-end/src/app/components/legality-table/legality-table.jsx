import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

import LegalitiesRules from './legalities-rules.json';

const LegalityTable = (props) => {
  const { legalities } = props;

  const setRowColor = (legality) => {
    const classLib = {
      legal: 'table-success',
      not_legal: 'table-danger',
      restricted: 'table-warning',
      banned: 'table-danger',
    };
    return classLib[legality];
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Format</th>
          <th>Legality</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.entries(legalities).map((el) => (
            <tr className={setRowColor(el[1])} key={`leaglity-table-row-${el[0]}`}>
              <td>
                {
                  `${el[0].charAt(0).toUpperCase()}${el[0].slice(1)}`
                }
              </td>
              <td>
                {
                  LegalitiesRules[el[1]]
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

LegalityTable.propTypes = {
  legalities: PropTypes.shape({
    standard: PropTypes.string,
    future: PropTypes.string,
    historic: PropTypes.string,
    pioneer: PropTypes.string,
    modern: PropTypes.string,
    legacy: PropTypes.string,
    pauper: PropTypes.string,
    vintage: PropTypes.string,
    penny: PropTypes.string,
    commander: PropTypes.string,
    brawl: PropTypes.string,
    duel: PropTypes.string,
    oldschool: PropTypes.string,
  }),
};

LegalityTable.defaultProps = {
  legalities: {
    standard: 'No Data',
    future: 'No Data',
    historic: 'No Data',
    pioneer: 'No Data',
    modern: 'No Data',
    legacy: 'No Data',
    pauper: 'No Data',
    vintage: 'No Data',
    penny: 'No Data',
    commander: 'No Data',
    brawl: 'No Data',
    duel: 'No Data',
    oldschool: 'No Data',
  },
};

export default LegalityTable;

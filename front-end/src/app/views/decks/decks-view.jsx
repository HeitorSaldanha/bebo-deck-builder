import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardViewer from '../../components/card-viewer/card-viewer';
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
    selectedCard: {},
  });

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
                deckBuilderData.selectedCard.name
                  ? <CardViewer card={deckBuilderData.selectedCard} />
                  : (
                    <>
                    </>
                  )
              }
            </Col>
            <Col />
          </Row>
        </deckBuilderContext.Provider>
      </Container>
    </>
  );
};

export default DecksView;

import React from 'react';
import Decks from './app/view/decks/decks-view';
import SideBar from './app/components/side-bar/SideBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
      <SideBar></SideBar>
          </Col>
          <Col>
      <Decks></Decks>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

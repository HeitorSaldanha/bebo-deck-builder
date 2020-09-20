import React from 'react';
import Card from 'react-bootstrap/card';

class DecksView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <Card.Body>This is some text within a card body.</Card.Body>
      </Card>
    );
  }
}

export default DecksView;

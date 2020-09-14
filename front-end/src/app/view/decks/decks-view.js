import React from 'react';
import Card from 'react-bootstrap/card';

class DecksComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleClick = () => {

    };

    render(){
      return (
        <Card>
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
      );
    }
}

export default DecksComponent;
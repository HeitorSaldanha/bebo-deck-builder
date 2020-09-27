import React from 'react';
import PropTypes from 'prop-types';

import reactStringReplace from 'react-string-replace';

import symbology from './symbology.json';

const ManaText = (props) => {
  const handleText = () => {
    let manifiedText = props.children;
    if (props.children) {
      // Replaces costs using the {} notation IE: Mana costs
      if (props.children.search(/({[^{]*?\w(?=\})})/g) !== -1) {
        manifiedText = reactStringReplace(manifiedText, /({[^{]*?\w(?=\})})/g, (match, i) => <i key={i} className={`ms ${symbology[match]} ms-cost ms-shadow .ms-fw`} />);
      }
      // Replaces positive loyality counters
      if (props.children.search(/(\+\w:)/g) !== -1) {
        manifiedText = reactStringReplace(manifiedText, /(\+\w:)/g, (match, i) => {
          const loyalityValue = match.replace(/\D/g, '');
          return (
            <>
              <br />
              <i key={i} className={`ms ms-loyalty-up ${symbology[`loyality${loyalityValue}`]} .ms-fw`} />
            </>
          );
        });
      }
      // Replaces negative loyality counters
      if (props.children.search(/(−\w:)/g) !== -1) {
        manifiedText = reactStringReplace(manifiedText, /(−\w:)/g, (match, i) => {
          const loyalityValue = match.replace(/\D/g, '');
          return (
            <>
              <br />
              <i key={i} className={`ms ms-loyalty-down ${symbology[`loyality${loyalityValue}`]} .ms-fw`} />
            </>
          );
        });
      }
      // Replaces 0 loyality counters
      if (props.children.search(/(0:)/g) !== -1) {
        manifiedText = reactStringReplace(manifiedText, /(0:)/g, (match, i) => (
          <>
            <br />
            <i key={i} className="ms ms-loyalty-zero ms-loyalty-0 .ms-fw" />
            ;
          </>
        ));
      }
    }
    return manifiedText;
  };

  return (
    <>
      {
        handleText()
      }
    </>
  );
};

ManaText.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ManaText;

import React from 'react';

import reactStringReplace from 'react-string-replace';

import symbology from './symbology.json';

const ManaText = (props) => {
  const handleText = () => {
    if(props.children) {
      let manifiedText = props.children;
      // Replaces costs using the {} notation IE: Mana costs
      if (props.children.search(/({[^{]*?\w(?=\})})/g) !== -1) {
        manifiedText = reactStringReplace(manifiedText, /({[^{]*?\w(?=\})})/g, (match) => {
          return <i className={`ms ${symbology[match]} ms-cost ms-shadow`} />;
        });
      };
      // Replaces positive loyality counters
      if (props.children.search(/(\+\w:)/g) !== -1) {
        manifiedText = reactStringReplace(manifiedText, /(\+\w:)/g, (match) => {
          const loyalityValue = match.replace(/\D/g,'');
          return (
            <>
              <br />
              <i className={`ms ms-loyalty-up ${symbology[`loyality${loyalityValue}`]}`} />
            </>
          );
        });
      };
      // Replaces negative loyality counters
      if (props.children.search(/(−\w:)/g) !== -1) {
        manifiedText = reactStringReplace(manifiedText, /(−\w:)/g, (match) => {
          const loyalityValue = match.replace(/\D/g,'');
          return (
            <>
              <br />
              <i className={`ms ms-loyalty-down ${symbology[`loyality${loyalityValue}`]}`} />
            </>
          );
        });
      };
      // Replaces 0 loyality counters
      if (props.children.search(/(0:)/g) !== -1) {
        manifiedText = reactStringReplace(manifiedText, /(0:)/g, (match) => {
          return (
            <>
              <br />
              <i className={`ms ms-loyalty-zero ms-loyalty-0`} />;
            </>
          );
        });
      };
      return manifiedText;
    }
  }

  return (
    <>
      {
        handleText()
      }
    </>
  );
}

export default ManaText;
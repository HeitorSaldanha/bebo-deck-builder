import React from 'react';

const ManaText = (props) => {

  const handleText = () => {
    const re = new RegExp('({[^{]*?)\w(?=\})}');
    const replacer = (match) => {
      console.log(match)
    };
    return props.text.replace(re, replacer);
  }

  return (
    <>
      {handleText()}
    </>
  );
}

export default ManaText;
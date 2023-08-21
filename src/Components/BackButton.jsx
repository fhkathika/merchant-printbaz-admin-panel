

import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const BackButton = ({ to, children }) => {
  const history = useHistory();

  const handleBack = () => {
    if (to) {
      history.push(to);
    } else {
      history.goBack();
    }
  };

  return (
    <span onClick={handleBack} style={{ fontSize: '30px', cursor: 'pointer' }}>
      &lt; {children}
    </span>
  );
};

export default BackButton;

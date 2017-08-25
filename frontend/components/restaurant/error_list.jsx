import React from 'react';

const ErrorList = ({ errors }) => {
  const errorItems = errors.map(error => <li key={ error }>{ error }</li>);

  return (
    <ul className="error-list">
      { errorItems }
    </ul>
  );
};

 export default ErrorList;

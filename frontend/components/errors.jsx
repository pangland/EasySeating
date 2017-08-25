import React from 'react';

class Errors extends React.Component() {
  render() {
    const errorListItems = this.prop.errors.map((error) => {
      return (
        <li>{error}</li>
      );
    });

    return (
      <ul className="errors-ul">
        {errorListItems}
      </ul>
    );
  }
}

export default Errors;

import React from 'react';

const Star = ({ isSelected, setRating }) => (
  // 1. Call the function that updates the rating state each time a list item is clicked

  // 2. Give the <li> the class 'selected' if it's one of the selected stars

  <li className={isSelected ? 'selected' : null} onClick={setRating}>
    <svg x="0px" y="0px" viewBox="0 0 16 15" className="star">
      <path
        d="M8.5,0.3l2,4.1c0.1,0.2,0.2,0.3,0.4,0.3l4.6,0.7c0.4,0.1,0.6,0.6,0.3,0.9l-3.3,3.2c-0.1,0.1-0.2,0.3-0.2,0.5l0.8,4.5
      c0.1,0.4-0.4,0.8-0.8,0.6l-4.1-2.1c-0.2-0.1-0.3-0.1-0.5,0l-4.1,2.1c-0.4,0.2-0.9-0.1-0.8-0.6l0.8-4.5c0-0.2,0-0.4-0.2-0.5L0.2,6.2
      C-0.2,5.9,0,5.4,0.5,5.3L5,4.7c0.2,0,0.3-0.1,0.4-0.3l2-4.1C7.7-0.1,8.3-0.1,8.5,0.3z"
      />
    </svg>
  </li>
);

export default Star;

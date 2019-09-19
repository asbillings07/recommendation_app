import React, { useState, useEffect } from 'react';
import Star from './Star';
import axios from 'axios';
import Config from '../../Config';

export default function StarRating({ context, recid }) {
  // Initialize a 'rating' state

  const [userRating, setUserRating] = useState(1);

  const updateRating = async () => {
    const data = {
      rate: userRating,
    };
    try {
      const res = await axios.put(
        `${Config.apiBaseUrl}/rating/recs/${recid}`,
        data,
        {
          headers: { Authorization: 'bearer ' + context.token },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUserRating = () => {};

  useEffect(() => {
    updateRating();
  }, []);

  //function that returns 5 Star components

  const renderStars = () => {
    let stars = [];
    let maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <Star
          isSelected={userRating > i}
          setRating={() => handleSetRating(i + 1)}
          key={i}
        />
      );
    }
    return stars;
  };

  // event handler that updates the rating state.
  const handleSetRating = rating => {
    if (userRating === rating) {
      setUserRating(0);
    } else {
      setUserRating(rating);
    }
  };

  // Pass the function to a Star component via props

  return <ul className="stars">{renderStars()}</ul>;
}

import React from 'react';
import AddRecommendation from './AddRecomendation';
import { render, cleanup } from '@testing-library/react';

const id = 1;

test('<AddRecommendation/>', () => {
  const { queryByLabelText } = render(<AddRecommendation id={id} />);

  expect(queryByLabelText('create-recommendation-button').textContent).toBe(
    'Create Recommendation'
  );
  expect(
    queryByLabelText('create-recommendation-button').getAttribute('href')
  ).toBe(`/category/${id}/recs/create`);
});

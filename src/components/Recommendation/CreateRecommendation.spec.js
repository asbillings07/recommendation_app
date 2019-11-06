import React from 'react';
import { CreateRecommendation } from './CreateRecommendation';
import {
  render,
  cleanup,
  fireEvent,
  queryAllByPlaceholderText,
} from '@testing-library/react';

describe('<CreateRecommendation/>', () => {
  beforeEach(cleanup);

  const props = {
    context: {
      data: 'data',
    },
    match: {
      data: 'data',
    },
    history: {
      data: 'data',
    },
  };

  it('should render correctly', () => {
    const { debug } = render(
      <CreateRecommendation
        context={props.context}
        match={props.match}
        history={props.history}
      />
    );
    debug();
  });
});

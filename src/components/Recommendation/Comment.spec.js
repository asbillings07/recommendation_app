import React from 'react';
import Comment from './Comment';
import {
  render,
  cleanup,
  fireEvent,
  queryAllByPlaceholderText,
} from '@testing-library/react';

describe('<Comment/>', () => {
  beforeEach(() => {
    cleanup();
  });

  const props = {
    comments: [
      {
        id: 1,
        comment: 'testing, testing, 123',
      },
      {
        id: 2,
        comment: 'test that react component',
      },
      {
        id: 3,
        comment: 'gotta have that kit-kat bar',
      },
    ],

    id: 1,
    token: '1234555',
    authedUser: 'Aaron Billings',
  };

  it('does not show comment form if user is not signed in', () => {
    const { queryByTestId } = render(
      <Comment
        comments={props.comments}
        id={props.id}
        token={props.token}
        authedUser={null}
      />
    );

    expect(queryByTestId('comment-form')).not.toBeTruthy();
  });
  it('Shows the comment form if user is signed in', () => {
    const { debug, getByTestId, getByPlaceholderText } = render(
      <Comment
        comments={props.comments}
        id={props.id}
        token={props.token}
        authedUser={props.authedUser}
      />
    );

    expect(getByTestId('comment-form')).toBeTruthy();
    expect(getByPlaceholderText('Enter Comment')).toBeTruthy();
  });

  it('should give an error when button is pressed without a comment', () => {
    const { queryAllByLabelText, getByText, getByTestId } = render(
      <Comment
        comments={props.comments}
        id={props.id}
        token={props.token}
        authedUser={props.authedUser}
      />
    );
    expect(queryAllByLabelText('the comment is').length).toEqual(
      props.comments.length
    );
    expect(getByText('Add Comment')).toBeTruthy();
    fireEvent.click(getByText('Add Comment'));
    expect(getByTestId('comment-error').textContent).toBe(
      'Please Enter a Comment'
    );
  });

  it('should add a comment when button is pressed and comment field is filled out', () => {
    const {
      debug,
      queryAllByLabelText,
      getByText,
      getByPlaceholderText,
      getByTestId,
    } = render(
      <Comment
        comments={props.comments}
        id={props.id}
        token={props.token}
        authedUser={props.authedUser}
      />
    );
    expect(queryAllByLabelText('the comment is').length).toEqual(
      props.comments.length
    );
    fireEvent.click(getByText('Add Comment'));
    // need to fix some test
  });
});

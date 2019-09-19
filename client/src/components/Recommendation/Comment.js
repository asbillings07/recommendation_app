import React, { useState } from 'react';
import { Card, Button, ListGroup, Form } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import axios from 'axios';
import Config from '../../Config';
import styled from 'styled-components';

const Comment = ({ comments, id, token, authedUser, catId, history }) => {
  const [userComment, setUserComment] = useState('');
  const [error, setError] = useState('');

  const comment = () => {
    if (!comments) return;
    return comments.map(comment => (
      <ListGroup variant="flush" key={comment.id}>
        <ListGroup.Item>{comment.comment}</ListGroup.Item>
      </ListGroup>
    ));
  };

  function AddComment(e) {
    e.preventDefault();
    const config = {
      headers: { Authorization: 'bearer ' + token },
    };

    const params = {
      comment: userComment,
    };
    if (userComment) {
      axios
        .post(`${Config.apiBaseUrl}/rec/${id}/comment`, params, config)
        .then(() => notify.show('Comment Added!', 'success', 5000))
        .catch(error => console.log(error));
    } else {
      setError('Please Enter a Comment');
    }
  }

  return (
    <StyledCard>
      <HError>{error}</HError>
      <h4>Comments</h4>
      {comment()}
      {authedUser && comments ? (
        <Form data-testid="comment-form" onSubmit={AddComment}>
          <Form.Control
            type="text"
            placeholder="Enter Comment"
            value={userComment}
            onChange={e => setUserComment(e.target.value)}
          />
          <Button variant="secondary" type="submit">
            Add Comment
          </Button>
        </Form>
      ) : (
        ''
      )}
    </StyledCard>
  );
};

export default Comment;

const HError = styled.h4`
  color: red;
`;

const StyledCard = styled(Card)`
  width: 50%;
  text-align: center;
`;

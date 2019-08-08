import React, { useState } from 'react';
import { Card, Button, ListGroup, Form } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import axios from 'axios';
import Config from '../../Config';
import styled from 'styled-components';

const Comment = ({ comments, token, id, authedUser }) => {
  const [userComment, setUserComment] = useState('');
  const [error, setError] = useState('');

  const comment = () => {
    return comments.map(comment => (
      <ListGroup variant="flush" key={comment.id}>
        <ListGroup.Item>{comment.comment}</ListGroup.Item>
      </ListGroup>
    ));
  };

  const AddComment = e => {
    e.preventDefault();
    const config = {
      headers: { Authorization: 'bearer ' + token },
    };

    const params = {
      comment: userComment,
    };

    axios
      .post(`${Config.apiBaseUrl}/rec/${id}/comment`, params, config)
      .then(() => {
        notify.show('Comment Added!', 'success', 5000);
      })
      .catch(error => {
        if (error) {
          setError('Please Enter a Comment');
        }
      });
  };

  return (
    <Card>
      <HError>{error}</HError>
      <Form.Label>Comments</Form.Label>
      {comment()}
      {authedUser ? (
        <>
          <Form.Control
            type="text"
            placeholder="Enter Comment"
            value={userComment}
            onChange={e => setUserComment(e.target.value)}
          />
          <Button variant="secondary" type="submit" onClick={AddComment}>
            Add Comment
          </Button>
        </>
      ) : (
        ''
      )}
    </Card>
  );
};

export default Comment;

const HError = styled.h4`
  color: red;
`;

const Label = styled(Form.Label)``;

import React, { useState } from 'react';
import { Card, Button, ListGroup, Form } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

const Comment = ({ comments, data, token, id }) => {
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
    // getting issue with using context API. Try with Axios
    e.preventDefault();
    data.createComment(id, token, userComment).then(error => {
      if (error) {
        setError(error);
      } else {
        notify.show('Comment Added!', 'success', 5000);
      }
    });
  };

  return (
    <Card.Footer>
      <Form onSubmit={AddComment}>
        <div>{error}</div>
        <Form.Label>Comments</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Comment"
          value={userComment}
          onChange={e => setUserComment(e.target.value)}
        />
        {comment()}
        <Button variant="secondary" type="submit">
          Add Comment
        </Button>
      </Form>
    </Card.Footer>
  );
};

export default Comment;

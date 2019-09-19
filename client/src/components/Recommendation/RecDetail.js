import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import Spinner from '../Spinner';
import Comment from './Comment';
//import Rating from './Rating';
import { Row, Card, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Rating from './Rating';
import AddRecommendation from './AddRecomendation';
import MapContainer from '../Map/MapContainer';
import styled from 'styled-components';

export default function RecDetail({ context, match, history }) {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRec, setSelectedRec] = useState({});
  const [catid, setCatid] = useState('');

  useEffect(() => {
    const getRecById = async () => {
      const { id } = match.params;
      setCatid(id);
      try {
        const data = await Axios.get(`${Config.apiBaseUrl}/category/${id}`);

        if (data) {
          const recs = data.data.category[0].Recommendations;

          setRecs(recs);
          setLoading(false);
        } else {
          history.push('/notfound');
        }
      } catch (err) {
        console.log(err);
        //   this.props.history.push('/notfound');
      }
    };
    getRecById();
  }, [history, match.params]);

  const showAllRecs = () => {
    return recs.map(rec => (
      <ListGroupItem key={rec.id} action onClick={() => setSelectedRec(rec)}>
        <Card.Title>{rec.title}</Card.Title>
        <Card.Subtitle className="mt-2 text-muted">
          {rec.location}
        </Card.Subtitle>
        <Card.Text>{rec.description}</Card.Text>
        <Rating context={context} recid={rec.id} />
        <Card.Text>
          Recommended by: {`${rec.User.firstName} ${rec.User.lastName}`}
        </Card.Text>
      </ListGroupItem>
    ));
  };

  if (loading) return <Spinner size="8x" spinning="spinning" />;

  return (
    <StyledContainer>
      <Row>
        <StyledCol sm={6} xs={12}>
          <Card>
            <AddRecommendation id={match.params.id} />
            <ListGroup>{showAllRecs()}</ListGroup>
          </Card>
          <Comment
            comments={selectedRec.Comments}
            token={context.token}
            id={selectedRec.id}
            catId={catid}
            authedUser={context.authorizedUser}
          />
        </StyledCol>
        <Col sm={6} xs={12}>
          <MapContainer selectedRec={selectedRec} />
        </Col>
      </Row>
    </StyledContainer>
  );
}

const StyledCol = styled(Col)`
  width: 100vw;
  height: 78vh;
  padding-right: 0px !important;
  overflow: scroll;
`;
const StyledContainer = styled.div`
  width: 100vw;
  margin-left: -1px !important;
  margin-top: 0.25rem;
`;

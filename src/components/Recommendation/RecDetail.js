import React, { useState, useEffect } from 'react'

import { Spinner } from '../reusableComponents'
import Comment from './Comment'
import { getCategoryById } from '../../Store/slices/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
// import Rating from './Rating'
import { Row, Card, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import Rating from './Rating'
import AddRecommendation from './AddRecomendation'
import MapContainer from '../Map/MapContainer'
import styled from 'styled-components'

export default function RecDetail({ match }) {
  const dispatch = useDispatch()
  const { category, loading } = useSelector((state) => state.categories)
  const { authorizedUser, token } = useSelector((state) => state.users)
  const [selectedRec, setSelectedRec] = useState({})
  const [catId, setCatId] = useState('')

  useEffect(() => {
    const { id } = match.params
    setCatId(id)
    dispatch(getCategoryById(id))
  }, [dispatch, match])

  const showAllRecs = () => {
    return category.map((rec) => (
      <ListGroupItem
        style={{ height: '12em' }}
        key={rec.id}
        action
        onClick={() => setSelectedRec(rec)}
      >
        <Card.Title>{rec.title}</Card.Title>
        <Card.Subtitle className='mt-2 text-muted'>{rec.location}</Card.Subtitle>
        <Card.Text>{rec.description}</Card.Text>

        {authorizedUser ? <Rating recid={selectedRec.id} /> : ''}
        <Card.Text>Recommended by: {`${rec.User.firstName} ${rec.User.lastName}`}</Card.Text>
      </ListGroupItem>
    ))
  }

  if (loading) return <Spinner size='8x' />

  return (
    <StyledContainer>
      {/* <Row>
        <StyledCol sm={6} xs={12}>
          <Card>
            <AddRecommendation id={match.params.id} />
            <ListGroup>{showAllRecs()}</ListGroup>
          </Card>
          <Comment
            comments={selectedRec.Comments}
            token={token}
            id={selectedRec.id}
            catId={catId}
            authedUser={authorizedUser}
          />
        </StyledCol>
        <Col sm={6} xs={12}>
          <MapContainer selectedRec={selectedRec} />
        </Col>
      </Row> */}
      <CardContainer>
        <StyledCard>
          <AddRecommendation id={match.params.id} />
          <ListGroup>{showAllRecs()}</ListGroup>
        </StyledCard>
      </CardContainer>
      <MapContainer selectedRec={selectedRec} />
    </StyledContainer>
  )
}

const CardContainer = styled.div`
  max-height: 35%;
  overflow-y: auto;
`
const StyledContainer = styled.div`
  width: 100vw;
  margin-left: -1px !important;
  margin-top: 0.25rem;
`
const StyledCard = styled(Card)`
  position: absolute !important;
  margin-top: 5em;
  z-index: 100;
  max-height: 45%;
  overflow-y: auto;
  overflow-x: hidden;
`

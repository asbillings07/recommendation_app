import React, { useState, useEffect, useCallback } from 'react'

import Spinner from '../Spinner'
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
  const [catid, setCatid] = useState('')

  // const getRecById = useCallback(async () => {
  //   const { id } = match.params
  //   setCatid(id)
  //   try {
  //     const data = await context.data.getCategoryById(id)
  //     console.log(data)
  //     if (data) {
  //       const recs = data.category[0].Recommendations
  //       setRecs(recs)
  //       setLoading(false)
  //     } else {
  //       history.push('/notfound')
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     history.push('/notfound')
  //   }
  // }, [])
  useEffect(() => {
    const { id } = match.params
    setCatid(id)
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

        {authorizedUser ? <Rating recid={rec.id} /> : ''}
        <Card.Text>Recommended by: {`${rec.User.firstName} ${rec.User.lastName}`}</Card.Text>
      </ListGroupItem>
    ))
  }

  if (loading) return <Spinner size='8x' spinning='spinning' />

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
            token={token}
            id={selectedRec.id}
            catId={catid}
            authedUser={authorizedUser}
          />
        </StyledCol>
        <Col sm={6} xs={12}>
          <MapContainer selectedRec={selectedRec} />
        </Col>
      </Row>
    </StyledContainer>
  )
}

const StyledCol = styled(Col)`
  width: 100vw;
  height: 78vh;
  padding-right: 0px !important;
  overflow: scroll;
`
const StyledContainer = styled.div`
  width: 100vw;
  margin-left: -1px !important;
  margin-top: 0.25rem;
`

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Context } from '../../Context'
import { Container, Row, Button, Col, Card } from 'react-bootstrap'
import AddRecommendation from '../Recommendation/AddRecomendation'
import styled from 'styled-components'
import Spinner from '../Spinner'

const CategoryDetail = ({ match }) => {
  const context = useContext(Context)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [category, setCategory] = useState('')
  const [id, setId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  // function pulls only the requested category from the API
  const getCategory = useCallback(async () => {
    const { id } = match.params
    console.log('REach HERE')
    const data = await context.data.getCategoryById(id)
    console.log(data)
    if (data) {
      setLoading(false)
      setCategory(data.data.category[0].Recommendations)
      setId(data.data.category[0].id)
    } else {
    }
  }, [match])

  useEffect(() => {
    getCategory()
  }, [])

  const showCategory = () => {
    return category.map(rec => (
      <CategoryCard className='text-center' key={rec.id}>
        <Card.Body>
          <Card.Title>{rec.title}</Card.Title>
          <Card.Text>{rec.description}</Card.Text>
          <Button href={`/rec/${rec.id}`} variant='primary'>
            Check it out
          </Button>
        </Card.Body>
      </CategoryCard>
    ))
  }

  if (loading) {
    return <Spinner size='4x' spinning='spinning' />
  } else {
    return (
      <>
        <Container>
          <Row>
            {showCategory()} <AddRecommendation id={id} />
          </Row>
        </Container>
      </>
    )
  }
}

export default CategoryDetail

const CategoryCard = styled(Card)`
  width: 18rem;
  height: auto;
  margin: 20px;
`

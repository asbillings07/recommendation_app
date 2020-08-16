// File isn't being used at this time

// import React, { useEffect } from 'react'
// import { Container, Row, Button, Card } from 'react-bootstrap'
// import AddRecommendation from '../Recommendation/AddRecomendation'
// import styled from 'styled-components'
// import { getCategoryById } from '../../Store/slices/categorySlice'
// import Spinner from '../Spinner'
// import { useDispatch, useSelector } from 'react-redux'

// const CategoryDetail = ({ match }) => {
//   const dispatch = useDispatch()
//   const { category, categoryId, loading } = useSelector((state) => state.categories)

//   useEffect(() => {
//     const { id } = match.params
//     dispatch(getCategoryById(id))
//   }, [])

//   const showCategory = () => {
//     return category.map((rec) => (
//       <CategoryCard className='text-center' key={rec.id}>
//         <Card.Body>
//           <Card.Title>{rec.title}</Card.Title>
//           <Card.Text>{rec.description}</Card.Text>
//           <Button href={`/rec/${rec.id}`} variant='primary'>
//             Check it out
//           </Button>
//         </Card.Body>
//       </CategoryCard>
//     ))
//   }

//   return (
//     <>
//       {loading ? (
//         <Spinner size='4x' spinning='spinning' />
//       ) : (
//         <Container>
//           <Row>
//             {showCategory()} <AddRecommendation id={categoryId} />
//           </Row>
//         </Container>
//       )}
//     </>
//   )
// }

// export default CategoryDetail

// const CategoryCard = styled(Card)`
//   width: 18rem;
//   height: auto;
//   margin: 20px;
// `

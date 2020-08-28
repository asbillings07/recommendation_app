import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col } from 'react-bootstrap'
import SearchBar from './SearchBar'
import styled from 'styled-components'
import { Spinner } from '../reusableComponents'
import bgPic from '../../images/recommend-it-bg.png'
import {
  faUtensils,
  faShoppingCart,
  faDog,
  faHotel,
  faShoePrints,
  faSign,
  faHiking,
  faUniversity,
  faCalendarAlt,
  faPlaneDeparture,
  faOilCan,
  faGlassCheers,
  faSpa,
  faTicketAlt,
  faPeopleCarry,
  faChild
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const buttonImgs = {
  Restaurants: faUtensils,
  Shopping: faShoppingCart,
  Pets: faDog,
  Hotels: faHotel,
  Fitness: faShoePrints,
  Daycare: faChild,
  'Real Estate': faSign,
  'Outdoor Activities': faHiking,
  Education: faUniversity,
  Events: faCalendarAlt,
  Travel: faPlaneDeparture,
  Automotive: faOilCan,
  Nightlife: faGlassCheers,
  Wellness: faSpa,
  Entertainment: faTicketAlt,
  'Home Services': faPeopleCarry
}

export default function CategoryList({ data, categories, setCategories, loading }) {
  const showCategories = () => {
    return categories.map((category) => (
      <Col className='mb-2' sm={4} key={category.id}>
        <StyledLink data-testid='category-link' to={`/category/${category.id}/recs`}>
          <CategoryButton
            aria-label={`navigate to ${category.title}`}
            variant='outline-primary'
            size='lg'
            block
          >
            <FontAwesomeIcon icon={buttonImgs[category.title]} />
          </CategoryButton>
        </StyledLink>
      </Col>
    ))
  }

  if (loading) {
    return <Spinner size='4x' />
  } else {
    return (
      <BgContainer>
        <SearchBar categories={data} setCategories={setCategories} />
        <H2 aria-label='Browse Categories'>Browse Categories</H2>
        <CategoryContainer>
          <Row>{showCategories()}</Row>
        </CategoryContainer>
      </BgContainer>
    )
  }
}

const BgContainer = styled.div`
  background-image: url(${bgPic}); /* The image used */
  background-color: #cccccc; /* Used if the image is unavailable */
  height: 500px; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
`
const H2 = styled.h2`
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-family: 'Oswald', sans-serif;
`
const CategoryContainer = styled(Container)`
  margin-bottom: 9px;
  margin-top: 3px;
`
const CategoryButton = styled(Button)`
  outline-color: #1168d9 !important;
  margin-bottom: 0.25em;

  :hover {
    background-color: #1168d9 !important;
    box-shadow: 0px 11px 13px -2px rgba(32, 44, 121, 0.65), 0px 20px 20px -26px rgb(0, 0, 0);
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  :hover {
    text-decoration: none !important;
  }
`

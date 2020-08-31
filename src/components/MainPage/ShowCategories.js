import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CategoryListButton, CategoryListLink } from '../../elements'

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

export const ShowCategories = ({ categories }) => {
  const showCategories = categories.map((category) => (
    <Col className='mb-2' sm={4} key={category.id}>
      <CategoryListLink data-testid='category-link' to={`/category/${category.id}/recs`}>
        <CategoryListButton
          aria-label={`navigate to ${category.title}`}
          variant='primary'
          size='lg'
          block
        >
          <FontAwesomeIcon icon={buttonImgs[category.title]} />
        </CategoryListButton>
      </CategoryListLink>
    </Col>
  ))

  return <Row>{showCategories}</Row>
}

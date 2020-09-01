import React from 'react'
import SearchBar from './SearchBar'
import {
  BackgroundImgContainer,
  CategoryContainer,
  CategoryListHeading,
  LayerContainer
} from '../../elements'
import { ShowCategories } from './ShowCategories'
import { Spinner } from '../reusableComponents'

export default function CategoryList({ data, categories, setCategories, loading }) {
  return (
    <>
      {loading ? (
        <Spinner size='4x' />
      ) : (
        <BackgroundImgContainer>
          <LayerContainer>
            <SearchBar categories={data} setCategories={setCategories} />
            <CategoryListHeading aria-label='Browse Categories'>
              Browse Categories
            </CategoryListHeading>
            <CategoryContainer>
              <ShowCategories categories={categories} />
            </CategoryContainer>
          </LayerContainer>
        </BackgroundImgContainer>
      )}
    </>
  )
}

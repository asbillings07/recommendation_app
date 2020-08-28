/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import CategoryList from './CategoryList'
import { getAllCategories } from '../../Store/slices/categorySlice'
import { useSelector, useDispatch } from 'react-redux'
import CarouselSlide from './CarouselSlide'

export default function Home() {
  const dispatch = useDispatch()
  const { authorizedUser, loading } = useSelector((state) => state.users)
  const { categories } = useSelector((state) => state.categories)
  const [category, setCateory] = useState([])

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  return (
    <>
      {/* <CarouselSlide authUser={authorizedUser} /> */}
      <CategoryList
        data={categories}
        categories={category}
        setCategories={setCateory}
        loading={loading}
      />
    </>
  )
}

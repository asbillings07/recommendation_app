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
  const [data, setData] = useState([])
  const [category, setCateory] = useState([])
  // const getAllCategories = async () => {
  //   try {
  //     const categories = await Axios.get(
  //       `${Config[env].apiBaseUrl}/category`
  //     ).catch(err => console.log(err))
  //     if (categories) {
  //       setData(categories.data.category)
  //       setLoading(false)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     history.push('/notfound')
  //   }
  // }

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  return (
    <>
      <CarouselSlide authUser={authorizedUser} />
      <CategoryList
        data={categories}
        categories={category}
        setCategories={setCateory}
        loading={loading}
      />
    </>
  )
}

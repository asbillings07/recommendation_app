import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import Axios from 'axios';
import Config from '../../Config';
import CarouselSlide from './CarouselSlide';

export default function Home({ context, history }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const categories = await Axios.get(`${Config.apiBaseUrl}/category`).catch(
        err => console.log(err)
      );
      if (categories) {
        setData(categories.data.category);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      history.push('/notfound');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [context, history]);

  return (
    <>
      <CarouselSlide authUser={context.authorizedUser} />
      <CategoryList
        data={data}
        categories={categories}
        setCategories={setCategories}
        loading={loading}
      />
    </>
  );
}

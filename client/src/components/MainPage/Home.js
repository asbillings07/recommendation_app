import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import Axios from 'axios';
import Config from '../../Config';
import SearchBar from './SearchBar';
import CarouselSlide from './CarouselSlide';

export default function Home({ context, history }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const categories = await Axios.get(
          `${Config.apiBaseUrl}/category`
        ).catch(err => console.log(err));
        if (categories) {
          setData(categories.data.category);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        history.push('/notfound');
      }
    };
    getAllCategories();
  }, [context, history]);

  return (
    <>
      <CarouselSlide authUser={context.authorizedUser} />
      <SearchBar categories={data} />

      <CategoryList categories={data} loading={loading} />
    </>
  );
}

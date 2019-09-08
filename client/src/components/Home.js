import React, { useState, useEffect } from 'react';
import CategoryList from '../components/Categories/CategoryList';
import Axios from 'axios';
import Config from '../Config';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import { Jumbotron, Container } from 'react-bootstrap';

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

  const authUser = context.authorizedUser;
  return (
    <>
      <StyledJumbotron fluid>
        <Container>
          {authUser ? (
            <h1>Welcome, {authUser.firstName}!</h1>
          ) : (
            <h1>Welcome, User!</h1>
          )}

          <p>Browse Recommendations or create your own!</p>
        </Container>
      </StyledJumbotron>
      <SearchBar />

      <CategoryList categories={data} loading={loading} />
    </>
  );
}

const StyledJumbotron = styled(Jumbotron)`
  background-image: url('https://images.unsplash.com/photo-1444852538915-ac95232916dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  width: 100%;
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;
  color: white;
`;

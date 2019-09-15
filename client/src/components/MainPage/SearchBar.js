import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

export default function SearchBar({ categories, setCategories }) {
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    setFilterList(categories);
    setCategories(categories);
  }, [categories, setCategories]);

  const handleChange = e => {
    let newList = [];

    if (e.target.value) {
      newList = filterList.filter(item => {
        const searchItem = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        const newfilter = searchItem.includes(filter);
        return newfilter;
      });
    } else {
      newList = categories;
    }
    setFilterList(newList);
    setCategories(newList);
  };

  return (
    <>
      <ContainerDiv aria-label="search bar">
        <InputGroup onChange={handleChange} className="mb-3">
          <FormControl placeholder="Search" />
          <InputGroup.Append>
            <Button variant="outline-info">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </ContainerDiv>
    </>
  );
}

const ContainerDiv = styled.div`
  padding-left: 3em;
  padding-right: 3em;
`;

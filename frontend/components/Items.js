import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import Item from "./Item";

const ALL_ITEMS = gql`
  query ALL_ITEMS {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = () => {
  const { loading, error, data } = useQuery(ALL_ITEMS);
  if (loading) return <Center>Loading...</Center>;
  if (error)
    return (
      <Center>
        Something went wrong! try again later. Error: {error.message}
      </Center>
    );
  return (
    <Center>
      <ItemsList>
        {data &&
          data.items.map(item => {
            return <Item key={item.id} item={item} />;
          })}
      </ItemsList>
    </Center>
  );
};

export default Items;
export { ALL_ITEMS };

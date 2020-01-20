import React, { useState } from "react";
import Router from "next/router";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from "../components/ErrorMessage";

const SINGLE_ITEM = gql`
  query SINGLE_ITEM($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation UPDATE_ITEM(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

const UpdateItem = ({ id }) => {
  const [state, setState] = useState({});
  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM);
  const { data, loading: queryLoading, error: queryError } = useQuery(
    SINGLE_ITEM,
    {
      variables: {
        id
      }
    }
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await updateItem({
      variables: { ...state, id }
    });
  };

  if (queryError) {
    return (
      <p>
        Something went wrong while fetching your item! Error:
        {queryError.message}
      </p>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Update an item.</h2>
      <ErrorMessage error={error} />
      <fieldset
        disabled={loading || queryLoading}
        aria-busy={loading || queryLoading}
      >
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            defaultValue={data && data.item.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={data && data.item.price}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            defaultValue={data && data.item.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save Changes</button>
      </fieldset>
    </Form>
  );
};

export default UpdateItem;

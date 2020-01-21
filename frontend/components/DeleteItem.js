import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { ALL_ITEMS } from "./Items";

const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = ({ children, id }) => {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM, {
    variables: {
      id
    },
    refetchQueries: [
      {
        query: ALL_ITEMS
      }
    ]
  });
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem();
    }
  };
  return <button onClick={handleDelete}>{children}</button>;
};

export default DeleteItem;

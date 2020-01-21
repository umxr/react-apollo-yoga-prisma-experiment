import React from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Form from "./styles/Form";
import useForm from "../hooks/useForm";
import ErrorMessage from "../components/ErrorMessage";

const CREATE_ITEM = gql`
  mutation CREATE_ITEM(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const { inputs, handleChange, resetForm, updateInputs } = useForm({
    title: "",
    price: 1,
    description: "",
    image: "",
    largeImage: ""
  });
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM);

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await createItem({
      variables: { ...inputs }
    });
    resetForm();
    Router.push({
      pathname: "/item",
      query: {
        id: data.createItem.id
      }
    });
  };

  const handleUpload = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dktkzgrvj/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const file = await res.json();
    updateInputs({
      ...inputs,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sell an item.</h2>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={inputs.title}
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
            value={inputs.price}
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
            value={inputs.description}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleUpload}
            required
          />
          {image && <img src={image} width={200} alt="upload preview" />}
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateItem;

import { useState } from "react";

const useForm = (initial = {}) => {
  const [inputs, updateInputs] = useState(initial);

  const handleChange = e => {
    updateInputs({
      ...inputs,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value
    });
  };

  const resetForm = () => {
    updateInputs(initial);
  };

  return {
    inputs,
    handleChange,
    resetForm
  };
};

export default useForm;

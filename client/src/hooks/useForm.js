import { useState, useCallback } from "react";
import { useAlert } from "../contexts/AlertContext";

export const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const { showAlert } = useAlert();

  const validate = useCallback(
    async (fieldValues = values) => {
      if (validationSchema) {
        try {
          await validationSchema.validate(fieldValues, { abortEarly: false });
          setErrors({});
          return true;
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          return false;
        }
      }
      return true;
    },
    [validationSchema, values]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e, onSubmit) => {
      e.preventDefault();
      try {
        const isValid = await validate();
        if (isValid) {
          await onSubmit(values);
        }
      } catch (error) {
        showAlert(error.message, "error");
      }
    },
    [validate, values, showAlert]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};

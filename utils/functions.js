export const getError = (e, defaultMessage) => {
  console.log(e)

  // Setup default
  const error = {
    message: e.message === "Network Error" ? "Network error, please try again." : defaultMessage || "Error getting data",
    type: "Application error",
    fields: {}
  };

  // Catch server response errors
  if (e.response && e.response.data) {
    const { message, type, errors } = e.response.data;
    error.message = message;
    error.type = type;
    if (errors) error.fields = errors;
  }

  // Return error
  console.log({ error: e.message, response: error }); // (Comment out when not in use)
  return error;
}
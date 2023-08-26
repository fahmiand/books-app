const succesRes = (response, message, data, status = 200) => {
  return response.status(status).json({
    code: status,
    message: message,
    data: data,
  });
};

const errorRes = (response, message, status = 400) => {
  return response.status(status).json({
    code: status,
    message: message,
  });
};

module.exports = {
  succesRes,
  errorRes,
};

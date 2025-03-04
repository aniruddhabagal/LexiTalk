// utils/responseFormatter.js
function success(data, message = "Success") {
  return {
    success: true,
    message,
    data,
  };
}

function error(message = "An error occurred", code = 500) {
  return {
    success: false,
    message,
    code,
  };
}

module.exports = {
  success,
  error,
};

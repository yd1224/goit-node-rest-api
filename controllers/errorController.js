export const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Server error", data, stack } = err;

  if (process.env.NODE_ENV !== "development") {
    return res.status(status).json({
      message,
    });
  }

  res.status(status).json({
    message,
    data,
    stack,
  });
};

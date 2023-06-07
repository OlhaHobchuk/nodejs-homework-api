const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Missing required field";
      next(error);
    }
    next();
  };
  return func;
};

module.exports = validateBody;

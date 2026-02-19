export const logMiddleware = (req, res, next) => {
  console.log("Hello Middleware");
  next();
};

export const logRequestMiddleware = (req, res, next) => {
  console.log(req.query);
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.url);
  console.log(req.body);

  next();
};

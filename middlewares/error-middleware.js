// Error handling also connect in server(by app.use(errorMiddleware)) and whenever error occure call next(error), and put values(objct value) in error like given blow , and it get value by validate-middleware.js

const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "Error from Backend";

    return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
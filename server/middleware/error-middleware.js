const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend error";
    const extradetails = err.extradetails || "Some extra error"

    return res.status(status).json({msg , extradetails});
}

module.exports = errorMiddleware;
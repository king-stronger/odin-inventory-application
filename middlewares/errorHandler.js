const errorHandler = (err, req, res, next) => {
    let status = err.status || 500;

    res.status(status).render("error", {
        title: "Error",
        message: err.message
    })
}

export default errorHandler;
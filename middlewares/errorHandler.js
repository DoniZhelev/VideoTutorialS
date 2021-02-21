const errorHandler = (err, req, res, next) =>{
    err.status = err.status || 500;
    err.message = err.message || 'Something went wrong';

    // TODO add page

    res.status(err.status).render('home', { message: 'Something went wrong!'})
};

module.exports = errorHandler;
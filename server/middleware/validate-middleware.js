const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill inputs properly";
        const extradetails = err.errors[0].message;
        const error = {
            status,
            message, 
            extradetails
        }
        next(error);
        // res.status(400).json({msg : message});
    }
}

module.exports = validate;
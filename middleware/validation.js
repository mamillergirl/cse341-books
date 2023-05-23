const validator = require('../helpers/validate');
const createAuthor = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "birthDate": "required|date",
        "deathDate" : "date",
        "bio": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const createBook = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "format": "string",
        "publication": "string",
        "pages" : "integer",
        "author": "required|string",
        "genre" : "string",
        "description": "string"

    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = {
    createAuthor,
    createBook
};
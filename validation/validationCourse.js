const { body } = require('express-validator');


module.exports= [
    body('title', 'The title should not be empty')
    .isLength({
        min: 4,
    }),
    body('description', 'The description should not be empty')
    .isLength({
        min: 20,
    }),
    body('imageUrl', 'The imageUrl should not be empty and starts with htpp or https')
    .isLength({
        min: 1
    })
]
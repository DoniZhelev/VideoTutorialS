const mongoose = require('mongoose');



const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true,

    },
    description: {
        type:String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required:true,
        
    },

    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    
});

// CourseSchema.pre('save', function(next) {
//     this.createdAt = new Date();

//     next();
// })

module.exports = mongoose.model('Course', CourseSchema);
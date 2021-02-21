const Course = require('../models/Course');

// list all courses              SORT ORDER DESCENDING
const getAll = (search) => {
    if(search) {

   return     Course.find({title: {$regex: search, $options: 'i'}}).sort({createdAt: -1}).lean();
    } else {
     return   Course.find({}).sort({createdAt: -1}).lean();
    }

}
    
// list course id
const getOne = (id, userId) => Course.findById(id).
then(course => {   // curse enroleed and others
    course.isEnrolled = course.usersEnrolled.includes(userId);
    course.isOwn = course.creator == userId;
    return course;
})
//create course
const create = (courseData, userId) =>{                                   //creator menu New
    let course = new Course({...courseData, createdAt: new Date(), creator: userId});

    return course.save();
};

const enrollUser = (courseId, userId) => {
    return Course.findById(courseId)
    .then(course => {
        course.usersEnrolled.push(userId);
        
    
        return course.save();
        
    })
}
// deleted fasty
const deleteCourse = (courseId) => {
 return   Course.deleteOne({_id: courseId})
};

const updateOne = (courseId, courseData) => {
  return  Course.updateOne({_id: courseId}, courseData)
};

const getTopCourses = (size) =>{
 return   Course.find().sort({usersEnrolled: -1}).limit(size).lean();
}

module.exports = {
    create,
    getAll,
    getOne,
    enrollUser,
    deleteCourse,
    updateOne,
    getTopCourses
}






// const getAllCourses = async (callback) =>{
//     const courses = await Course.find().lean();
//     return courses;

// }

// const sortByDate = async () => {
//     const course = await getAllCourses();
//     return course.filter(x => x.isPublic === true).sort ( (a,b) => new Date(b.createdAt) - new Date(a.createdAt));
// }

// const getCourse = async (id) =>{
//     const course = Course.findById(id).lean();
//     return course
// }
// module.exports = {
//     getAllCourses,
//     sortByDate,
//     getCourse
// }
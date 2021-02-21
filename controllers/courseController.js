const router = require('express').Router();

const courseService = require('../services/courseService');

router.get('/create', (req, res ) =>{
    res.render('create')
});


router.post('/create', (req, res, next ) =>{
  let { title, description, imageUrl, isPublic } = req.body;
  
  let courseData = {
    title,
    description,
    imageUrl,
    isPublic: Boolean(isPublic),
  }
                                      // req.user.id for delete and enroll carefull
  courseService.create(courseData, req.user._id)
  .then( createdCourse => {
      res.redirect('/');
  })
  .catch(next); 

});

router.get('/:courseId/details', (req,res,next) =>{
  
  courseService.getOne(req.params.courseId, req.user._id)
  .then(course =>{
    res.render('details', course)
  })
  .catch(next)
});

router.get('/:courseId/enroll', (req, res, next) =>{
  courseService.enrollUser(req.params.courseId, req.user._id)
  .then(() =>{
    res.redirect(`/course/${req.params.courseId}/details`);
  })
  .catch(next);
});

router.get('/:courseId/delete', (req, res, next) =>{
  courseService.deleteCourse(req.params.courseId)
  .then(() =>{
    res.redirect('/')
  })
  .catch(next)
});

router.get('/:courseId/edit', (req, res, next) => {
  courseService.getOne(req.params.courseId, req.user._id)
  .then(course => {
    course.checked = course.isPublic ? 'checked' : ''
    res.render('edit', course)
  })
  .catch(next);

});

router.post('/:courseId/edit', (req, res, next) => {
  let { title, description, imageUrl, isPublic } = req.body;
  
  let courseData = {
    title,
    description,
    imageUrl,
    isPublic: Boolean(isPublic),
  }
  courseService.updateOne(req.params.courseId, courseData)
  .then(() =>{
    res.redirect(`/course/${req.params.courseId}/details`);
  })  
  .catch(next)
  
});


module.exports = router;
const router = require('express').Router();
const Course = require('../models/Course')
const valudationCourse = require('../validation/validationCourse')
const { validationResult } = require('express-validator');
const courseService = require('../services/courseService')

// проверяваме дали има Юзер, а елс ни е за изкарване на топ3 енролнати курсове
   router.get('/',  async (req, res)=>{
      if(req.user) {
//                           SEACHHHHHHH!!!! :)
         courseService.getAll(req.query.search)
         .then(courses =>{
            res.render('home', {courses})
            
         })
      } else {
// топ3 за нелогнати Юзери
         courseService.getTopCourses(3)
         .then(courses =>{
            res.render('home', {courses});
         
         res.render('home')
         }
         )}
   });


module.exports = router;

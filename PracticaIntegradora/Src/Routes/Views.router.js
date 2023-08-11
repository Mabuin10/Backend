import {Router} from 'express';
import Users from '../Dao/DbManager/Users.js';
import Courses from '../Dao/DbManager/Courses.js';

const usersManager = new Users();
const coursesManager = new Courses();

const router = Router();

router.get('/',async(req,res)=>{
    let users = await usersManager.getAll();
    console.log(users);
    res.render('users',{users})
})

router.get('/courses',async(req,res)=>{
    let courses = await coursesManager.getAll();
    console.log(courses);
    res.render('courses',{courses})
})


export default router;
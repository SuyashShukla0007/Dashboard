import express from 'express'
import { courseController } from '../controllers/courseController.js'

const courseRoutes = express.Router()

courseRoutes.get('/', courseController.getAllCourses)
courseRoutes.post('/', courseController.createCourse)

export default courseRoutes
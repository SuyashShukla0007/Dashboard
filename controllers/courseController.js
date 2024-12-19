import { Course } from '../models/index.js'

export const courseController = {
  async getAllCourses(req, res) {
    try {
      const courses = await Course.findMany()
      res.status(200).json(courses)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error: error.message })
    }
  },

  async createCourse(req, res) {
    const { name } = req.body
    try {
      const course = await Course.create({
        data: { name }
      })
      res.status(201).json(course)
    } catch (error) {
      res.status(500).json({ message: 'Error creating course', error: error.message })
    }
  }
}
import { Student } from '../models/index.js'
import { StudentCourse } from '../models/index.js'
export const studentController = {
  async getAllStudents(req, res) {
    try {
      const students = await Student.findMany({
        include: {
          courses: {
            include: {
              course: true
            }
          }
        }
      })
      res.status(200).json(students)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error: error.message })
    }
  },

  async createStudent(req, res) {
    const { name, cohort, courses } = req.body
    try {
      const student = await Student.create({
        data: {
          name,
          cohort,
          courses: {
            create: courses.map(courseId => ({ course: { connect: { id: courseId } } }))
          }
        },
        include: {
          courses: {
            include: {
              course: true
            }
          }
        }
      })
      res.status(201).json(student)
    } catch (error) {
      res.status(500).json({ message: 'Error creating student', error: error.message })
    }
  },

  async updateStudent(req, res) {
    const { id } = req.params
    const { name, cohort, courses, status, lastLogin } = req.body
    try {
      const student = await Student.update({
        where: { id },
        data: {
          name,
          cohort,
          status,
          lastLogin,
          courses: {
            deleteMany: {},
            create: courses.map(courseId => ({ course: { connect: { id: courseId } } }))
          }
        },
        include: {
          courses: {
            include: {
              course: true
            }
          }
        }
      })
      res.status(200).json(student)
    } catch (error) {
      res.status(500).json({ message: 'Error updating student', error: error.message })
    }
  },

  async deleteStudent(req, res) {
    const { id } = req.params
    try {

      await StudentCourse.deleteMany({
        where: {
          studentId: id, // Replace with the studentId you're deleting
        },
      });

      await Student.delete({
        where: { id }
      })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student', error: error.message })
    }
  }
}
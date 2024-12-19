import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Student = prisma.student
export const Course = prisma.course
export const StudentCourse = prisma.studentCourse
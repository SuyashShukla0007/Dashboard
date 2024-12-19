import express from 'express'
import studentRoutes from './routes/studentRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import cors from 'cors'
const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/students', studentRoutes)
app.use('/api/courses', courseRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app
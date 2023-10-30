import express from 'express'
import { router } from './routes/routes.js'

const app = express()

app.use(express.json())

app.use("api/v1", router)

app.listen(3100, () => {
    console.log('Port online on port 3100')
})
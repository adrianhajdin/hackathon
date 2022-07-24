import express from 'express'
import cors from 'cors'
import { generateUploadURL } from './s3.js'

const app = express()
app.use(cors())

app.use(express.static('front'))

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(8080, () => console.log("listening on port 8080"))
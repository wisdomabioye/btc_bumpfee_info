import { createServer } from 'http'
import express from 'express'
import txRouter from './tx.router'


const app = express()
const PORT = 3030

app.get('/', (req, res) => {
    res.send('Ready to serve requests!')
})

app.get('/tic', (_, res) => {
  res.send('tac')
})

app.use('/tx', txRouter)

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
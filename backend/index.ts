import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import positions from './mock-data/currencies-list.json'
import currencies from './mock-data/currencies-data.json'

dotenv.config()

const app: Express = express()
const port = process.env.SERVER_PORT

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('this is the backend root route')
})

app.get('/positions', (req: Request, res: Response) => {
  res.json(positions)
})

app.get('/currencies/:symbol', (req: Request, res: Response) => {
  // TODO recalculate isUpTrend here
  const currency = currencies.find(
    currency => currency.symbol === req.params.symbol
  )

  res.json(currency)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
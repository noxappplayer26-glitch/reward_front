import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Registration from './models/Registration.js'

const PORT = process.env.PORT || 4000
const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    'MONGODB_URL is not set. Please define it in your environment or .env file before starting the server.',
  )
}

async function connectToDatabase() {
  if (!MONGODB_URL) return
  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: process.env.MONGODB_DB || 'reward_app',
    })
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB', error)
  }
}

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/registrations', async (req, res) => {
  try {
    const { name, phone, email, city, language } = req.body || {}

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' })
    }

    const doc = await Registration.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      city: city ? String(city).trim() : undefined,
      language: language === 'bn' ? 'bn' : 'en',
      userAgent: req.headers['user-agent'],
      ipAddress:
        req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
        req.socket.remoteAddress,
    })

    res.status(201).json({
      ok: true,
      registrationId: doc._id,
      createdAt: doc.createdAt,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating registration', error)
    res.status(500).json({ error: 'Failed to save registration.' })
  }
})

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Reward backend listening `)
  })
})


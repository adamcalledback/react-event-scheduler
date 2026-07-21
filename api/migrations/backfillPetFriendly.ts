import dotenv from 'dotenv'
import { connect, disconnect } from 'mongoose'
import { EventModel } from '../models/event'

dotenv.config()

const backfillPetFriendly = async () => {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not provided!')
  }

  await connect(mongoUri)

  try {
    const result = await EventModel.updateMany(
      { isPetFriendly: { $exists: false } },
      { $set: { isPetFriendly: false } },
    )
    const remaining = await EventModel.countDocuments({
      isPetFriendly: { $exists: false },
    })

    console.log(`Updated ${result.modifiedCount} event(s).`)
    console.log(`Events missing isPetFriendly: ${remaining}`)

    if (remaining !== 0) {
      throw new Error('Backfill incomplete.')
    }
  } finally {
    await disconnect()
  }
}

backfillPetFriendly().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})

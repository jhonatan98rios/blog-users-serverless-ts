import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

export default class Database {

    static async connect() {
        mongoose.set("strictQuery", false);

        try {
            /* const connectionString = `mongodb+srv://${process.env.DATABASE_HOST!}`
            const conn = await mongoose.connect(connectionString, {
                dbName: process.env.DATABASE_NAME!,
                user: process.env.DATABASE_USER!,
                pass: process.env.DATABASE_PASS!
            }) */

            const connectionString = `mongodb+srv://${process.env.DATABASE_USER!}:${process.env.DATABASE_PASS!}@${process.env.DATABASE_HOST!}/${process.env.DATABASE_NAME!}`
            const conn = await mongoose.connect(connectionString)

            console.log('Database connection successful')
            return conn
            
        } catch (err) {
            console.error('Database connection error:', err)
        }
    }
}



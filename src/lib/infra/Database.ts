import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()


export default class Database {
    
    static async connect() {
        mongoose.set("strictQuery", false);

        try {
            // const connectionString = `mongodb://${process.env.DATABASE_HOST!}`
            // const conn = await mongoose.connect(connectionString, {
            //     dbName: process.env.DATABASE_NAME!,
            //     user: process.env.DATABASE_USER!,
            //     pass: process.env.DATABASE_PASS!,
            //     retryReads: true,
            //     retryWrites: true,
            // })

            const connectionString = `mongodb+srv://${process.env.DATABASE_USER!}:${process.env.DATABASE_PASS!}@${process.env.DATABASE_HOST!}/?retryWrites=true&w=majority&appName=ClusterBlog"`
            const conn = await mongoose.connect(connectionString, {
                dbName: process.env.DATABASE_NAME!
            })

            console.log('Database connection successful')
            return conn
            
        } catch (err) {
            throw Error('Database connection error: ' + err)
        }
    }
}



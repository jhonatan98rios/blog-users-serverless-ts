import mongoose from 'mongoose'

interface DatabaseProps {
    user: string
    password: string
    collection: string
}

export default class Database {

    constructor(private props: DatabaseProps) {
        this.connect()
    }

    public async connect() {
        mongoose.set("strictQuery", false);

        try {
            const connectionString = `mongodb+srv://${this.props.user}:${this.props.password}@clusterblog.0lqj7jz.mongodb.net/${this.props.collection}`
            return await mongoose.connect(connectionString)
            
        } catch (err) {
            console.error('Database connection error:', err)
        
        } finally {    
            console.log('Database connection successful')
        }       
    }
}



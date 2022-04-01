import mongoose from 'mongoose'

const schoolSchema = new mongoose.Schema({
    text: { type: String },
    value: { type: String }
})

export default mongoose.models.School || mongoose.model('School', schoolSchema)
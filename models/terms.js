import mongoose from 'mongoose'

const termsSchema = new mongoose.Schema({
    text: { type: String },
    value: { type: String }
})

export default mongoose.models.Term || mongoose.model('Term', termsSchema)
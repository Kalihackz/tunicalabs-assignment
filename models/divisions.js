import mongoose from 'mongoose'

const divisionSchema = new mongoose.Schema({
    text: { type: String },
    value: { type: String }
})

export default mongoose.models.Division || mongoose.model('Division', divisionSchema)
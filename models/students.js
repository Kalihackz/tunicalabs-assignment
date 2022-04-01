import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    idv: { type: Number },
    name: { type: String },
    age: { type: Number },
    school: { type: String },
    class: { type: Number },
    division: { type: String },
    status: { type: String },
})

export default mongoose.models.Student || mongoose.model('Student', studentSchema)
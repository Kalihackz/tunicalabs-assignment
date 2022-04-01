import dbConnect from '../../../middleware/dbConnect';
import Student from '../../../models/students';

export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'GET' ) {

        try {
            const students = await Student.find({}).limit(9).exec()
            if ( students.length < 1 ) return res.status(200).json({ success: 'true', data: [] })
            res.status(200).json({ success: 'true', data: students })
        } catch (error) {
            res.status(404).json({ success: 'false', data: [] })
        }
    
    }
}
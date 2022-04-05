import dbConnect from '../../../middleware/dbConnect';
import Student from '../../../models/students';

// Deletes student detail from database
export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'POST' ) {

        // Login cookie not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        // Delete Student data
        try {
            let data = JSON.parse(req.body)
            let p = await Student.findByIdAndDelete( data._id )
            res.status(200).json({ success: 'true' })
        } catch (error) {
            res.status(404).json({ success: 'false' })
        }
    
    } else {

        res.status(400).json({ success: 'false' })

    }
}
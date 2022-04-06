import dbConnect from '../../../middleware/dbConnect';
import Student from '../../../models/students';

// Allows editing and updating of new student data
export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'POST' ) {

        if ( req.headers.referer !== 'https://tunicalabs-abir-kalihackz.vercel.app/' ) {

            return res.status(403).json({ success: 'false' })

        }

        // Login cookie is not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        // Updates new student data
        try {
            let data = JSON.parse(req.body)
            let p = await Student.findByIdAndUpdate( data._id, data )
            res.status(200).json({ success: 'true' })
        } catch (error) {
            res.status(404).json({ success: 'false' })
        }
    
    } else {

        res.status(400).json({ success: 'false' })

    }
}
import dbConnect from '../../../middleware/dbConnect';
import School from '../../../models/schools';

// Fetches all schools present in database
export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'GET' ) {

        // Login cookie is not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        try {
            const schools = await School.find({}).limit(9).exec()
            if ( schools.length < 1 ) return res.status(200).json({ success: 'true', data: [] })
            res.status(200).json({ success: 'true', data: schools })
        } catch (error) {
            res.status(404).json({ success: 'false', data: [] })
        }
    
    }
}
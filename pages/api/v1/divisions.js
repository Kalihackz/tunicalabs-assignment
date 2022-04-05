import dbConnect from '../../../middleware/dbConnect';
import Division from '../../../models/divisions';

// Fetch divisions present in database
export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'GET' ) {

        // Login cookie not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        try {
            const divisions = await Division.find({}).limit(9).exec()
            if ( divisions.length < 1 ) return res.status(200).json({ success: 'true', data: [] })
            res.status(200).json({ success: 'true', data: divisions })
        } catch (error) {
            res.status(404).json({ success: 'false', data: [] })
        }
    
    }
}
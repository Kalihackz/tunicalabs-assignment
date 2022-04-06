import dbConnect from '../../../middleware/dbConnect';
import Term from '../../../models/terms';

// Sends class present in database
export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'GET' ) {

        if ( req.headers.referer !== 'https://tunicalabs-abir-kalihackz.vercel.app/' ) {

            return res.status(403).json({ success: 'false' })

        }

        console.log(req.headers.cookie )

        // Login cookie not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        try {
            const terms = await Term.find({}).limit(9).exec()
            if ( terms.length < 1 ) return res.status(200).json({ success: 'true', data: [] })
            res.status(200).json({ success: 'true', data: terms })
        } catch (error) {
            res.status(404).json({ success: 'false', data: [] })
        }
    
    }
}
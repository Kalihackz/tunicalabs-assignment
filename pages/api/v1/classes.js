import dbConnect from '../../../middleware/dbConnect';
import Term from '../../../models/terms';

export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'GET' ) {

        try {
            const terms = await Term.find({}).limit(9).exec()
            if ( terms.length < 1 ) return res.status(200).json({ success: 'true', data: [] })
            res.status(200).json({ success: 'true', data: terms })
        } catch (error) {
            res.status(404).json({ success: 'false', data: [] })
        }
    
    }
}
import dbConnect from '../../../../middleware/dbConnect';
import Student from '../../../../models/students';

// Sends individual data of Students
export default async function handler(req, res) {

    await dbConnect()

	if ( req.method === 'GET' ) {

        if ( req.headers.referer !== 'https://tunicalabs-abir-kalihackz.vercel.app/' ) {

            return res.status(403).json({ success: 'false' })

        }

        // Login Cookie not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        const { idv } = req.query;

        try {
            const student = await Student.find({ idv: idv })
            if ( student.length < 1 ) return res.status(404).json({ success: 'true', data: {} })
            res.status(200).json({ success: 'true', data: student })
        } catch (error) {
            res.status(404).json({ success: 'false', data: {} })
        }
    
    }
}
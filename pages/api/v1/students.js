import dbConnect from '../../../middleware/dbConnect';
import Student from '../../../models/students';

// Fetches student details page wise
export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'GET' ) {

        // Login cookie is not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        const { currentPage } = req.query;

         if ( currentPage === 0 ){

            try {
                const students = await Student.find({}).limit(9).exec()
                const count = await Student.count({})
                if ( students.length < 1 ) return res.status(404).json({ success: 'true', data: [], total: 0 })
                res.status(200).json({ success: 'true', data: students, total: count })
            } catch (error) {
                res.status(200).json({ success: 'false', data: [], total: 0 })
            }

        } else {

            try {
                const students = await Student.find({'idv': {'$gt': currentPage}}).limit(9).exec()
                const count = await Student.count({})
                if ( students.length < 1 ) return res.status(404).json({ success: 'true', data: [], total: 0 })
                res.status(200).json({ success: 'true', data: students, total: count })
            } catch (error) {
                res.status(200).json({ success: 'false', data: [], total: 0 })
            }
        }
    
    } else if ( req.method === 'POST' ) {

        res.status(400).json({ success: 'false' })        

    }
}
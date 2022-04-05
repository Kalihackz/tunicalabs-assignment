import dbConnect from '../../../middleware/dbConnect';
import Student from '../../../models/students';

// Searches database to find particular student
export default async function handler(req, res) {

    await dbConnect()

	if ( req.method === 'GET' ) {

        // Login cookie is not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        const { name, age, school, term, division } = req.query;
        try {
            const student = await Student.find( {$or: [{ name: name },{ age: age }, { school: school }, { class: term },{ division: division }]}).limit(9)
            if ( student.length < 1 ) return res.status(200).json({ success: 'true', data: [] })
            res.status(200).json({ success: 'true', data:student })
        } catch (error) {
            res.status(404).json({ success: 'false', data: [] })
        }
    
    }
}
import dbConnect from '../../../middleware/dbConnect';
import Student from '../../../models/students';

// Searches database to find particular student
export default async function handler(req, res) {

    await dbConnect()

    if (req.method === 'GET') {

        function maybeCreateMongoQuery(prop, value) {
            return value === '' ? null : { [prop]: value };
        }

        if (req.headers.referer !== 'https://tunicalabs-abir-kalihackz.vercel.app/') {

            return res.status(403).json({ success: 'false' })

        }

        // Login cookie is not present
        if (!req.headers.cookie) {

            return res.status(403).json({ success: 'false' })

        }

        const { name, age, school, term, division } = req.query;

        console.log(name, age, school, term, division)
        console.log(typeof name, typeof age)
        try {

            const student = await Student.find({
                $and: [
                    maybeCreateMongoQuery('name', name),
                    maybeCreateMongoQuery('age', age),
                    maybeCreateMongoQuery('school', school),
                    maybeCreateMongoQuery('class', term),
                    maybeCreateMongoQuery('division', division),
                    // ...
                ].filter(q => q !== null)
            }).limit(9)

            if (student.length < 1) return res.status(200).json({ success: 'true', data: [] })
            res.status(200).json({ success: 'true', data: student })
        } catch (error) {
            res.status(404).json({ success: 'false', data: [] })
        }

    }
}
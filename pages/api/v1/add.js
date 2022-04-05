import dbConnect from '../../../middleware/dbConnect';
import Student from '../../../models/students';

// Adds new student to database
export default async function handler(req, res) {
    
    await dbConnect()

    // Convert Date of birth to age 
    const calculate_age = ( dob ) => {
        var ageDifMs = Date.now() - (new Date(dob)).getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    if ( req.method === 'POST' ) {

        // Login cookie not present
        if ( !req.headers.cookie ) {

            return res.status(403).json({ success: 'false' })

        }

        let data = JSON.parse( req.body )
       
        const lastDoc = await Student.find({}).sort({_id:-1}).limit(1)
        
        console.log(lastDoc)

        let student = new Student({
            idv: parseInt(lastDoc[0].idv) + 1,
            name: data.name,
            age: `${calculate_age( data.dob )}`,
            school: data.school,
            class: data.class,
            division: data.division,
            status: data.status,
        })
        // Add new data
        await student.save()

        res.status(200).json({ success: 'true' })
    
    } else {

        res.status(400).json({ success: 'false' })
    }
}
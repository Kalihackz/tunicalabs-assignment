// Performs authentication of the email and pass and sets cookie
export default async function handler(req, res) {

    if ( req.method === 'POST' ) {

        let data = JSON.parse( req.body )

        if ( data.email === 'abir@gmail.com' && data.password==='12345' ) {

            res.status(200).json({ success: 'true', cookie: 'abir12345@hashed' })

        } else {

            res.status(200).json({ success: 'false' })

        }

    
    } else {

        res.status(400).json({ success: 'false' })
    }
}
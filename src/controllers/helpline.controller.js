const colors = require('colors');

const helpline = (req, res) => {
    try {
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            status : 'success',
            message : 'Helpline Details fetched',
            Helpline : {
                "contact_1" : '+91 XXX 2641407',
                "contact_2" : '+91 XXX 6231407',
                "e-mail" : 'contactus@airindia-clone.com'
            }
        }))
        console.log('Helpline Details fetched successfully'.bold.bgCyan);
    } catch (error) {
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Error while getting Helpline Details'
        }))
        console.log('Error while fetching Data'.bold.red, error);
    }
}

module.exports = {
    helpline
}
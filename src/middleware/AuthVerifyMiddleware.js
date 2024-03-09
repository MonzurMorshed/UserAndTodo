const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    let Token = req.headers['token-key'];
    jwt.verify(Token,'ostad',function(err,decoded){
        if(err) {
            res.status(401).json({status:unauthorized});
        } else {
            // Get username for decoded token & set request header
            let username = decoded['data']['UserName'];
            req.headers.username = username;
            next();
        }
    });
}
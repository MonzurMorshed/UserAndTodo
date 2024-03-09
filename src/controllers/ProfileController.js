const jwt = require("jsonwebtoken");
const ProfileModel = require("../models/ProfileModel");

exports.CreateProfile = (req,res) => {
    let reqBody = req.body;
    ProfileModel.create(reqBody).then(
        () => { 
            return res.status(200).json({status:'success',data:reqBody});
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}

exports.UserLogin = (req,res) => {
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];
    
    ProfileModel.find({
        UserName:UserName,
        Password:Password
    }).then(
        (data,err) => { 
            if(data.length > 0) {

                // Create Auth Token
                let Payload = {
                    exp: Math.floor(Date.now()/1000 * (24*60*60)),
                    data:data[0]
                };
                let token = jwt.sign(Payload,'ostad');
                
                return res.status(200).json({status:'success',token:token,data:data});
            }
            else {
                return res.status(401).json({status:'unauthorized'});
            }
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}

exports.SelectProfile = (req,res) => {

    let UserName = req.headers['username'];
    ProfileModel.find({
        UserName:UserName
    }).then(
        (data) => { 
            return res.status(200).json({status:'success',data:data});  
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}

exports.UpdateProfile = (req,res) => {

    let UserName = req.headers['username'];
    ProfileModel.find({
        UserName:UserName
    }).then(
        (data) => { 
            return res.status(200).json({status:'success',data:data});  
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}
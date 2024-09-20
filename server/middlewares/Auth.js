const jwt =require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token = req.cookies.jwt;
    if(!token) return res.status(401).send("You are not authenticated.");
    jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
        if(err) return res.status(403).send("Token is invalid.");
        req.userId = payload.id;
        next();
    })
}

module.exports = {verifyToken};
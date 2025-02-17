const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.register = async ( req , res) => {
    try{
        const { email , password } = req.body
        
        // Step2 Validate body
        if (!email) {
            return res.status(400).json({ message : 'Email is required '})
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required'})
        }
        // Check email in DB
        const user = await prisma.user.findFirst({
            where : {
                email : email
            }
        })
        if (user) {
            return res.status(400).json({ message : 'Email already exits!!'})
        }   
        // Step3 Hash password
        const hashPassword = await bcrypt.hash(password, 10)

        //Step4 Register
        await prisma.user.create({
            data: {
                email,
                password : hashPassword
            }
        })
        res.send('Register Success!!')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error'})
    }
}
exports.login = async(req,res)=> {    
    try{ 
        //Step1 Check email
        const { email , password } = req.body
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user || !user.enable) {
            return res.status(400).json({ message : 'User Not found or not Enabled'})
        }
        //Step2 Check Password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ message : 'Password Invalid!!'})
        }
        //Step3 Create Payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        //Step4 Generate Token
        jwt.sign(payload, process.env.SECRET, { expiresIn:'1d'},(err, token)=> {
            if(err) {
                return res.status(500).json({ message: 'Server Error'})
            }
            res.json({ payload, token})
        })

    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error'})
    }
}

exports.currentUser = async(req,res)=>{
    try{
        res.send('Hello current User')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error'})
    }
}

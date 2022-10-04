const mongoose = require('mongoose')
function connection(){ 
    return mongoose.connect(`${process.env.MONGODB_PREFIX}://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_IPWITHPORT}/${process.env.MONGODB_AUTHSOURCE}`,(err,db)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('Database connected.')        
    }
})}
module.exports = connection
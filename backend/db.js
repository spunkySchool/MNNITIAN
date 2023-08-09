const mongoose = require('mongoose');
const dbURL="mongodb+srv://Ekalavya:Ekalavya123@cluster0.jdljg9r.mongodb.net/student?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(dbURL,{useNewUrlParser:true},async(err,res) =>{
        if(err) console.log("---",err)
        else{
            console.log('Mongo connected');
            let fetched_data = await mongoose.connection.db.collection("experiences");
            fetched_data.find({}).toArray(async function(err, data) {
                if(err) console.log(err);
                else{
                    global.experience=data;
                    //console.log(global.experience)
                }
            })
            fetched_data = await mongoose.connection.db.collection("Skills");
            fetched_data.find({}).toArray(async function(err, data) {
                    if(err) console.log(err);
                    else{
                        global.Skills=data[0].Skills;
                    }
                })
            
            fetched_data = await mongoose.connection.db.collection("userskills");
            fetched_data.find({}).toArray(async function(err, data) {
                    if(err) console.log(err);
                    else{
                        global.userSkills=data;
                        //console.log(global.userSkills)
                    }
            })
            fetched_data = await mongoose.connection.db.collection("sentrequests");
            fetched_data.find({}).toArray(async function(err, data) {
                    if(err) console.log(err);
                    else{
                        global.sentRequests=data;
                        //console.log(global.sentRequests)
                    }
            })
            fetched_data = await mongoose.connection.db.collection("recievedrequests");
            fetched_data.find({}).toArray(async function(err, data) {
                    if(err) console.log(err);
                    else{
                        global.recievedRequests=data;
                        //console.log(global.recievedRequests)
                    }
            })
        }
    });
}

module.exports = connectDB;



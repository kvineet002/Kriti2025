const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const websiteSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    websites:[
        {
            websiteName:{
                type: String,
                required: true
            },
            websiteCode:{
                type: String,
                required: true
            },
            websiteLink:{
                type: String,
                required: true
            },
            websiteImage:{
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
});
module.exports = mongoose.model('Deployed',websiteSchema);

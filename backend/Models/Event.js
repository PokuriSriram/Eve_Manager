const mongoose = require('mongoose');

const Eventdata = new mongoose.Schema(
    {
        Eventimage: {
            type: String,
            required: true
        },
        Title: {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true,
        }

    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Event",Eventdata);
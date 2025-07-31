//Note Schema 
const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    li : {
        type : String,
        required : true
    },
    title : String,
    content : String,
    createdAt : {
         type: Date, 
         default: Date.now 
    }
})
module.exports = mongoose.model('Note', noteSchema);
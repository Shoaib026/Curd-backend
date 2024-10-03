// install the mongoose package
const mongoose = require('mongoose')


const  FileSchema = mongoose.Schema({
    //_id: A unique identifier for each document,
    _id: mongoose.Schema.Types.ObjectId,
    //Going to make doucments
    title: { type: String, required: true },
    name : { type: String, required: true },
    path : { type: String, required: true },
    type : { type: String, required: true },
})


// make variable name it "categoryModel" `, the collection will be made of "Categories" & it follow the "FileSchema"
var categoryModel = mongoose.model('Categories',FileSchema )

module.exports = categoryModel
// "FileSchema" -> "categoryModel"
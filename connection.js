const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://shoaibahsan026:nabila0301@cluster0.99giz.mongodb.net/crudApp', {
            useNewUrlParser: true,   
            useUnifiedTopology: true 
        })
        console.log("Connection Done");
    } catch (err) {
        console.error("failed in connection", err);
    }
}

connect();

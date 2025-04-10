const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    group: String,
    name: String,
    phone: String,
    description: String,
    whatsapp: Boolean,
    edited: Boolean,
    deleted: Boolean,
})

module.exports = mongoose.model('Contact', contactSchema)

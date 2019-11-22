const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    desc: { type: String },
});

const Roles = mongoose.model('roles', roleSchema);


module.exports = Roles;
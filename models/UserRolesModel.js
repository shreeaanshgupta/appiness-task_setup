const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userroleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    uid: { type: Schema.Types.ObjectId, ref: 'users' },
    role_id: Schema.Types.ObjectId
});


const UserRoles = mongoose.model('user_roles', userroleSchema);

module.exports = UserRoles;
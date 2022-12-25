const { db } = require('../models/index.model');

class UserService {
    schema;
    constructor() {
        this.schema = db.user;
    }

    addUser(user) {
        return this.schema
        .create(user);
    }

    getUser() {
        return this.schema
        .find();
    }

    updateUser(filter, update) {
        return this.schema
        .findOneAndUpdate(filter, update, {returnOriginal : false});
    }

    deleteUser(user, toDelete) {
        if(toDelete) {
            return this.schema
            .deleteOne({user});
        }
    }
}

const userService = new UserService();

module.exports = { userService };
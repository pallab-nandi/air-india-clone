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

    getUser(filters) {

        if(Object.values(filters).length != 0) {
            return this.#filterFunc(filters);
        }

        return this.schema
        .find();
    }

    async updateUser(filter, update) {
        return await this.schema
        .findOneAndUpdate({username : { $regex : new RegExp(filter, "i") }}, update, {returnOriginal : false});
    }

    deleteUser(username, toDelete) {
        if(toDelete) {
            return this.schema
            .deleteOne({username : { $regex : new RegExp(username, "i") }});
        }
    }

    //Search and Filter function
    #filterFunc(filters) {
        if(filters.name && filters.sort && filters.sort == 'desc') {
            return this.schema.find({name : { $regex : new RegExp(filters.name, "i") }}).sort('-name');
        } else if(filters.name) {
            return this.schema.find({name : { $regex : new RegExp(filters.name, "i") }}).sort('name');
        }
    }
}

const userService = new UserService();

module.exports = { userService };
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

        let customs = [];

        if(filters.name) {
            customs.push({name : { $regex : new RegExp(filters.name, "i") }});
        }

        if(filters.email) {
            customs.push({email : { $regex : new RegExp(filters.email, "i") }});
        }

        if(filters.username) {
            customs.push({username : { $regex : new RegExp(filters.username, "i") }});
        }

        if((filters.sort || (filters.sort && filters.sortType)) && customs.length != 0) {
            if(filters.sortType == 'desc') {
                let sortObj = {};
                let sort = filters.sort;
                sortObj[sort] = -1;
                return this.schema.find({$and : customs}).sort(sortObj);
            }
            return this.schema.find({$and : customs}).sort(filters.sort);
        } else if(filters.sort || (filters.sort && filters.sortType)) {
            if(filters.sortType == 'desc') {
                let sortObj = {};
                let sort = filters.sort;
                sortObj[sort] = -1;
                return this.schema.find().sort(sortObj);
            }
            return this.schema.find().sort(filters.sort);
        } else return this.schema.find({$and : customs});
    }
}

const userService = new UserService();

module.exports = { userService };
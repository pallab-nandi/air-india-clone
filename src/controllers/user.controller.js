const colors = require('colors');
const { userService } = require('../services/user.service');

async function addUser(req, res) {

    const user = req.body;

    return await userService
    .addUser(user)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(201);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'User added successfully';
        returnValues.data = user;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while adding Users'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while adding User'
        }))
    })
}

async function getUsers(req, res) {
    return await userService
    .getUser()
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'All Users fetched successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Users'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Users'
        }))
    })
}

async function updateUser(req, res) {
    const userName = req.params.name;
    const update = req.body;

    return await userService
    .updateUser({userName}, update)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'User updated successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while updating Users'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while updating User'
        }))
    })
}

async function deleteUser(req, res) {
    let toDelete = req.query.delete;
    let userName = req.params.name;

    return await userService
    .deleteUser(userName, toDelete)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'User deleted successfully';
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while deleting Users'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while deleting User'
        }))
    })
}

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser
}
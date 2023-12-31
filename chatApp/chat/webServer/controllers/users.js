import usersService from '../services/users.js'

const createUser = async (req, res) => {
    res.json(await usersService.createUser(req.body.username, req.body.password, req.body.displayName, req.body.profilePic))
}

const getUser = async(req, res) => {
    
    res.json(await usersService.getUserByUsername(req.params.username))
}


export default {createUser, getUser}
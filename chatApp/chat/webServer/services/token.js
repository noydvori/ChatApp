import jwt from 'jsonwebtoken'
import usersService from '../services/users.js'

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

const createToken = async (username, password) => {
    if (await usersService.getUser(username, password) ){
        const data = { username: username }
        
        // Generate the token.
        const token = jwt.sign(data, key)
        // Return the token to the browser
        res.status(201).json({ token: token });
    } else {
        res.status(404).send('Invalid username and/or password')
    }   
}


export default {createToken}

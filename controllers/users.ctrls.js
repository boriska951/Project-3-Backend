const db = require('../models'); 
const bcrypt = require('bcrypt'); 

//sign up (post)

const signup = (req, res) => {

	req.body.password = bcrypt.hashSync(req.body.password, 
		bcrypt.genSaltSync(10))

	db.User.create(req.body, (error, createdUser) => {
		if(error) {
			res.state(400).json({error: error.message })
		} else {
			res.status(201).json(createdUser)
		}
	})

}

const login = (req, res) => {

    db.User.findOne({
        username: req.body.username }, (err, foundUser) => {
            if(err) {
                res.send(err)
            } else {
                if (foundUser) {
                    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
    
                        req.session.currentUser = foundUser
    
                        res.status(200).json(foundUser)

				} else {
					res.status(404).json({error: 'Incorrect password'})
				}
			} else {
				res. status(400).json({ error: err})
			}
		}
	})

}
const logout = (req, res) => {

	req.session.destroy(() => {
		res.session(200).json({ msg: 'users logged out'})
	})
}


module.exports = {

	signup, 
	login,
	logout

} 
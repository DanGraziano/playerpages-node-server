import * as usersDao from "./users-dao.js";

const UserController = (app) => {
   app.get('/api/users', findUsers)
   app.get('/api/users/:uid', findUserById);
   app.post('/api/users', createUser);
   app.delete('/api/users/:uid', deleteUser);
   app.put('/api/users/:uid', updateUser);
   app.get('/api/users/email/:email', findUserByEmail);
}

const createUser = async (req, res) => {
  try {
    const newUser = await usersDao.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findUserById = async (req, res) => {
  try {
    const id = req.params.uid;
    const user = await usersDao.findUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error("Error finding user by id:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const findUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersDao.findUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error("Error finding user by email:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const findUsers = async (req, res) => {
  try {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else if (username) {
      const user = await usersDao.findUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      const users = await usersDao.findAllUsers();
      res.json(users);
    }
  } catch (err) {
    console.error("Error finding users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.uid;
    const status = await usersDao.deleteUser(id);
    res.status(204).json(status);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.uid;
    const status = await usersDao.updateUser(id, req.body);
    const user = await usersDao.findUserById(id);
    req.session["currentUser"] = user;
    res.json(status);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

  

export default UserController
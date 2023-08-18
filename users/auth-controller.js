import bcrypt from 'bcrypt';
import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
  const register = async (req, res) => {
    const { email, password } = req.body;
      // Check if the username and password fields are populated
    if (!email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    // Check if the username already exists
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.status(409).json({ message: 'Username already exists. Please try again or login.' });
      return; 
    }

    // Check if the email already exists
    const userEmail = await usersDao.findUserByEmail(req.body.email);
    if (userEmail) {
      res.status(409).json({ message: 'Email already exists. Please try again or login.' });
      return; 
    }

    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      console.log('Generated salt:', salt);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('Hashed password:', hashedPassword);
    
      // Replace the plain text password with the hashed password
      req.body.password = hashedPassword;
    
      // Create the user in the database
      const newUser = await usersDao.createUser(req.body);
      req.session.userId = newUser._id;
      res.json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error. Please try again.' });
    }
  };


  const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      const user = await usersDao.findUserByEmail(email);
      if (user) {
        // compare the hashed password in the database with the hash of the password entered by the user
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          req.session.userId = user._id;
          res.json(user);
        } else {
          res.status(401).json({ message: 'Invalid password' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(400).json({ message: 'Missing username or password' });
    }
  };

  
  const logout = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Logged out successfully' });
      }
    });
  };

  const profile = async (req, res) => {
    const userId = req.session.userId; 
    if (!userId) {
      res.status(404).json({ message: 'User not logged in' });
      return;
    }
  
    try {
      const user = await usersDao.findUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  const update = async (req, res) => {
    try {
      const id = req.params.uid;
      const updatedUser = await usersDao.updateUser(id, req.body);
      if (updatedUser) {
        req.session.userId = updatedUser._id;
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.put ("/api/users/update/:uid", update);
  app.get("/api/users/profile", profile);

};

export default AuthController;




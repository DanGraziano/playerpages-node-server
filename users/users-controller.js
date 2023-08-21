import * as usersDao from "./users-dao.js";
import mongoose from "mongoose";
import usersModel from "./users-model.js";


const UserController = (app) => {
   app.get('/api/users', findUsers)
   app.get('/api/users/:uid', findUserById);
   app.post('/api/users', createUser);
   app.delete('/api/users/:uid', deleteUser);
   app.put("/api/users/:userId", updateUserProfile);
   app.get('/api/users/email/:email', findUserByEmail);
   app.get('/api/users/username/:username', findUserByUsername);
   app.post('/api/users/:id/follow',  followUser);
   app.delete('/api/users/:id/unfollow',  unFollowUser);
   app.get('/api/users/:id/followData', getFollowData);
   app.get('/api/badges/:userId/:gameId', getBadgeStates);
   app.post('/api/badges/:userId/:gameId', updateBadgeStates);
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
      // Check if the ID is undefined or not a valid ObjectId
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
      }
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

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;  // Convert the user ID to an ObjectId
    const updateData = req.body;
    console.log("UserId to update:", userId);
    console.log("Update data:", updateData);
    const user = await usersModel.findByIdAndUpdate(userId, updateData, { new: true });
    res.status(200).send({ user });
  } catch (err) {
      console.error("Error during user update:", err);

    console.error("Error during user update:", err);  // Log the error message
    res.status(500).send({ message: "Custom error message" });
  }
};

const findUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error("Error finding user by username:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const followUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const followerId = req.body.followerId;

    // Update the target user's followers
    await usersModel.findByIdAndUpdate(userId, { $push: { followers: followerId } });

    // Update the current user's following
    await usersModel.findByIdAndUpdate(followerId, { $push: { following: userId } });

    // Send a successful response
    res.status(200).send({ message: 'Successfully followed user' });
  } catch (error) {
    res.status(500).send({ message: 'Error following user' });
  }
};

const unFollowUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const followerId = req.body.followerId;

    // Update the target user's followers
    await usersModel.findByIdAndUpdate(userId, { $pull: { followers: followerId } });

    // Update the current user's following
    await usersModel.findByIdAndUpdate(followerId, { $pull: { following: userId } });

    // Send a successful response
    res.status(200).send({ message: 'Successfully unfollowed user' });
  } catch (error) {
    res.status(500).send({ message: 'Error unfollowing user' });
  }
};

const getFollowData = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await usersModel.findById(userId);

    if (user) {
      const followData = {
        followers: user.followers,
        following: user.following
      };
      res.status(200).send(followData);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching follow data' });
  }
};

const getBadgeStates = async (req, res) => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;
    const badges = await usersDao.getBadgeStates(userId, gameId);
    //res.json(badges);
    res.json({ success: true, badges });

  } catch (error) {
    console.error('Error getting badge states:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};

const updateBadgeStates = async (req, res) => {
  const { userId, gameId } = req.params;
  const badgeUpdates = req.body;

  try {
    await usersDao.updateBadgeStates(userId, gameId, badgeUpdates);
    res.status(200).send({success: true, message: 'Badge states updated successfully.' });
  } catch (error) {
    console.error('Error updating badge states:', error);
    res.status(500).send({ message: 'Failed to update badge states.' });
  }
};

export default UserController
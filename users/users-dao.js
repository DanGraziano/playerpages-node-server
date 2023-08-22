import usersModel from "./users-model.js";

export const findAllUsers = () =>
  usersModel.find();
  
export const findUserById = (id) =>
  usersModel.findById(id);

export const findUserByEmail = (email) =>
usersModel.findOne({ email });

export const findUserByUsername = (username) =>
  usersModel.findOne({ username });

export const findUserByCredentials = (username, password) =>
  usersModel.findOne({ username, password });

export const createUser = (user) =>
  usersModel.create(user);

export const deleteUser = (id) =>
  usersModel.deleteOne({ _id: id });

// Function to get badge states for a user and a game
export const getBadgeStates = async (userId, gameId) => {
  try {
    const user = await usersModel.findById(userId);
    const badgeState = user.userBadges.find(state => state.gameId === gameId);
    return badgeState ? badgeState.badges : [];
  } catch (error) {
    console.error('Error getting badge states:', error);
    throw error;
  }
};

// Function to update badge states for a user and a game
export const updateBadgeStates = async (userId, gameId, badgeUpdates) => {
  try {
    const user = await usersModel.findById(userId);

    // Iterate through the badgeUpdates and apply the updates to the userBadges array
    badgeUpdates.forEach((update) => {
      // Find the index of the badge that matches the gameId and badgeType
      const badgeIndex = user.userBadges.findIndex(
        (badge) => badge.gameId === gameId && badge.badgeType === update.badgeId
      );

      if (badgeIndex !== -1) {
        // If the badge is found, update its badgeState
        user.userBadges[badgeIndex].badgeState = update.isEarned;
      } else {
        // If the badge is not found, add a new badge with the specified badgeType and badgeState
        user.userBadges.push({
          gameId,
          badgeType: update.badgeId,
          badgeState: update.isEarned
        });
      }
    });

    // Save the user document with the updated badge states
    await user.save();
  } catch (error) {
    console.error('Error updating badge states:', error);
    throw error;
  }
};

export const followUser = async (userId, followerId) => {
  try {
    // Get the follower and user objects from the database.
    let user = await usersModel.findById(userId);
    let follower = await usersModel.findById(followerId);

    // Check if the follower and user objects are not null or undefined.
    if (!user || !follower) {
      throw new Error('User or follower not found.');
    }

    // Initialize the lists if they are not defined.
    user.lists.followersList = user.lists.followersList || [];
    follower.lists.followingList = follower.lists.followingList || [];

    // Check if the user is already being followed.
    if (user.lists.followersList.some(followerEntry => followerEntry.userId === followerId) ||
        follower.lists.followingList.some(userEntry => userEntry.userId === userId)) {
      throw new Error('Already following user.');
    }

    // Update the followersList of the user and the followingList of the follower.
    user.lists.followersList.push({ userId: followerId, username: follower.username });
    follower.lists.followingList.push({ userId: userId, username: user.username });

    // Save the changes.
    await user.save();
    await follower.save();
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};





export const unfollowUser = async (userId, followerId) => {
  try {
    const user = await usersModel.findById(userId);
    const follower = await usersModel.findById(followerId);

    if (!user || !follower) {
      console.error('Error unfollowing user: user or follower not found');
      return;
    }

    user.followersList = user.followersList.filter((id) => id !== followerId);
    if (user.numFollowers > 0) {
      user.numFollowers -= 1; // Decrement the numFollowers field
    }
    await user.save();

    follower.followingList = follower.followingList.filter((id) => id !== userId);
    if (follower.numFollowing > 0) {
      follower.numFollowing -= 1; // Decrement the numFollowing field
    }
    await follower.save();
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

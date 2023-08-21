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

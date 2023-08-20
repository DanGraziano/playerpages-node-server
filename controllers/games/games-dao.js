import usersModel from "../../users/users-model.js";

// Function to add a game to a user's currently playing list
export const addGameToCurrentlyPlaying = async (userId, gameId, gameName) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.currentlyPlaying.push({ gameId, gameName });
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error adding game to currently playing list:', error);
  }
};

// Function to add a game to a user's want to play list
export const addGameToWantToPlay = async (userId, gameId, gameName) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.wantToPlay.push({ gameId, gameName });
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error adding game to want to play list:', error);
  }
};

// Function to add a game to a user's played list
export const addGameToPlayed = async (userId, gameId, gameName) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.played.push({ gameId, gameName });
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error adding game to played list:', error);
  }
};

// Function to add a game to a user's like list
export const addGameToLikeList = async (userId, gameId, gameName) => {
  try {
    const user = await usersModel.findById(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
    user.lists.likeList.push({ gameId, gameName });
    user.numLikes += 1;
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error adding game to like list:', error);
    throw error;
  }
};

// Function to add a game to a user's dislike list
export const addGameToDislikeList = async (userId, gameId, gameName) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.dislikeList.push({ gameId, gameName });
    user.numDislikes += 1;
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error adding game to dislike list:', error);
  }
};

// Function to remove a game from a user's currently playing list
export const removeGameFromCurrentlyPlaying = async (userId, gameId) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.currentlyPlaying = user.lists.currentlyPlaying.filter(game => game.gameId !== gameId);
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error removing game from currently playing list:', error);
  }
};

// Function to remove a game from a user's want to play list
export const removeGameFromWantToPlay = async (userId, gameId) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.wantToPlay = user.lists.wantToPlay.filter(game => game.gameId !== gameId);
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error removing game from want to play list:', error);
  }
};

// Function to remove a game from a user's played list
export const removeGameFromPlayed = async (userId, gameId) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.played = user.lists.played.filter(game => game.gameId !== gameId);
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error removing game from played list:', error);
  }
};

// Function to remove a game from a user's like list
export const removeGameFromLikeList = async (userId, gameId) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.likeList = user.lists.likeList.filter(game => game.gameId !== gameId);
    user.numLikes -= 1;
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error removing game from like list:', error);
  }
};

// Function to remove a game from a user's dislike list
export const removeGameFromDislikeList = async (userId, gameId) => {
  try {
    const user = await usersModel.findById(userId);
    user.lists.dislikeList = user.lists.dislikeList.filter(game => game.gameId !== gameId);
    user.numDislikes -= 1;
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error removing game from dislike list:', error);
  }
};


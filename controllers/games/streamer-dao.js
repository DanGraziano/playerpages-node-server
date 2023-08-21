import streamerModel from './streamer-model.js';

export const addGameToTopPickList = async (userId, gameId, gameName, username) => {
  const streamerPick = new streamerModel({ userId, gameId, gameName, username });
  return await streamerPick.save();
};

export const removeGameFromTopPickList = async (userId, gameId) => {
  return await streamerModel.deleteOne({ userId, gameId });
};

export const getRecentTopPicks = async (limit) => {
    return await streamerModel.find().sort({ createdOn: -1 }).limit(limit).exec();
  };
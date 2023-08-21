import * as streamerPicksDao from './streamer-dao.js';
import usersModel from "../../users/users-model.js";


const StreamerController = (app) => {
    const addToTopPickList = async (req, res) => {
        try {
            const { userId, gameId, gameName, username } = req.body;
            const user = await usersModel.findById(userId); // Fetch the user to get their username
            const result = await streamerPicksDao.addGameToTopPickList(userId, gameId, gameName, user.username);
            res.json({ success: true, message: 'Game added to top pick list', result });
        } catch (error) {
          console.error('Error adding game to top pick list:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error', error });
        }
      };
      
      const removeFromTopPickList = async (req, res) => {
        try {
          const { userId, gameId } = req.body;
          const result = await streamerPicksDao.removeGameFromTopPickList(userId, gameId);
          res.json({ success: true, message: 'Game removed from top pick list', result });
        } catch (error) {
          console.error('Error removing game from top pick list:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error', error });
        }
      };  

      const getRecentTopPicks = async (req, res) => {
        try {
          const limit = parseInt(req.query.limit) || 5; // Limit the number of results, default to 5
          const latestTopPicks = await streamerPicksDao.getRecentTopPicks(limit);
          res.json({ success: true, data: latestTopPicks });
        } catch (error) {
          console.error('Error getting latest top picks:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error', error });
        }
      };
      


app.post("/api/games/addToTopPickList", addToTopPickList);
app.post("/api/games/removeFromTopPickList", removeFromTopPickList);
app.get("/api/games/latestTopPicks", getRecentTopPicks);
};

export default StreamerController;
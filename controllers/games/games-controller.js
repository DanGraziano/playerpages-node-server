import * as gamesDao from './games-dao.js';

const GamesController = (app) => {
  const likeGame = async (req, res) => {
    try {
      const { userId, gameId, gameName } = req.body;
      const result = await gamesDao.addGameToLikeList(userId, gameId, gameName);
      res.json({ success: true, message: 'Game added to like list', result });
    } catch (error) {
      console.error('Error liking the game:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  };

  const removeLikeGame = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        const result = await gamesDao.removeGameFromLikeList(userId, gameId);
        res.json({ success: true, message: 'Game removed from like list', result });
      } catch (error) {
        console.error('Error removing liked the game:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
      }
    };

  const dislikeGame = async (req, res) => {
    try {
      const { userId, gameId, gameName } = req.body;
      const result = await gamesDao.addGameToDislikeList(userId, gameId, gameName);
      res.json({ success: true, message: 'Game added to dislike list', result });
    } catch (error) {
      console.error('Error disliking the game:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  };

  const removeDislikeGame = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        const result = await gamesDao.removeGameFromDislikeList(userId, gameId);
        res.json({ success: true, message: 'Game removed from dislike list', result });
      } catch (error) {
        console.error('Error removing disliked the game:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
      }
    };

  const addToPlayedList = async (req, res) => {
    try {
      const { userId, gameId, gameName } = req.body;
      const result = await gamesDao.addGameToPlayed(userId, gameId, gameName);
      res.json({ success: true, message: 'Game added to played list', result });
    } catch (error) {
      console.error('Error adding game to played list:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  };

  const removeFromPlayedList = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        const result = await gamesDao.removeGameFromPlayed(userId, gameId);
        res.json({ success: true, message: 'Game removed from played list', result });
      } catch (error) {
        console.error('Error removing played game:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
      }
    };
  

  const addToWantList = async (req, res) => {
    try {
      const { userId, gameId, gameName } = req.body;
      const result = await gamesDao.addGameToWantToPlay(userId, gameId, gameName);
      res.json({ success: true, message: 'Game added to want list', result });
    } catch (error) {
      console.error('Error adding game to want list:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  };

  const removeFromWantList = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        const result = await gamesDao.removeGameFromWantToPlay(userId, gameId);
        res.json({ success: true, message: 'Game removed from want to play list', result });
      } catch (error) {
        console.error('Error removing want to play game:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
      }
    };
  

  const addToPlayingList = async (req, res) => {
    try {
      const { userId, gameId, gameName } = req.body;
      const result = await gamesDao.addGameToCurrentlyPlaying(userId, gameId, gameName);
      res.json({ success: true, message: 'Game added to currently playing list', result });
    } catch (error) {
      console.error('Error adding game to currently playing list:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  };

  const removeFromPlayingList = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        const result = await gamesDao.removeGameFromCurrentlyPlaying(userId, gameId);
        res.json({ success: true, message: 'Game removed from currently playing list', result });
      } catch (error) {
        console.error('Error removing currently playing game:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
      }
    };
  

  app.post("/api/games/like", likeGame);
  app.post("/api/games/removeLike", removeLikeGame);
  app.post("/api/games/dislike", dislikeGame);
  app.post("/api/games/removeDislike", removeDislikeGame);
  app.post("/api/games/addToPlayedList", addToPlayedList);
  app.post("/api/games/removeFromPlayedList", removeFromPlayedList);
  app.post("/api/games/addToWantList", addToWantList);
  app.post("/api/games/removeFromWantList", removeFromWantList);
  app.post("/api/games/addToPlayingList", addToPlayingList);
  app.post("/api/games/removeFromPlayingList", removeFromPlayingList);
};

export default GamesController;

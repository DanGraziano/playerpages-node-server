import reviewsModel from "./reviews-model.js";
import usersModel from "../../users/users-model.js";

export const addReview = async (userId, gameId, username, reviewText) => {
  try {
    const review = new reviewsModel({
      userId,
      gameId,
      username,
      content: reviewText,
      createdOn: new Date()
    });
    await review.save();

    // Increment the numReviews for the user
    const user = await usersModel.findById(userId);
    if (user) {
        user.numReviews += 1;
        await user.save();
    } else {
        console.error(`User with ID ${userId} not found`);
    }

    return review;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Function to remove a review from the database
export const removeReview = async (userId, gameId) => {
    try {
      const review = await reviewsModel.findOneAndDelete({
        userId: userId,
        gameId: gameId
      });

        // Increment the numReviews for the user
        const user = await usersModel.findById(userId);
        if (user) {
            user.numReviews -= 1;
            await user.save();
        } 
        else {
            console.error(`User with ID ${userId} not found`);
        }

        return review;

    } catch (error) {
      console.error('Error removing review:', error);
      throw error;
    }
  };


  export const findReviewsByUserId = async (userId) => {
    try {
      const reviews = await reviewsModel.find({ userId: userId });
      return reviews;
    } catch (error) {
      console.error('Error finding reviews by user ID:', error);
      throw error;
    }
  };

  export const findReviewsByGameId = async (gameId) => {
    try {
      const reviews = await reviewsModel.find({ gameId: gameId });
      return reviews;
    } catch (error) {
      console.error('Error finding reviews by game ID:', error);
      throw error;
    }
  };
 
  
  

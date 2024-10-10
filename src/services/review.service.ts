import { GameDTO } from "../dto/game.dto";
import { ReviewDTO } from "../dto/review.dto";
import { notFound } from "../error/NotFoundError";
import { Review } from "../models/review.model";

export class ReviewService {


    public async getAllReviews(): Promise<ReviewDTO[]> {
        return Review.findAll();
    }

    public async getReviewById(id: number): Promise<ReviewDTO | null> {
        const review = await Review.findByPk(id);
        if(!review){
            throw notFound(`Review with id ${id} not found`);
        }
        return review
    }

    public async createReview(
        review_text : string,
        rating : number,
        game ?: GameDTO ,
      
        
      ): Promise<Review> {
        
          return Review.create({review_text : review_text, rating : rating, game : game });
        
      }

}
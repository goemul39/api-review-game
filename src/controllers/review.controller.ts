import { Controller, Get, Post, Route, Tags } from "tsoa";
import { ReviewDTO } from "../dto/review.dto";
import { ReviewService } from "../services/review.service";
import { Review } from "../models/review.model";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {

    // Récupère tous les avis
    @Get("/")
    public async getAllReviews(): Promise<ReviewDTO[]> {
        return new ReviewService().getAllReviews();
    }


    // Récupère un avis par ID
    @Get("{id}")
    public async getReviewById(id: number): Promise<ReviewDTO | null> {
        return new ReviewService().getReviewById(id);
    }

    @Post("/")
    public async createReview(requestBody: ReviewDTO): Promise<ReviewDTO> {
        const { review_text, rating, game } = requestBody;
        return new ReviewService().createReview(review_text, rating, game);
    }

}

import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { CreateReviewDTO, ReviewDTO, UpdateReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {

    @Get("/")
    public async getAllReviews(): Promise<ReviewDTO[]> {
      return reviewService.getAllReviews();
    }
  
    @Get("{id}")
    public async getReviewById(@Path() id: number): Promise<ReviewDTO | null> {
      return reviewService.getReviewById(id);
    }
  
    @Post("/")
    public async createReview(
      @Body() requestBody: CreateReviewDTO
    ): Promise<ReviewDTO> {
      const { game_id, rating , review_text } = requestBody;
      return reviewService.createReview(game_id, rating, review_text);
    }
  
    @Delete("{id}")
    public async deleteReview(@Path() id: number): Promise<void> {
      await reviewService.deleteReview(id);
    }
  
    @Patch("{id}")
    public async updateReview(
      @Path() id: number,
      @Body() requestBody: UpdateReviewDTO
    ): Promise<ReviewDTO | null> {
      const { rating, review_text } = requestBody;
      return reviewService.updateReview(id, rating, review_text);
    }
}
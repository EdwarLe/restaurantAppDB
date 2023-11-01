import Reviews from "./reviews.model.js"


export class ReviewsService {
    async findOneReview(id) {
        return await Reviews.findOne({
            where: {
                id,
                status: 'active'
            }
        })
    }

    async createReview(data) {
        return await Reviews.create(data)
    }

    async updateReview(review, data) {
        return await review.update(data)
    }

    async deleteReview(review) {
        return await review.update({status: "deleted"})
    }
}
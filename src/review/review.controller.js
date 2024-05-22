import Review from "./review.model.js";

//role user
export const postReview = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;
        const review = new Review({
            ...resto
        });
        await review.save();
        res.status(200).json({
            msg: "Review added successfully",
            review
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error adding review",
            error: e.message
        });
    }
}

//role user
export const putReview = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { ...resto },
            { new: true }
        );
        if (!updatedReview) {
            return res.status(404).json({
                msg: "Review not found"
            });
        }
        res.status(200).json({
            msg: "Review updated successfully",
            updatedReview
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error updating Review",
            error: e.message
        });
    }
}

//role user

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({
                msg: "Review not found"
            });
        }
        res.status(200).json({
            msg: "Review successfully deleted",
            deletedReview
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error deleting Review",
            error: e.message
        });
    }
}

//role user
export const getReview = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({
            reviews
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error getting reviews",
            error: e.message
        });
    }
}
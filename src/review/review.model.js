import { Schema, model } from "mongoose";

const ReviewSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },

  dateReview: {
    type: Date,
    default: Date.now,
  },
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Hotel ID is required"],
  },
  userReview: {
    type: String,
    required: [true, "The review is required"],
  }
});



export default model("Review", ReviewSchema);
import mongoose from "mongoose";

const Schema = mongoose.Schema

const Comment = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    firmId: {
      type: Schema.Types.ObjectId,
      ref: 'Firm',
      required: true
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  export default mongoose.model('CommentModel', Comment, 'comments');
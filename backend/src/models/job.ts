import mongoose from "mongoose";

const Schema = mongoose.Schema

const Job = new Schema({
    gardenId: {
        type: Schema.Types.ObjectId,
        ref: 'GardenModel',
        required: true
      },
      firmId: {
        type: Schema.Types.ObjectId,
        ref: 'FirmModel',
        required: true
      },
      decoratorId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date
      },
      status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'inMaintenance'],
        default: 'Pending'
      },
      description: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      isMaintenance: {
        type: Boolean
      }
})

export default mongoose.model('JobModel', Job, 'jobs')
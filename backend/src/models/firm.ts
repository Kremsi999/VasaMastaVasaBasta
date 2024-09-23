import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Firm = new Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    services: {
        type: [String],
    },
    phoneNumber: {
        type: String,
    },
    location: {
        type: String,
    },
    contactPerson: { 
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true 
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    pricing: {
        type: Map,
        of: Number,
    },
    averageRating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    vacationPeriod: { 
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true }
    }
})

export default mongoose.model('FirmModel', Firm, 'firms')

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
    }
})

export default mongoose.model('FirmModel', Firm, 'firms')

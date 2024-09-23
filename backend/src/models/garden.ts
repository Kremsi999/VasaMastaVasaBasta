import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Garden = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
    },
    name: {
        type:String,
    },
    area: {
        total: Number,
        pool: Number,
        greenery: Number,
        tables: Number,
        chairs: Number,
        fountaion: Number,
    },
    layout: [
        {
            shapeType: {
                type: String,
                enum: ['square', 'rectangle', 'circle'],
            },
            color: {
                type: String,
            },
            dimension: {
                width: { type: Number },
                height: { type: Number },
                radius: { type: Number },
            },
            position: {
                x: { type: Number },
                y: { type: Number },
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['private', 'restaurant']
    },
    services: {
        type: [String],
    }
})

export default mongoose.model('GardenModel', Garden, 'gardens')

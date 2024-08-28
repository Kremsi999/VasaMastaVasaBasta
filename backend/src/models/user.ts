import mongoose from 'mongoose'

const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email adresa nije validna!',
        ],
    },
    profilePicture: {
        data: Buffer,
        contentType: String,
    },
    creditCardNumber: {
        type: String,
        validate: {
            validator: function (value: string) {
                const dinersRegex = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
                const masterCardRegex = /^(51|52|53|54|55)\d{14}$/
                const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
                return (
                    dinersRegex.test(value) ||
                    masterCardRegex.test(value) ||
                    visaRegex.test(value)
                )
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            message: (props: any) =>
                `${props.value} nije validan broj kreditne kartice!`,
        },
    },
    type: {
        type: String,
        enum: ['Vlasnik', 'Dekorater', 'Admin'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Denied', 'Blocked'],
    },
})

export default mongoose.model('UserModel', User, 'users')

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        pic:{
            type: String,
            required: true,
            default: 'user.png',
        },
        role: {
            type: String,
            enum: ['Manager', 'Employee'],
            default: 'Employee',
        }
    },
    { timestamps: true }
);

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    return userObject;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
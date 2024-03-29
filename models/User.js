const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {encryptData, decryptData} = require("../utils/aws");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Kullanıcı Adı Girilmesi Zorunlu"],
    },
    email: {
        type: String,
        required: [true, "Mail Adresi Gerekli"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email adresi geçersiz.",
        ],
    },
    password: {
        type: String,
        required: [true, "Şifre kullanılmalı."],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    );
};

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

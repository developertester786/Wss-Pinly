const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { generateOTP } = require("../utils/otp");
const { generateToken } = require("../utils/jwt");
const {
    HTTP_STATUS,
    MESSAGES,
    ROLES,
    STATUS,
} = require("../constants");

const crypto = require("crypto");
const sendMail = require("../utils/mail");

const sendOTP = async ({ mobile }) => {
    // Check if user already exists
    let user = await User.findOne({
        where: {
            mobile,
        },
    });

    const otp = generateOTP();

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (user) {
        await user.update({
            otp,
            otpExpiry,
        });
    } else {
        const customerRole = await Role.findOne({
            where: {
                name: ROLES.CUSTOMER,
            },
        });

        if (!customerRole) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                MESSAGES.ROLE_NOT_FOUND
            );
        }
        user = await User.create({
            roleId: customerRole.id,
            fullName: MESSAGES.DEFAULT_USER_NAME,
            mobile,
            otp,
            otpExpiry,
            isVerified: false,
            status: STATUS.ACTIVE,
        });
    }

    return {
        otp,
        expiry: otpExpiry,
    };
};

const verifyOTP = async ({ mobile, otp }) => {
    // Find user
    const user = await User.findOne({
        where: {
            mobile,
        },
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
            },
        ],
    });

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.USER_NOT_FOUND
        );
    }

    // Check OTP
    if (user.otp !== otp) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.INVALID_OTP
        );
    }

    // Check OTP Expiry
    if (new Date() > user.otpExpiry) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.OTP_EXPIRED
        );
    }

    // Mark verified
    await user.update({
        isVerified: true,
        otp: null,
        otpExpiry: null,
    });

    // Generate JWT
    const token = generateToken({
        id: user.id,
        roleId: user.roleId,
    });

    return {
        token,
        user: {
            id: user.id,
            roleId: user.roleId,
            fullName: user.fullName,
            mobile: user.mobile,
            email: user.email,
            profileImage: user.profileImage,
            status: user.status,
            isVerified: user.isVerified,
            role: user.role,
        },
    };
};


const login = async ({ email, password }) => {

    const user = await User.findOne({
        where: { email },
        include: [{
            model: Role,
            as: "role",
            attributes: ["id", "name"],
        }],
    });


    if (!user) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            MESSAGES.INVALID_CREDENTIALS
        );
    }


    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );


    if (!isPasswordValid) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            MESSAGES.INVALID_CREDENTIALS
        );
    }


    if (
        ![
            ROLES.ADMIN,
            ROLES.STAFF,
            ROLES.BUSINESS,
        ].includes(user.role.name)
    ) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            MESSAGES.UNAUTHORIZED
        );
    }

    const token = generateToken({
        id: user.id,
        roleId: user.roleId,
    });

    return {
        token,
        user,
    };
};

const getProfile = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: {
            exclude: ["password", "otp", "otpExpiry"],
        },
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
            },
        ],
    });

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.USER_NOT_FOUND
        );
    }

    return user;
};

const forgotPassword = async (email) => {

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "No account found with this email."
        );
    }
    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(
        Date.now() + 15 * 60 * 1000
    );

    await user.save();

    const resetLink =
        `${process.env.APP_URL}/reset-password/${resetToken}`;

    await sendMail({
        to: user.email,
        subject: "Reset Password",
        html: `
            <h2>Reset Your Password</h2>

            <p>Hello ${user.fullName},</p>

            <p>Click the button below to reset your password.</p>

            <a
                href="${resetLink}"
                style="
                    display:inline-block;
                    padding:12px 24px;
                    background:#6f42c1;
                    color:#fff;
                    text-decoration:none;
                    border-radius:5px;
                ">
                Reset Password
            </a>

            <p>This link expires in 15 minutes.</p>

            <p>If you didn't request this, ignore this email.</p>
        `,
    });

    return true;
};

const resetPassword = async (
    token,
    password,
    confirmPassword
) => {

    if (password !== confirmPassword) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Passwords do not match."
        );
    }

 const hashedToken = crypto
  .createHash("sha256")
  .update(token)
  .digest("hex");

const user = await User.findOne({
  where: {
    resetPasswordToken: hashedToken,
  },
});

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Invalid reset link."
        );
    }

   if (
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < new Date()
) {
    throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Reset link has expired."
    );
}

    // beforeUpdate hook will hash it automatically
    user.password = password;

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return true;
};

module.exports = {
    sendOTP,
    verifyOTP,
    login,
    forgotPassword,
    resetPassword,
    getProfile,

};
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//model for user registration
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    // profile
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxLength: 200,
      default: "",
    },
    role: {
      type: String,
      enum: ["mentor", "learner", "both", "admin"],
      default: "learner",
    },

    // gamification
    credits: {
      type: Number,
      default: 100,
    },
    badge: {
      type: String,
      default: "beginner",
    },
    rank: {
      type: Number,
      default: 0,
    },

    // rating and review
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        // reviewer: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String,
        stars: { type: Number, min: 1, max: 5 },
      },
    ],

    // sessions  
    totalSessions: { type: Number, default: 0 },
    completedSessions: { type: Number, default: 0 }, 
    cancelledSessions: { type: Number, default: 0 },

    // skills for matching
    skillsTeach: {
      type: [
        {
        name: String,
        description: String,
        pricing: Number,
        level: String,
        rating: Number,
      },
      ],
      default: [],
    },
    skillsLearn: {
      type: [
        {
        name: String,
        description: String,
        pricing: Number,
        level: String,
        rating: Number,
      },
      ],
      default: [],
    },
    availability: {
      type: String,
      default: "",
    },

    // wallet with escrow
    wallet: {
      available: {
        type: Number,
        default: 0,
      }, 
      escrow: {
        type: Number,
        default: 0,
      },
    },

    // transaction
    transactions: [
      {
        amount: Number,
        type: { type: String, enum: ["credit", "debit"] },
        description: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;

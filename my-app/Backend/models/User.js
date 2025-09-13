import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] },
        password: { type: String, required: true },
        boughtCreations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Creation' }],
        boughtCreationsCount: {
            type: Number,
            default: 0, // Keeps track of the number of creations bought
          },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Creation' }],
        wishlistCount: {
            type: Number,
            default: 0, // Keeps track of the number of creations added to the wishlist
          },
        like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Creation' }],
        likeCount:  {
            type: Number,
            default: 0, // Keeps track of the number of creations added to the likes
          },
          uploadCount:  {
            type: Number,
            default: 0, // Keeps track of the number of creations added to the likes
          },
        profilePicture: { type: String, default: 'https://i.pinimg.com/736x/dc/9c/61/dc9c614e3007080a5aff36aebb949474.jpg' }, // Default picture
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User; 
import { User } from "../models/userModel.js";
import cloudinary from "../cloudinary/cloudinary.js";
import { validateUserProfileInputData } from "../utils/validation.js";
import sharp from "sharp";
import fs from "fs";
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "paying-guest-online", // Cloudinary folder name
    });
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

// API for get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const { user } = req;
    const profileInfo = {
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      avatarUrl: user.avatarUrl,
    };
    res.status(200).json({ profileInfo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// API for Update User Profile
// export const updateUserProfile = async (req, res) => {
//   try {
//     const isEditAllowed = validateUserProfileInputData(req);
//     if (!isEditAllowed) {
//       throw new Error("Only name, avatarUrl and mobileNumber can be updated");
//     }

//     const loggedInUser = req.user;

//     // Upload new avatar to Cloudinary if image is sent
//     if (req.file) {
//       const imageUrl = await uploadToCloudinary(req.file.path);
//       if (!imageUrl) {
//         throw new Error("Image upload failed");
//       }
//       loggedInUser.avatarUrl = imageUrl;
//     }

//     // Update other fields (name, mobileNumber)
//     const allowedFields = ["name", "mobileNumber"];
//     allowedFields.forEach((field) => {
//       if (req.body[field]) {
//         loggedInUser[field] = req.body[field];
//       }
//     });

//     await loggedInUser.save();

//     res.status(200).json({
//       message: `${loggedInUser.name}, Your Profile has Updated Successfully`,
//       updatedProfile: {
//         name: loggedInUser.name,
//         avatarUrl: loggedInUser.avatarUrl,
//         mobileNumber: loggedInUser.mobileNumber,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

export const updateUserProfile = async (req, res) => {
  try {
    const isEditAllowed = validateUserProfileInputData(req);
    if (!isEditAllowed) {
      throw new Error("Only name, avatarUrl and mobileNumber can be updated");
    }

    const loggedInUser = req.user;

    // If file exists (i.e., image uploaded)
    if (req.file) {
      const compressedPath = `uploads/compressed-${req.file.filename}`;

      // Compress image using Sharp
      await sharp(req.file.path)
        .resize({ width: 400 }) // Resize to 400px width (adjust as needed)
        .jpeg({ quality: 70 }) // Compress to JPEG with 70% quality
        .toFile(compressedPath);

      // Upload compressed image to Cloudinary
      const avatarUrl = await uploadToCloudinary(compressedPath);

      // Update user's avatar
      loggedInUser.avatarUrl = avatarUrl;

      // Delete both original & compressed files from local server
      fs.unlinkSync(req.file.path);
      fs.unlinkSync(compressedPath);
    }

    // Handle other profile fields (name, mobileNumber, etc.)
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.status(200).json({
      message: `${loggedInUser.name}, your profile has been updated successfully!`,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// API for Delete User
export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req?.user;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "Account Deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

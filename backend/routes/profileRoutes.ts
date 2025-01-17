import { Router } from "express";
import { uploadProfilePicture } from "../controllers/profile_controller/uploadProfilePicture";
import { editProfile } from "../controllers/profile_controller/profileEdit";
import { ensureAuthenticated } from "../auth/userController";

const profileRoutes = Router();

profileRoutes.post("/user/:userId/upload-profile-picture", uploadProfilePicture);
profileRoutes.put("/user/:userId/edit-profile", ensureAuthenticated, editProfile);

export default profileRoutes;

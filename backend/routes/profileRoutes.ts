import { Router } from "express";
import { uploadProfilePicture } from "../controllers/profile_controller/uploadProfilePicture";

const profileRoutes = Router();

profileRoutes.post("/user/:userId/upload-profile-picture", uploadProfilePicture);

export default profileRoutes;

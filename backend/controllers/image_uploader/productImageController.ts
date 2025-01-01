import { Request, Response } from "express";
import prisma from "../../utils/database"; // Assuming you have Prisma client set up
import path from "path";

// Handler to process file uploads
export const productImage = async (req: Request, res: Response) => {
  try {
    // Extract productId from route params
    const { productId } = req.params;

    // Extract file from the request object (after multer middleware)
    const file = req.file;

    // Check if file is uploaded
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Extract file type (MIME type)
    const fileType = file.mimetype;

    // Get relative path of uploaded file (relative to project root)
    const relativePath = path.relative(process.cwd(), file.path);

    // Create a URL for the uploaded file
    const fileUrl = `${
      process.env.BASE_URL || "http://localhost:5000"
    }/${relativePath.replace(/\\/g, "/")}`;

    // Save the media record in the database
    const media = await prisma.media.create({
      data: {
        product_id: productId, // Ensure productId is an integer
        source: fileUrl, // Store the file URL for future access
        file_type: fileType, // Store the file type (MIME type)
      },
    });

    // Send a success response
    res.status(200).json({
      message: "Image uploaded successfully.",
      media, // Return media data, including the file URL
    });
  } catch (error: Error | any) {
    // Handle errors gracefully
    res.status(500).json({ message: error.message });
  }
};

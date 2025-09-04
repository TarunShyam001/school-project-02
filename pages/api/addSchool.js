import { formidable } from "formidable";
import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "public/schoolImages");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/schoolImages"),
      keepExtensions: true,
      multiples: false, // set true if you want multiple files
    });


    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Form parsing error" });
      }

      const { name, address, city, state, contact, email_id } = fields;
      const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!imageFile?.filepath) {
        return res.status(400).json({ error: "Image file missing or invalid" });
      }

      // if (!imageFile) {
      //   return res.status(400).json({ error: "No image uploaded"})
      // }
      const imagePath = "/schoolImages/" + path.basename(imageFile.filepath);

      try {
        const db = await connectDB();
        await db.query(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, imagePath, email_id]
        );
        res.status(200).json({ message: "School added successfully" });
      } catch (dbErr) {
        console.error(dbErr);
        res.status(500).json({ error: "Database error" });
      }
    });
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

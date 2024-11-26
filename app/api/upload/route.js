import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const user_id = formData.get("user_id");

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    if (!user_id)
      return NextResponse.json(
        { error: "User id is required" },
        { status: 400 },
      );

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            folder: "scheto-profile-picture",
            resource_type: "auto",
            public_id: `profile-picture-${user_id}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}

import multer from "multer";
import sharp from "sharp";
import { NextResponse } from "next/server";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, uniqueSuffix + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    const err = new Error("Only .png, .jpg, and .jpeg format allowed!");
    err.name = "ExtensionError";
    cb(err);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).multiple(
  "image"
);

export async function POST(request) {
  try {
    await new Promise((resolve, reject) => {
      upload(request, null, async function (err) {
        if (err) {
          return reject(err);
        }

        if (!request.file) {
          return reject(new Error("No image file provided"));
        }

        try {
          const resizedImageBuffer = await sharp(request.file.path)
            .resize(800, 800)
            .jpeg({ quality: 80 })
            .toBuffer();

          const filePath = "/uploads/" + request.file.filename;
          await sharp(resizedImageBuffer).toFile(
            "../../../../../public" + filePath
          );

          // Additional operations with the file path, such as storing it in a database
          // ...

          resolve({ imagePath: filePath });
        } catch (error) {
          reject(error);
        }
      });
    });

    return NextResponse.json({ imagePath: filePath }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process the image." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await new Promise((resolve, reject) => {
      upload(request, null, async function (err) {
        if (err) {
          return reject(err);
        }

        if (!request.file) {
          return reject(new Error("No image file provided"));
        }

        try {
          const resizedImageBuffer = await sharp(request.file.path)
            .resize(800, 800)
            .jpeg({ quality: 80 })
            .toBuffer();

          const filePath = "/uploads/" + request.file.filename;
          await sharp(resizedImageBuffer).toFile("./public" + filePath);

          // Additional operations with the file path, such as updating it in a database
          // ...

          resolve({ imagePath: filePath });
        } catch (error) {
          reject(error);
        }
      });
    });

    return NextResponse.json({ imagePath: filePath }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process the image." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { query } = request;
  if (!query.path) {
    return NextResponse.json(
      { error: "No file path provided" },
      { status: 400 }
    );
  }

  const filePath = "./public" + query.path;

  try {
    fs.unlinkSync(filePath);
    // Additional operations, such as removing the file path from a database
    // ...
    return NextResponse.json(
      { message: "File deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete the file." },
      { status: 500 }
    );
  }
}

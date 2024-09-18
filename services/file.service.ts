import path from "path";
import fs from "fs";
import BaseError from "../errors/base.error";

class FileService {
  saveFile(file: any) {
    try {
      const fileName = Date.now() + ".jpg";
      const staticDir = path.join(__dirname, "..", "static");
      const filePath = path.join(staticDir, fileName);
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }

      file.mv(filePath);
      return fileName;
    } catch (error) {
      throw BaseError.BadRequest(`${error}`);
    }
  }
}

export default new FileService();

const fs = require("fs").promises;
const path = require("path");

export default async function readFilesRecursively(
  dirPath: string,
  fileList: string[] = []
) {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await readFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
}

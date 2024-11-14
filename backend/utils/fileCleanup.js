const fs = require('fs').promises;

async function deleteFile(filePath) {
  if (!filePath) return;
  
  try {
    await fs.unlink(filePath);
    console.log(`Deleted file: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
  }
}

module.exports = { deleteFile };
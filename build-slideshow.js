const fs = require('fs');
const path = require('path');

// Function to get all image files in a folder and its subfolders
function getAllImageFiles(folderPath) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  let imageFiles = [];

  function traverseDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        traverseDirectory(fullPath);
      } else {
        const ext = path.extname(fullPath).toLowerCase();
        if (imageExtensions.includes(ext)) {
          imageFiles.push(fullPath);
        }
      }
    }
  }

  traverseDirectory(folderPath);
  return imageFiles;
}

// Function to write the image paths to a JSON file
function writeImagePathsToJSON(imageFiles, outputPath) {
  const jsonData = JSON.stringify(imageFiles, null, 2);
  fs.writeFileSync(outputPath, jsonData, 'utf8');
}

// Main function to run the script
function main() {

  const folderPath = '.';
  const outputPath = './image_paths.json'; // Output JSON file path (current directory)

  const imageFiles = getAllImageFiles(folderPath);
  writeImagePathsToJSON(imageFiles, outputPath);

  console.log(`JSON file containing image paths has been generated: ${outputPath}`);
}

// Call the main function
main();
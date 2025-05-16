const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'commits.txt');

// Ensure the file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'Initial content\n', 'utf8');
}

// Function to execute shell commands
const runCommand = (command) => {
  try {
    const output = execSync(command, { stdio: 'inherit' });
    return output?.toString();
  } catch (error) {
    console.error(`Error executing command: ${command}`, error.message);
    process.exit(1);
  }
};

// Number of commits to create
const commitCount = 2;

for (let i = 1; i <= commitCount; i++) {
  // Modify the file
  fs.appendFileSync(filePath, `Commit number ${i}\n`, 'utf8');

  // Stage the file
  runCommand(`git add ${filePath}`);

  // Create a commit
  runCommand(`git commit -m "Automated commit #${i}"`);
}

runCommand("git push");
console.log(`Successfully created ${commitCount} commits!`);

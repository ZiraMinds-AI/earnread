const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up Android platform...');

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  
  // Build the app
  console.log('Building the app...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Add Android platform
  console.log('Adding Android platform...');
  execSync('npx cap add android', { stdio: 'inherit' });
  
  console.log('Android platform setup completed successfully!');
  console.log('To open the project in Android Studio, run: npm run open:android');
  console.log('To build the Android app, run: npm run build:android');
  
} catch (error) {
  console.error('Error during Android setup:', error);
  process.exit(1);
}

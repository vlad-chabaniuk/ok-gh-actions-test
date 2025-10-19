  // plugins/withInhibitAllWarnings.js
const { withPodfile } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withInhibitAllWarnings = (config) => {
  return withPodfile(config, (podfileConfig) => {
      // Dynamically find the Xcode project name in the ios directory
    const iosDir = path.join(podfileConfig.modRequest.projectRoot, 'ios');
    const files = fs.readdirSync(iosDir);
    const xcodeprojFile = files.find(file => file.endsWith('.xcodeproj'));
    
    if (!xcodeprojFile) {
      throw new Error('Could not find .xcodeproj file in ios directory');
    }
    
    const targetName = path.basename(xcodeprojFile, '.xcodeproj');
    const targetLine = `target '${targetName}' do`;
    
      // Create the replacement content
    const newContent = `inhibit_all_warnings!\n\n${targetLine}`;
    
    if (podfileConfig.modResults.contents.includes(targetLine)) {
      podfileConfig.modResults.contents = podfileConfig.modResults.contents.replace(
                                                                                    targetLine,
                                                                                    newContent
                                                                                    );
    } else {
      console.warn(`Could not find "${targetLine}" in Podfile to add "inhibit_all_warnings!".`);
    }
    
    return podfileConfig;
  });
};

module.exports = withInhibitAllWarnings;

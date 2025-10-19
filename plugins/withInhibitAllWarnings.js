  // plugins/withInhibitAllWarnings.js
const { withPodfile } = require('@expo/config-plugins');

const withInhibitAllWarnings = (config) => {
  return withPodfile(config, (podfileConfig) => {
    const targetName = config.name;
    const targetLine = `target '${targetName}' do`;
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

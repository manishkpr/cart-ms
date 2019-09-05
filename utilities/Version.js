const git = require('git-rev-sync');

module.exports = {
  getVersion: async () => {
    const result = {
      version: git.tag(),
      commitHash: git.short(),
      env: process.env.NODE_ENV,
    };

    return result;
  },
};

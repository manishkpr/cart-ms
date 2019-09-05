module.exports = {
  initializeRoutes: (routeDefinitions, routeVersions, router) => {
    Object.keys(routeVersions).forEach((functionality) => {
      const versions = routeVersions[functionality];

      const functionalityData = routeDefinitions[functionality];

      versions.forEach((version) => {
        const url = `/${version}${functionalityData.url}`;

        const reqMethod = functionalityData.method;

        const AuthRequired = functionalityData.Auth;

        const latestMethod = functionalityData.versions[
          Object.keys(functionalityData.versions)[
            Object.keys(functionalityData.versions).length - 1
          ]
        ];

        // Add Pre-hooks before actual method call
        const methodWithHooks = (ctx) => {
          const method = functionalityData.versions[version] || latestMethod;

          // You can add Logs traces here

          return method(ctx);
        };

        if (reqMethod === 'get') {
          if (AuthRequired) {
            router.get(url, AuthRequired, methodWithHooks);
          } else {
            router.get(url, methodWithHooks);
          }
        }
        if (reqMethod === 'post' && AuthRequired) {
          router.post(url, AuthRequired, methodWithHooks);
        }
      });
    });
  },
};

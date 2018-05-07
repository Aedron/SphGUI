
const rewired = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');
const rewireEslint = require('react-app-rewire-eslint');

const { injectBabelPlugin } = rewired;


function overrideEslintOptions(options) {
  return options;
}

function rewireSass(config) {
  const cssLoader = rewired.getLoader(
    config.module.rules,
    rule => rule.test && String(rule.test) === String(/\.css$/)
  );

  const sassLoader = {
    test: /\.scss$/,
    use: [...(cssLoader.loader || cssLoader.use), 'sass-loader']
  };

  const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
  oneOf.unshift(sassLoader);

  return config;
}


module.exports = function override(config, env) {
  if (env === "production") {
    console.log("⚡ Production build with react");
  }

  [
    'transform-decorators-legacy',
    'transform-class-properties',
    'mobx-deep-action',
    'jsx-if-directive',
    'jsx-for-directive'
  ].forEach(name => {
    config = injectBabelPlugin(name, config);
  });
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = rewireSass(config, env);
  config = rewireMobX(config,env);
  config = rewireEslint(config, env, overrideEslintOptions);

  return config;
};

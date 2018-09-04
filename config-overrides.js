
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
	config = injectBabelPlugin(
		[
			'import',
			{
				libraryName: 'antd',
				style: 'css'
			}
		], config);
	config = rewireLess.withLoaderOptions({
		javascriptEnabled: true,
		modifyVars: { 
			
		},
	})(config, env);
	return config;
};
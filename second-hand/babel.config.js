module.exports = function (api)
{
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
					alias: {
						'@': './',
						'@interfaces': './interfaces',
						'@components': './components',
						'@screens': './app/screens',
						'@services': './services',
						'@constants': './constants',
						'@assets': './assets',
						'@images': './assets/images',
						'@fonts': './assets/fonts',
						'@css': './assets/css',
						'@utils': './utils'
					},
				},
			],
		],
	};
};

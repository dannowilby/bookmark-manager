const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [ 'style-loader', 
					{
						loader: 'css-loader',
						options: {
							modules: true,
						}
					}, 
					'sass-loader' 
				]
			},
			{
				test: /\.tsx?$/,
				use:  'ts-loader', 
				exclude: /node_modules/,
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
}

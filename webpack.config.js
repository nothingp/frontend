const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 引入页面配置文件
const pageConfig = require('./config/config.page.js');

// 引入接口代理配置文件
const proxyConfig = require('./config/config.proxy.js'); 

// 引入dev-server配置文件
const serverConfig = require('./config/config.server.js');

// 引入dev-env配置文件
const defineConfig = require('./config/config.env.js');

// ant  使用Icon需要
const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
    // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

const definePluginOptionKey = process.env.NODE_ENV ? process.env.NODE_ENV:'default';
let defineContent = defineConfig[definePluginOptionKey];
if (typeof defineContent === 'object') {
    for (var i in defineContent) {
        (typeof(defineContent[i]) === 'string' || typeof(defineContent[i] === 'object')) && (defineContent[i] = JSON.stringify(defineContent[i]));
    }
}
defineContent['process.env']= {NODE_ENV: JSON.stringify(process.env.NODE_ENV)};

const plugins = [
    // new ExtractTextPlugin('style.css'),     // 指定css文件名 打包成一个css
    // 分开打包多个css
    new ExtractTextPlugin({
        filename: '[name].[contenthash:8].bundle.css',
        allChunks: true,
    }),

    // js压缩
    new uglifyJsPlugin({
        compress: {
            warnings: false,
        }
    }),

    // css压缩
    new optimizeCssAssetsPlugin({}),
    new webpack.DefinePlugin(defineContent),
]


// entry配置
const entryConfig = {}
pageConfig.list.map(function(item, index) {
    // entryConfig[item.name] = item.entry
    let _obj = {
    	[item.name]: item.entry
    }
    Object.assign(entryConfig, _obj)
})

// 生成html配置
pageConfig.list.map(function(item, index) {
    plugins.push(
        new HtmlWebpackPlugin({
            template: item.template,
            title: item.title,
            filename: item.filename,
            chunks: [item.chunks]
        })
    )
})

module.exports = {
    context: path.resolve(__dirname, './src'),
    // 配置服务器s
    devServer: {
        contentBase: path.resolve(__dirname, './src'), // New
        port: serverConfig.port,
        host: serverConfig.host,
        proxy: proxyConfig,
        historyApiFallback: true,
        compress: true,
        inline: true,
        hot: false,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            }
        },
    },
    entry: entryConfig,
    output: {
        publicPath:'/',
        path: path.resolve(__dirname, './output'),
        filename: '[name].[chunkhash:8].bundle.js', // 推荐使用 ，但是--hot会报错，
        // filename: '[name].[hash:8].bundle.js',       // --hot时使用，不推荐
        chunkFilename: '[name]-[id].[chunkhash:8].bundle.js', // 代码分割
    },
    module: {
        rules: [{
            test: /\.less$/,
            // use: ['style-loader', 'css-loader', 'less-loader'],      // 将css打包到js里面
            // 将css单独打包，需要plugins
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before lesss-loader if necessary
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.js[x]?$/,
            enforce: 'pre',
            use: [{
                loader: 'eslint-loader', 
                options: { fix: true }
            }],
            include: path.resolve(__dirname, './src/**/*.js'),
            exclude: /node_modules/
        }, {
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader'
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
            use: ['url-loader']
        }, {
            test: /\.(svg)$/i,
            use: ['svg-sprite-loader'],
            include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
        }, {
            test: /\.(png|jpg)$/,
            use: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]']
        }],
    },
    // ant需要
    resolve: {
        modules: ['node_modules', path.join(__dirname, './node_modules')],
        extensions: ['.web.js', '.js', '.json'], // webpack2 不再需要一个空的字符串
    },
    // 不需要打包的模块
    externals: {
        "react": 'React',
        "react-dom": "ReactDOM",
        "zepto": "Zepto"
    },
    plugins: plugins
};
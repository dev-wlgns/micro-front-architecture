
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const deps = require('./package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
// const { FederatedTypesPlugin } = require('@module-federation/typescript')

const moduleFederationPluginOptions = {
    name: "remoteApp2",
    filename: "remoteAppEntry.js",
    exposes: {
        './App': './src/App.tsx'
    },
    shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
    },
}

module.exports = (mode) => {
    return {
        entry: {
            app: __dirname + "/src/index.tsx"
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            chunkFilename: "[name].[contenthash].js",
            path: path.resolve(__dirname, 'dist'),
            publicPath: 'auto', // 브라우저가 참고할 번들링 파일 URL 주소
            clean: true
        },
        devServer: {
            static: { directory: path.join(__dirname, 'dist') },
            port: 3002,
            compress: true,
            // liveReload: false,
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    use: ['esbuild-loader'],
                    exclude: /node_modules/,
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                "@pages": path.resolve(__dirname, "src/pages"),
                "@hooks": path.resolve(__dirname, "src/hooks"),
                "@layout": path.resolve(__dirname, "src/layout"),
                "@modals": path.resolve(__dirname, "src/modals"),
                "@components": path.resolve(__dirname, "src/components"),
                "@static": path.resolve(__dirname, "src/static"),
                "@": path.resolve(__dirname, "src"),
            },
        },

        plugins: [
            new HtmlWebpackPlugin({ template: './public/index.html', inject: true, chunks: ["app"] }),
            new ForkTsCheckerWebpackPlugin(),
            new ModuleFederationPlugin(moduleFederationPluginOptions),
            // new FederatedTypesPlugin({
            //     federationConfig: moduleFederationPluginOptions,
            // })
        ],
        devtool: mode.development ? "eval-cheap-module-source-map" : false,
        cache: false,
    };
}
const { defineConfig } = require('@vue/cli-service')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/chupiii/' : '/',
  pwa: {
    name: 'chupiii',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js',
      swDest: 'service-worker.js'
    },
    manifestOptions: {
      start_url: './index.html',
      display: 'standalone',
      background_color: '#ffffff',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  configureWebpack: {
    plugins: [
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: process.env.NODE_ENV === 'production' ? '/chupiii/' : '/',
        generate: (seed, files) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          return manifestFiles;
        }
      })
    ]
  }
})

export const path = require('path')
const resolve = (dir: string) => path.resolve(__dirname, dir)
const cracoSassResourcesLoader = require('craco-sass-resources-loader')

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@utils': resolve('src/utils'),
      '@styles': resolve('src/styles'),
      '@store': resolve('src/redux-store'),
    }
  },
  plugins: [
    {
      plugin: cracoSassResourcesLoader,
      options: {
        resources: path.resolve(__dirname, 'src/styles/globalVars.scss')
      }
    }
  ]
}

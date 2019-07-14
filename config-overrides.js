const { override, fixBabelImports, useBabelRc } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', { libraryName: 'antd', style: 'css' }),
  useBabelRc()
)
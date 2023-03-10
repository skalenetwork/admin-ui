
module.exports = {
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  bracketSpacing: true,
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('prettier-plugin-organize-imports')
  ]
}
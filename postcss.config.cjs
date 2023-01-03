module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(['production', 'staging'].includes(process.env.NODE_ENV) && { cssnano: {} })
  },
}

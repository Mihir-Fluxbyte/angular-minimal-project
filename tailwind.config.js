/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    function (params) {
      params.addVariant('active-link', ({ modifySelectors }) => {
        modifySelectors(() => {
          return `.active-link`;
        });
      });
    },
  ],
};

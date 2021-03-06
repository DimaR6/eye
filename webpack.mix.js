let mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');
let glob = require("glob-all");
let PurgecssPlugin = require("purgecss-webpack-plugin");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/eyewitness.js', 'resources/assets/compiled')
   .postCss('resources/assets/css/eyewitness.css', 'resources/assets/compiled', [
        tailwindcss('tailwind.js'),
   ]);

// Only run PurgeCSS during production builds for faster development builds
// and so you still have the full set of utilities available during
// development.
if (mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      new PurgecssPlugin({

        // Specify the locations of any files you want to scan for class names.
        paths: glob.sync([
          path.join(__dirname, "resources/views/**/*.blade.php"),
          path.join(__dirname, "app/Tools/BladeDirectives.php"),
          path.join(__dirname, "resources/assets/icons/**/*.svg"),
          path.join(__dirname, "resources/assets/js/**/*.vue")
        ]),
        whitelist: ['tooltip-show'],
        whitelistPatterns: [/^svgcolor-/, /^chartist/, /^ct/],
        extractors: [
          {
            extractor: TailwindExtractor,

            // Specify the file extensions to include when scanning for
            // class names.
            extensions: ["html", "js", "php", "vue", "svg"]
          }
        ]
      })
    ]
  });
}

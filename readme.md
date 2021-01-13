# SVG generator

`npm install svgsprite-file --save`

Very basic package to create an svg file from a folder of svgs. Intended to be used as part of an NPM scripts definition ie.

## Example

```
{
    "scripts": {
        "generate-sprite": "svgsprite-file --src src/svg-icons/**/*.svg --sprite dist/svg-icons/svg-sprite.svg"
    }
}
```

## Config

`--src` = Glob file path for svgs to include in sprite generation.
eg. `--src $npm_package_config_src/src/svg-icons/**/*.svg`

`--sprite` = File path and name SVGs/svg sprite file to be generated into.
eg. `$npm_package_config_src/dist/svg-icons/svg-sprite.svg`
eg. `$npm_package_config_theme/templates/partials/svg/symbol/svg-sprite.twig`

`--prepend-symbol-id` = Optional; default: `svg-`

`--css-class` = Optional; default: `svg-sprite`

`--hidden` = Optional; adds inline style to the sprite of `style="display:none"`

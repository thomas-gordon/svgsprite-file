#!/usr/bin/env node

const argv = require("minimist")(process.argv);
const colors = require("colors/safe");
const { minifyImages, generateSprite } = require("../lib/generators");

const SRC = argv.src || null;
const SPRITE = argv.sprite || null;
const PREPENDID = argv["prepend-symbol-id"] || "svg-";
const CSSCLASS = argv["css-class"] || "svg-sprite";

const generate = async () => {
    if (!SRC) {
        console.log(
            colors.red.underline(
                "Please specify a glob --src path for the folder of SVGs to create the sprite from eg. example/**/*.svg"
            )
        );
        process.exit(1);
    }
    if (!SPRITE) {
        console.log(
            colors.red.underline(
                "Please specify a --sprite svg path and file to generate to. eg. example/dist/svg-sprite.svg, it works with any extension: eg. $npm_package_config_theme/templates/partials/svg/symbol/svg-sprite.twig"
            )
        );
        process.exit(1);
    }
    try {
        const transformedFiles = await minifyImages(SRC, SPRITE);
        await generateSprite(transformedFiles, CSSCLASS, SPRITE, PREPENDID);
        console.log(colors.green(`SVGSprite svg file generated: ${SPRITE}`));
    } catch (e) {
        console.log(colors.red(`Something went wrong: ${e} `));
        process.exit(1);
    }
};

module.exports = generate();

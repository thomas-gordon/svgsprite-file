#!/usr/bin/env node

import minimist from 'minimist';
import colors from "colors/safe.js";
import { minifyImages, generateSprite } from "../lib/generators.js";

const generate = async () => {
  const argy = minimist(process.argv)
  const SRC = argy['src'] || null;
  const SPRITE = argy['sprite'] || null;
  const PREPENDID = argy["prepend-symbol-id"] || "svg-";
  const CSSCLASS = argy["css-class"] || "svg-sprite";
  const HIDDEN = argy["hidden"] ? true : false;
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
        await generateSprite(
            transformedFiles,
            CSSCLASS,
            SPRITE,
            PREPENDID,
            HIDDEN
        );
        console.log(colors.green(`SVGSprite svg file generated: ${SPRITE}`));
    } catch (e) {
        console.log(colors.red(`Something went wrong: ${e} `));
        process.exit(1);
    }
};

export default generate();

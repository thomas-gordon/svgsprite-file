import path from "path";
import fs from "fs";
import svgstore from "./svgstore.js";
import imagemin from "imagemin";
import imageminSvgo from "imagemin-svgo";
import svgo from 'svgo';
const { extendDefaultPlugins } = svgo;

export const minifyImages = async (src) => {
    try {
        const files = await imagemin([src], {
            plugins: [
                imageminSvgo({
                    plugins: extendDefaultPlugins([
                        { name: 'removeViewBox', active: false },
                        { name: 'removeStyleElement', active: true },
                        { name: 'removeTitle', active: true },
                        { name: 'cleanupIDs', params: { remove: false }} 
                    ]) 
                }),
            ]
        });
        return files;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const generateSprite = async (files, cssclass, sprite, prependid, hidden) => {
    try {
        const storedSprite = svgstore({
            svgAttrs: {
                width: 0,
                height: 0,
                class: cssclass,
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                style: hidden ? "display:none" : null,
            },
        });
        files.forEach((f) => {
            storedSprite.add(
                `${prependid}${path.basename(
                    f.sourcePath,
                    path.extname(f.sourcePath)
                )}`,
                f.data
            );
        });
        fs.mkdir(path.dirname(sprite), { recursive: true }, (err) => {
            if (err) throw err;
            fs.writeFileSync(
                `${sprite}`,
                storedSprite.toString({ inline: true })
            );
        });
    } catch (e) {
        console.log(e);
    }
};

export default {
    minifyImages,
    generateSprite
}

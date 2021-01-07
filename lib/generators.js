const svgstore = require("svgstore");
const imagemin = require("imagemin");
const imageminSvgo = require("imagemin-svgo");

exports.minifyImages = async (src) => {
    try {
        const files = await imagemin([src], {
            plugins: [
                imageminSvgo({
                    plugins: [
                        { removeViewBox: false },
                        { cleanupIDs: { remove: false } },
                        { removeStyleElement: true },
                        { removeTitle: true },
                    ],
                    multipass: true,
                }),
            ],
        });
        return files;
    } catch (e) {
        throw e;
    }
};

exports.generateSprite = async (files, cssclass, sprite, prependid) => {
    try {
        const storedSprite = svgstore({
            svgAttrs: {
                width: 0,
                height: 0,
                class: cssclass,
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
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


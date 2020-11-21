var mods = new Map();
var currMod = "v2.0.0";

function loadMod(mod) {
    console.log("loading mod "+mod);
    window.WLROOM.loadMod(mod);
}

function makeModZip(basemod, sprites) {
    console.log("building zip");
    var mdzip = new JSZip();
    mdzip.file('mod.json5',basemod);

    mdzip.file('sprites.wlsprt', sprites, {binary:true});
    return mdzip.generate({type:"arraybuffer"});
}

function stripLeds(modstring) {
    let mod = JSON5.parse(modstring);
    mod.colorAnim = [];
    return JSON.stringify(mod);
}

function addMod(version, json) {
    mods.set(version, {
            version: version,
            json: json,
    });

    mods.set(version+"-splash", {
        version: version+"-splash",
        json: stripLeds(json),
    })
}

function getCurrentMod(splash = false) {
    return mods.get(currMod+(splash?"-splash":""));
}
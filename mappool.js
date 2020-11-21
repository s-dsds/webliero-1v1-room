let mypool = new Map();
let mypoolnames = new Set();

let alreadychosen =  new Set();
/*
function addMap(name, data, palette = null) {
    if (!mypoolnames.has(name)) {
        mypoolnames.add(name);
    }
    mypool.set(name, {
        name: name,
        data:_base64ToArrayBuffer(data),
        palette: (palette != null && palette!='')?palette:'default'
    });
}

function addMapVariation(orig, name, data, palette = null) {
    if (!mypoolnames.has(orig)) {
        console.log("adding variation "+orig+" ignored, original map "+name+"does not exist");
    }
    let o = mypool.get(orig);
    if (typeof o.variations === 'undefined') {
        o.variations = new Map();
    }
    o.variations.set(name, {
        name: orig+"_("+name+")",
        data:_base64ToArrayBuffer(data),
        palette: (palette != null && palette!='')?palette:o.palette
    })
}

function newrandommapindex() {	
    var n;
	do {
		n = Math.floor(Math.random() * mypoolnames.size);
	} while (alreadychosen.has(n));	
    alreadychosen.add(n);
    if (alreadychosen.size>=(mypoolnames.size)) {
		alreadychosen.clear();
	}
	return n;
}

function getRandomMapName() {
   return mypoolnames.getByIdx(newrandommapindex());
}
*/

function loadRandomMap() {
    /* const name = getRandomMapName();
    console.log("undeftest",typeof mypool.get(name).variations !=='undefined');    
    loadMap(name, (typeof mypool.get(name).variations !=='undefined')?resolveRandomizedVariationName(mypool.get(name)):'');	 */
    if (isSplash()) {
        window.WLROOM.endGame()
        stopSplash();
        currState = GAME_RUNNING_STATE;
    }
    
}
/*
function resolveRandomizedVariationName(map) {
    if (typeof map.variations === 'undefined') {
        return '';
    }
    let keys = Array.from(map.variations.keys());
    keys.push("false"); //cheat to add original variation
    console.log(keys);
    const kkey = Math.floor(Math.random() * keys.length);
    let key= keys[kkey];
    if (key==="false") {
        return '';
    }
    return key;
}

function loadMap(name, variation = '') {
    stopSplash();
    console.log("name "+name, "var "+variation);
    if (mypool.has(name)
     && (variation=='' || (typeof mypool.get(name).variations != 'undefined' && mypool.get(name).variations.has(variation)))) {
        currState = GAME_RUNNING_STATE;
        const map = (variation!='' && typeof mypool.get(name).variations != 'undefined')?mypool.get(name).variations.get(variation):mypool.get(name);
        if (map.palette!= currPalette) {
            loadPalette(map.palette);
        }
        window.WLROOM.loadPNGLevel(map.name, map.data);
        return;
    }
    notifyAdmins("trying to load invalid map name "+name+((variation!='')?" with variation: "+variation:""));
    notifyAdmins("available maps: "+JSON.stringify(Array.from(mypoolnames)));

}
*/

var splashAnimId;

function loadSplash() {
    currState = SPLASH_STATE;
    var splidx = 0;
    const animorder = [0];
    const maxframe = animorder.length-1;
    var fpsInterval = 1;
    var then = Date.now();
    var startTime = then;
    var now, elapsed;
    var playedThru = false;
    
    console.log('splash animation starts'+startTime);


    function draw() {
        if (!isSplash()) {
            stopSplash();
            return;
        }
        splashAnimId = requestAnimationFrame(draw);  
        now = Date.now();
        elapsed = now - then;
    
        // if enough time has elapsed, draw the next frame
        
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            
            window.WLROOM.loadPNGLevel("splashframe"+splidx, splashAnim[animorder[splidx]]);
            if (splidx<maxframe) {
                splidx++;
                playedThru = false;
            } else {
                splidx = 0;
                playedThru = true;
            }
        }
        
    }

    //loadPalette('default');
    draw();
}

function stopSplash() {
    console.log('stp');
    cancelAnimationFrame(splashAnimId);
}

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

Set.prototype.getByIdx = function(idx){
    if(typeof idx !== 'number') throw new TypeError(`Argument idx must be a Number. Got [${idx}]`);
  
    let i = 0;
    for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ )
      if(idx === i) return curs.value;
  
    throw new RangeError(`Index [${idx}] is out of range [0-${i-1}]`);
  }
  
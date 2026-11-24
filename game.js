const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 480;
ctx.imageSmoothingEnabled = false;

function createPixelSprite(pixelMap, palette, scale = 2) {
  const offscreen = document.createElement("canvas");
  const rows = pixelMap.length;
  const cols = pixelMap[0].length;
  offscreen.width = cols * scale;
  offscreen.height = rows * scale;
  const oCtx = offscreen.getContext("2d");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const char = pixelMap[r][c];
      if (palette[char]) {
        oCtx.fillStyle = palette[char];
        oCtx.fillRect(c * scale, r * scale, scale, scale);
      }
    }
  }
  return offscreen;
}

// --- ANIMAL SKINS DEFINITIONS (17x12 grid -> 34x24px at scale 2) ---
const SKINS = {
  bird: {
    name: "YELLOW BIRD",
    palette: {
      K: "#222034",
      Y: "#f8d830", // Main yellow body
      O: "#e09010", // Body shadow
      W: "#ffffff", // Eye / wing highlight
      B: "#f05018", // Beak
      L: "#fbf236"  // Top highlight
    },
    frames: [
      [
        "......KKKKKK.....",
        "....KKLLLLYYKK...",
        "...KLLYYYYYYWWK..",
        "..KLYYYYYYYWWWWK.",
        ".KWWWWYYYYYWWKWK.",
        "KWWWWWWYYYYWWKWK.",
        "KWOOOOOWYYYYWWWK.",
        ".KKKKKKYYYYKKKKKK",
        "..KOOOOOOOKBBBBBK",
        "...KOOOOOKBBBBKK.",
        "....KKKKKKBBBBBK.",
        "..........KKKKK.."
      ],
      [
        "......KKKKKK.....",
        "....KKLLLLYYKK...",
        "...KLLYYYYYYWWK..",
        "..KLYYYYYYYWWWWK.",
        ".KLYYYYYYYYWWKWK.",
        "KLYYYYYYYYYWWKWK.",
        "KWWWWWWYYYYYWWWK.",
        "KWOOOOOWYYYKKKKKK",
        ".KKKKKKOOOKBBBBBK",
        "...KOOOOOKBBBBKK.",
        "....KKKKKKBBBBBK.",
        "..........KKKKK.."
      ],
      [
        "......KKKKKK.....",
        "....KKLLLLYYKK...",
        "...KLLYYYYYYWWK..",
        "..KLYYYYYYYWWWWK.",
        ".KLYYYYYYYYWWKWK.",
        "KLYYYYYYYYYWWKWK.",
        "KLYYYYYYYYYYWWWK.",
        "KWWWWWWYYYYKKKKKK",
        "KWOOOOOWOOKBBBBBK",
        ".KKKKKKOOKBBBBKK.",
        "....KKKKKKBBBBBK.",
        "..........KKKKK.."
      ]
    ]
  },

  duck: {
    name: "MALLARD DUCK",
    palette: {
      K: "#222034",
      G: "#1b8a44", // Emerald green head
      L: "#38b764", // Head highlight
      W: "#ffffff", // White neck ring & eye
      B: "#7a442a", // Brown chest/body
      D: "#522b18", // Dark wing shade
      O: "#f79617"  // Yellow-orange bill
    },
    frames: [
      [
        ".........KKKKK...",
        ".......KKLLLLGKK.",
        "......KLLGGGGWWK.",
        ".....KLGGGGWWKWK.",
        "..KKKKGGGGWWKWK..",
        ".KWWWWGGGGWWWWKKK",
        "KWDDDDDWBBBOOOOOK",
        ".KKKKKKBBBBOOOOK.",
        "..KBBBBBBBBOOOOOK",
        "...KBBBBBBKKKKKK.",
        "....KKKKKK.......",
        "................."
      ],
      [
        ".........KKKKK...",
        ".......KKLLLLGKK.",
        "......KLLGGGGWWK.",
        ".....KLGGGGWWKWK.",
        "..KKKKGGGGWWKWK..",
        ".KBBBBGGGGWWWWKKK",
        "KWWWWWWBBBOOOOOK.",
        "KWDDDDDWBBBOOOOK.",
        ".KKKKKKBBBBOOOOOK",
        "...KBBBBBBKKKKKK.",
        "....KKKKKK.......",
        "................."
      ],
      [
        ".........KKKKK...",
        ".......KKLLLLGKK.",
        "......KLLGGGGWWK.",
        ".....KLGGGGWWKWK.",
        "..KKKKGGGGWWKWK..",
        ".KBBBBGGGGWWWWKKK",
        "KBBBBBBBBBBOOOOOK",
        "KWWWWWWBBBBOOOOK.",
        "KWDDDDDWBBBOOOOOK",
        ".KKKKKKBBBKKKKKK.",
        "....KKKKKK.......",
        "................."
      ]
    ]
  },

  pig: {
    name: "FLYING PIG",
    palette: {
      K: "#222034",
      P: "#f49ac1", // Pink body
      L: "#fbc4dc", // Light pink highlight
      D: "#d46a96", // Darker pink shadow / ears
      S: "#ff7597", // Snout
      W: "#ffffff"  // Angel wing & eye
    },
    frames: [
      [
        ".....KK....KK....",
        "....KDDKKKKDDK...",
        "...KLLPPPPPPWWK..",
        "..KLPPPPPPPWWKWK.",
        ".KWWWWPPPPPWWKWK.",
        "KWWWWWWPPPPKKKKK.",
        "KWDDDDWPPPKSSSSSK",
        ".KKKKKKPPPKKSKSKK",
        "..KDDDDPPPKSSSSSK",
        "...KDDKKKKKKKKKK.",
        "....KK....KK.....",
        "................."
      ],
      [
        ".....KK....KK....",
        "....KDDKKKKDDK...",
        "...KLLPPPPPPWWK..",
        "..KLPPPPPPPWWKWK.",
        ".KLPPPPPPPPWWKWK.",
        "KLPPPPPPPPPKKKKK.",
        "KWWWWWWPPPKSSSSSK",
        "KWDDDDWPPPKKSKSKK",
        ".KKKKKKPPPKSSSSSK",
        "...KDDKKKKKKKKKK.",
        "....KK....KK.....",
        "................."
      ],
      [
        ".....KK....KK....",
        "....KDDKKKKDDK...",
        "...KLLPPPPPPWWK..",
        "..KLPPPPPPPWWKWK.",
        ".KLPPPPPPPPWWKWK.",
        "KLPPPPPPPPPKKKKK.",
        "KLPPPPPPPPKSSSSSK",
        "KWWWWWWPPPKKSKSKK",
        "KWDDDDWPPPKSSSSSK",
        ".KKKKKKKKKKKKKKK.",
        "....KK....KK.....",
        "................."
      ]
    ]
  },

  chicken: {
    name: "CHICKEN",
    palette: {
      K: "#222034",
      W: "#ffffff", // White feathers
      G: "#d7dedc", // Feather shadow
      R: "#e62e2e", // Red comb & wattle
      Y: "#f8b818", // Yellow beak
      E: "#f5f7f7"  // Eye white
    },
    frames: [
      [
        ".......KK.KK.....",
        "......KRRKRRK....",
        ".....KRRRRRRK....",
        "....KWWWWWWWEEK..",
        "...KWWWWWWWWEEKWK",
        ".KKGGGGWWWWWEEKWK",
        "KGGGGGGWWWWWKKKK.",
        "KWWWWWWWWWWKYYYYK",
        ".KKKKKKWWWWKYYYKK",
        "...KGGGGWWWKRRK..",
        "....KKKKKKK.KK...",
        "................."
      ],
      [
        ".......KK.KK.....",
        "......KRRKRRK....",
        ".....KRRRRRRK....",
        "....KWWWWWWWEEK..",
        "...KWWWWWWWWEEKWK",
        ".KKWWWWWWWWWEEKWK",
        "KGGGGGGWWWWWKKKK.",
        "KWWWWWWWWWWKYYYYK",
        ".KKKKKKWWWWKYYYKK",
        "...KGGGGWWWKRRK..",
        "....KKKKKKK.KK...",
        "................."
      ],
      [
        ".......KK.KK.....",
        "......KRRKRRK....",
        ".....KRRRRRRK....",
        "....KWWWWWWWEEK..",
        "...KWWWWWWWWEEKWK",
        ".KKWWWWWWWWWEEKWK",
        "KWWWWWWWWWWWKKKK.",
        "KGGGGGGWWWWKYYYYK",
        "KWWWWWWWWWWKYYYKK",
        ".KKKKKKGWWWKRRK..",
        "....KKKKKKK.KK...",
        "................."
      ]
    ]
  },

  owl: {
    name: "BARN OWL",
    palette: {
      K: "#222034",
      B: "#8c583a", // Warm brown feathers
      D: "#5c3621", // Dark brown wing/ears
      C: "#f3e5c8", // Cream facial disc
      Y: "#f8d830", // Golden eyes
      O: "#e07a16"  // Orange beak
    },
    frames: [
      [
        ".....KK....KK....",
        "....KDDKKKKDDK...",
        "...KBBBBBBBCCCK..",
        "..KBBBBBBBCCYYCK.",
        ".KDDDDDBBBCCYKCK.",
        "KDDDDDDDBBCCYYCK.",
        "KBBBBBBBBBCCKKKK.",
        ".KKKKKKBBBBKOOK..",
        "..KDDDDDBBBKKKK..",
        "...KDDDDKKKK.....",
        "....KKKK.........",
        "................."
      ],
      [
        ".....KK....KK....",
        "....KDDKKKKDDK...",
        "...KBBBBBBBCCCK..",
        "..KBBBBBBBCCYYCK.",
        ".KBBBBBBBBCCYKCK.",
        "KBBBBBBBBBBCCYYCK.",
        "KDDDDDDBBBCCKKKK.",
        "KBBBBBBBBBKOOK...",
        ".KKKKKKBBBBKKKK..",
        "...KDDDDKKKK.....",
        "....KKKK.........",
        "................."
      ],
      [
        ".....KK....KK....",
        "....KDDKKKKDDK...",
        "...KBBBBBBBCCCK..",
        "..KBBBBBBBCCYYCK.",
        ".KBBBBBBBBCCYKCK.",
        "KBBBBBBBBBBCCYYCK.",
        "KBBBBBBBBBBCCKKKK.",
        "KDDDDDDBBBKOOK...",
        "KBBBBBBBBBKKKK...",
        ".KKKKKKDKKKK.....",
        "....KKKK.........",
        "................."
      ]
    ]
  }
};

// Ten extra flying characters. They reuse the game's animated pixel silhouettes,
// with distinct palettes so every skin remains lightweight and animated.
const EXTRA_SKINS = [
  ["bluejay", "BLUE JAY", "bird", {Y:"#3976d2", O:"#214a91", W:"#f7fbff", B:"#f2a22b", L:"#8dd7ff"}],
  ["robin", "ROBIN", "bird", {Y:"#6b3f2a", O:"#3b241c", W:"#fff5df", B:"#e75c32", L:"#b97950"}],
  ["parrot", "TROPICAL PARROT", "bird", {Y:"#21b573", O:"#087c65", W:"#fffdf0", B:"#ff9e24", L:"#a8f05b"}],
  ["penguin", "LITTLE PENGUIN", "chicken", {W:"#26374f", G:"#172333", R:"#ff8aa0", Y:"#f4a629", E:"#fff7e8"}],
  ["golden", "GOLDEN CHICK", "chicken", {W:"#f8d642", G:"#d89c20", R:"#f05b4f", Y:"#ff922e", E:"#fff9df"}],
  ["flamingo", "FLAMINGO", "chicken", {W:"#ff8fb4", G:"#d65c8b", R:"#bf3c65", Y:"#292942", E:"#fff7f5"}],
  ["lavender-owl", "LAVENDER OWL", "owl", {B:"#9275c7", D:"#594477", C:"#f2e8ff", Y:"#ffe36e", O:"#ff9e56"}],
  ["snow-owl", "SNOWY OWL", "owl", {B:"#e8edf2", D:"#aab9ca", C:"#fff8e8", Y:"#f6c842", O:"#e98d3d"}],
  ["cloud-pig", "CLOUD PIG", "pig", {P:"#f5b6d7", L:"#fff0fa", D:"#c890d5", S:"#ec789e", W:"#ffffff"}],
  ["mint-pig", "MINT PIG", "pig", {P:"#83dfc2", L:"#d4fff0", D:"#4eae98", S:"#ff9aa2", W:"#fffefa"}]
];
EXTRA_SKINS.forEach(([key, name, base, palette]) => {
  SKINS[key] = { name, palette: { ...SKINS[base].palette, ...palette }, frames: SKINS[base].frames };
});

// Pre-compile sprites for all skins
const skinKeys = Object.keys(SKINS);
const compiledSkins = {};
skinKeys.forEach((key) => {
  compiledSkins[key] = {
    name: SKINS[key].name,
    sprites: SKINS[key].frames.map((map) =>
      createPixelSprite(map, SKINS[key].palette, 2)
    )
  };
});

// Load saved skin or default to 'bird'
let savedSkin = localStorage.getItem("flappySkin");
let currentSkinIndex = skinKeys.includes(savedSkin)
  ? skinKeys.indexOf(savedSkin)
  : 0;

function getCurrentSprites() {
  return compiledSkins[skinKeys[currentSkinIndex]].sprites;
}

function cycleSkin(dir) {
  currentSkinIndex =
    (currentSkinIndex + dir + skinKeys.length) % skinKeys.length;
  localStorage.setItem("flappySkin", skinKeys[currentSkinIndex]);
}

function drawPipeSegment(x, y, width, height, isCap) {
  if (height <= 0) return;

  const theme = BACKGROUNDS[backgroundIndex];
  const pipeStyles = {
    blossom:   { body: "#78ad55", light: "#d7f29a", mid: "#a8cf6b", shade: "#527843", trim: "#ffe3ef", mark: "#f6a8c6" },
    sunflower:{ body: "#55a84a", light: "#d5ed67", mid: "#95c957", shade: "#367044", trim: "#ffd23f", mark: "#8a5b2d" },
    leaves:    { body: "#9b5d39", light: "#f0b968", mid: "#c9824d", shade: "#663c35", trim: "#f4c66e", mark: "#dd7441" },
    snow:      { body: "#78a9c4", light: "#f4fdff", mid: "#b8dce8", shade: "#50758e", trim: "#ffffff", mark: "#d8f4ff" },
    pumpkin:   { body: "#714267", light: "#f28b36", mid: "#b75537", shade: "#402a4a", trim: "#ffb43f", mark: "#ffd36a" },
    hearts:    { body: "#c65d83", light: "#ffd9e6", mid: "#ed91ad", shade: "#873e70", trim: "#fff0f4", mark: "#f04e7d" },
    eggs:      { body: "#74ad83", light: "#fff4c9", mid: "#abd88e", shade: "#4a805f", trim: "#f5b7d4", mark: "#7ecde6" },
    fireworks: { body: "#465789", light: "#ffe16b", mid: "#7185bd", shade: "#293458", trim: "#ffd94f", mark: "#ff7fa4" },
    party:     { body: "#598faf", light: "#ffe16b", mid: "#82c3d0", shade: "#3c597e", trim: "#f479b5", mark: "#fff4f0" }
  };
  const style = pipeStyles[theme.decor] || {
    body: "#73bf2e", light: "#9ce659", mid: "#c8f78b", shade: "#558c22", trim: "#b8ed6a", mark: "#3b6614"
  };

  ctx.fillStyle = style.body;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = style.light;
  ctx.fillRect(x + 4, y, 4, height);
  ctx.fillStyle = style.mid;
  ctx.fillRect(x + 10, y, 2, height);
  ctx.fillStyle = style.shade;
  ctx.fillRect(x + width - 10, y, 6, height);
  ctx.fillStyle = "#222034";
  ctx.fillRect(x + width - 4, y, 4, height);

  // Scenery-specific pixel patterns, clipped to the pipe segment.
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, width, height); ctx.clip();
  if (theme.decor === "snow") {
    ctx.fillStyle = style.mark;
    for (let sy = y + 13; sy < y + height; sy += 27) {
      ctx.fillRect(x + width / 2 - 2, sy, 5, 2);
      ctx.fillRect(x + width / 2, sy - 2, 2, 6);
    }
  } else if (theme.decor === "leaves" || theme.decor === "pumpkin") {
    ctx.fillStyle = style.mark;
    for (let sy = y + 12; sy < y + height; sy += 30) {
      ctx.fillRect(x + 16, sy, 7, 4); ctx.fillRect(x + 19, sy - 3, 3, 3);
    }
  } else if (theme.decor === "hearts") {
    ctx.fillStyle = style.mark;
    for (let sy = y + 12; sy < y + height; sy += 32) {
      ctx.fillRect(x + 17, sy, 3, 3); ctx.fillRect(x + 23, sy, 3, 3);
      ctx.fillRect(x + 19, sy + 3, 5, 3); ctx.fillRect(x + 20, sy + 6, 3, 2);
    }
  } else if (theme.decor === "eggs" || theme.decor === "party" || theme.decor === "fireworks" || theme.decor === "blossom" || theme.decor === "sunflower") {
    ctx.fillStyle = style.mark;
    for (let sy = y + 14; sy < y + height; sy += 28) {
      ctx.fillRect(x + 17, sy, 8, 4); ctx.fillRect(x + 19, sy - 2, 4, 8);
    }
  }
  ctx.restore();

  // Bright themed cap rims make the top and bottom tunnel edges easy to read.
  if (isCap) {
    ctx.fillStyle = style.trim;
    ctx.fillRect(x + 2, y + 3, width - 4, 4);
    ctx.fillStyle = style.shade;
    ctx.fillRect(x + 2, y + height - 4, width - 4, 2);
  }
  ctx.strokeStyle = "#222034";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
}

let frames = 0;
let score = 0;
let bestScore = localStorage.getItem("flappyBest") || 0;
let gameState = "START"; // START, PLAYING, GAMEOVER
let groundOffset = 0;
const BACKGROUNDS = [
  { name: "DAY", sky: "#78d8ef", far: "#a8e39b", near: "#72c878", clouds: "#e8fbff", sun: "#fff1a1", ground: "#ded895", grass: "#73bf2e", grassLight: "#9ce659" },
  { name: "AFTERNOON", sky: "#ffad79", far: "#d8877c", near: "#9e657e", clouds: "#ffe0c2", sun: "#fff0b0", ground: "#c9a879", grass: "#668d55", grassLight: "#a6c878" },
  { name: "EVENING", sky: "#27345f", far: "#51528a", near: "#343b68", clouds: "#9294bd", sun: "#f8d590", ground: "#706b85", grass: "#4a795e", grassLight: "#8ab87a", night: true },
  { name: "SPRING", sky: "#a9e9f2", far: "#b6e6a0", near: "#76c987", clouds: "#fff8fa", sun: "#fff0a8", ground: "#d8cc8e", grass: "#65b84a", grassLight: "#d4f078", decor: "blossom" },
  { name: "SUMMER", sky: "#54c9ed", far: "#a3d977", near: "#55b96d", clouds: "#f3ffff", sun: "#fff06a", ground: "#d8c184", grass: "#59a83b", grassLight: "#b8e75e", decor: "sunflower" },
  { name: "AUTUMN", sky: "#e9a16f", far: "#c9825b", near: "#a75c50", clouds: "#ffe1bd", sun: "#ffd078", ground: "#a77b54", grass: "#735d3d", grassLight: "#c58b45", decor: "leaves" },
  { name: "WINTER", sky: "#b9d9ed", far: "#a4bfd3", near: "#789dbb", clouds: "#f7fcff", sun: "#fff8db", ground: "#dce8ed", grass: "#eaf7fb", grassLight: "#ffffff", decor: "snow" },
  { name: "HALLOWEEN", sky: "#30264f", far: "#68436f", near: "#402f55", clouds: "#746482", sun: "#ffbd59", ground: "#49384b", grass: "#3f6848", grassLight: "#8b9d53", decor: "pumpkin", night: true },
  { name: "WINTERFEST", sky: "#21405e", far: "#47768a", near: "#3d6e69", clouds: "#dbefff", sun: "#fff1c2", ground: "#dbeaf0", grass: "#f2fbff", grassLight: "#ffffff", decor: "snow", night: true },
  { name: "VALENTINE'S", sky: "#f6a6c1", far: "#e87f9e", near: "#b85e87", clouds: "#fff0f5", sun: "#ffe7a1", ground: "#dfb3a3", grass: "#bb627b", grassLight: "#f29ab0", decor: "hearts" },
  { name: "EASTER", sky: "#a9dff3", far: "#b6dfa0", near: "#7ac58b", clouds: "#fffdf5", sun: "#fff1a1", ground: "#d7c99a", grass: "#65b84a", grassLight: "#c8e879", decor: "eggs" },
  { name: "NEW YEAR", sky: "#20294e", far: "#474b79", near: "#34365d", clouds: "#777b9d", sun: "#f7d68a", ground: "#57536c", grass: "#4b755c", grassLight: "#88ad73", decor: "fireworks", night: true },
  { name: "BIRTHDAY", sky: "#77d6e8", far: "#a6dc9b", near: "#63b77a", clouds: "#fff9f1", sun: "#ffe877", ground: "#d8c68c", grass: "#61af4a", grassLight: "#b8e26b", decor: "party" }
];
let backgroundIndex = Number(localStorage.getItem("flappyBackground") || 0);
backgroundIndex = Math.max(0, Math.min(BACKGROUNDS.length - 1, backgroundIndex));
function cycleBackground(dir) {
  backgroundIndex = (backgroundIndex + dir + BACKGROUNDS.length) % BACKGROUNDS.length;
  localStorage.setItem("flappyBackground", backgroundIndex);
}

const bird = {
  x: 60,
  y: 180,
  width: 34,
  height: 24,
  gravity: 0.25,
  jump: 4.6,
  speed: 0,
  rotation: 0,
  frameIndex: 0,

  draw() {
    ctx.save();

    // Center the character on the start screen so it sits inside the skin selector
    const drawX = gameState === "START" ? canvas.width / 2 - this.width / 2 : this.x;
    ctx.translate(drawX + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);

    const sprites = getCurrentSprites();
    const currentSprite = sprites[this.frameIndex];
    ctx.drawImage(
      currentSprite,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  },

  update() {
    const sprites = getCurrentSprites();
    const flapInterval = gameState === "START" ? 8 : 5;
    if (gameState !== "GAMEOVER" && frames % flapInterval === 0) {
      this.frameIndex = (this.frameIndex + 1) % sprites.length;
    }

    if (gameState === "START") {
      this.y = 175 + Math.cos(frames / 10) * 4;
      this.rotation = 0;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if (this.speed < 0) {
        this.rotation = -25 * (Math.PI / 180);
      } else {
        this.rotation = Math.min(
          90 * (Math.PI / 180),
          this.rotation + 3.5 * (Math.PI / 180)
        );
      }

      if (this.y + this.height >= canvas.height - 48) {
        this.y = canvas.height - 48 - this.height;
        gameState = "GAMEOVER";
      }

      if (this.y < 0) {
        this.y = 0;
        this.speed = 0;
      }
    }
  },

  flap() {
    this.speed = -this.jump;
  },

  reset() {
    this.y = 175;
    this.speed = 0;
    this.rotation = 0;
  }
};

const pipes = {
  list: [],
  width: 52,
  capHeight: 24,
  capOverhang: 3,
  gap: 110,
  dx: 2,

  draw() {
    for (let p of this.list) {
      const topShaftHeight = Math.max(0, p.top - this.capHeight);
      drawPipeSegment(p.x, 0, this.width, topShaftHeight, false);
      drawPipeSegment(
        p.x - this.capOverhang,
        p.top - this.capHeight,
        this.width + this.capOverhang * 2,
        this.capHeight,
        true
      );

      const bottomY = p.top + this.gap;
      const bottomHeight = canvas.height - bottomY - 48;
      drawPipeSegment(
        p.x,
        bottomY + this.capHeight,
        this.width,
        Math.max(0, bottomHeight - this.capHeight),
        false
      );
      drawPipeSegment(
        p.x - this.capOverhang,
        bottomY,
        this.width + this.capOverhang * 2,
        this.capHeight,
        true
      );
    }
  },

  update() {
    if (gameState !== "PLAYING") return;

    if (frames % 100 === 0) {
      let minTop = 50;
      let maxTop = canvas.height - this.gap - 90;
      let topHeight = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
      this.list.push({ x: canvas.width + 10, top: topHeight, passed: false });
    }

    for (let i = 0; i < this.list.length; i++) {
      let p = this.list[i];
      p.x -= this.dx;

      const hitPadding = 3;
      const bLeft = bird.x + hitPadding;
      const bRight = bird.x + bird.width - hitPadding;
      const bTop = bird.y + hitPadding;
      const bBottom = bird.y + bird.height - hitPadding;

      const pipeLeft = p.x - this.capOverhang;
      const pipeRight = p.x + this.width + this.capOverhang;

      let hitTop = bRight > pipeLeft && bLeft < pipeRight && bTop < p.top;
      let hitBottom =
        bRight > pipeLeft && bLeft < pipeRight && bBottom > p.top + this.gap;

      if (hitTop || hitBottom) {
        gameState = "GAMEOVER";
      }

      if (p.x + this.width < bird.x && !p.passed) {
        score++;
        p.passed = true;
        if (score > bestScore) {
          bestScore = score;
          localStorage.setItem("flappyBest", bestScore);
        }
      }

      if (p.x + this.width + this.capOverhang < 0) {
        this.list.shift();
        i--;
      }
    }
  },

  reset() {
    this.list = [];
  }
};

function drawBackgroundDetails() {
  const theme = BACKGROUNDS[backgroundIndex];
  ctx.fillStyle = theme.sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Low pixel sun/moon and soft, blocky clouds give each time of day its mood.
  ctx.fillStyle = theme.sun;
  ctx.beginPath();
  ctx.arc(258, 86, theme.night ? 22 : 25, 0, Math.PI * 2);
  ctx.fill();
  if (theme.night) {
    ctx.fillStyle = theme.sky;
    ctx.beginPath(); ctx.arc(268, 77, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff7ca";
    [[45,75],[102,125],[225,158],[285,205],[62,225]].forEach(([x,y],i) => {
      ctx.fillRect(x, y, 2, 2); ctx.fillRect(x+5, y+3, 2, 2);
      if (i % 2 === 0) ctx.fillRect(x-4, y+6, 2, 2);
    });
  } else {
    ctx.fillStyle = theme.clouds;
    [[35,92],[146,62],[218,142]].forEach(([x,y]) => {
      ctx.fillRect(x, y, 48, 11); ctx.fillRect(x+9, y-8, 27, 9);
      ctx.fillRect(x+17, y-14, 15, 8);
    });
  }

  // Seasonal and celebration motifs in a crisp pixel-art style.
  const motif = theme.decor;
  const dots = [[22,138],[76,202],[128,112],[190,238],[278,175],[300,100]];
  if (motif === "snow") {
    ctx.fillStyle = "#ffffff";
    dots.forEach(([x,y],i) => { const yy=(y+frames*(i%2?0.16:0.1))%285; ctx.fillRect(x,yy,4,4); ctx.fillRect(x-3,yy+1,10,2); ctx.fillRect(x+1,yy-3,2,10); });
  } else if (["blossom","sunflower","leaves","hearts","eggs","pumpkin","party"].includes(motif)) {
    const colors = {blossom:["#ffb5cf","#fff1a6"],sunflower:["#ffd83d","#80552a"],leaves:["#e66b36","#f3bb45","#9b593b"],hearts:["#ee5282","#ffdae5"],eggs:["#f59fc4","#8bcde8","#f4d35e"],pumpkin:["#f47a24","#ffd05c"],party:["#f06ba9","#57c7e8","#ffd34d"]}[motif];
    dots.forEach(([x,y],i) => { ctx.fillStyle=colors[i%colors.length]; const yy=y+(motif==="leaves"?Math.sin(frames/24+i)*7:0); ctx.fillRect(x,yy,7,7); ctx.fillRect(x+2,yy-3,3,3); if(motif==="blossom"||motif==="sunflower") { ctx.fillRect(x-3,yy+2,3,3); ctx.fillRect(x+7,yy+2,3,3); } });
  } else if (motif === "fireworks") {
    [[62,104,"#ff7799"],[168,160,"#ffe36e"],[269,93,"#7be2ff"]].forEach(([x,y,c],i) => { ctx.fillStyle=c; const r=8+((frames/8+i*5)%9); for(let a=0;a<8;a++){const ang=a*Math.PI/4; ctx.fillRect(x+Math.round(Math.cos(ang)*r),y+Math.round(Math.sin(ang)*r),3,3);} ctx.fillRect(x,y,3,3); });
  }

  // Layered distant hills, shifting gently as the course scrolls.
  const shift = (frames * 0.25) % 80;
  ctx.fillStyle = theme.far;
  for (let x=-100; x<canvas.width+100; x+=80) {
    ctx.beginPath(); ctx.moveTo(x-shift, canvas.height-48);
    ctx.lineTo(x+38-shift, 278); ctx.lineTo(x+80-shift, canvas.height-48);
    ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = theme.near;
  for (let x=-120; x<canvas.width+120; x+=110) {
    ctx.beginPath(); ctx.moveTo(x+((shift*1.4)%110), canvas.height-48);
    ctx.lineTo(x+55+((shift*1.4)%110), 318); ctx.lineTo(x+110+((shift*1.4)%110), canvas.height-48);
    ctx.closePath(); ctx.fill();
  }
}

function drawGround() {
  const groundY = canvas.height - 48;
  const groundHeight = 48;

  if (gameState !== "GAMEOVER") {
    groundOffset = (groundOffset + pipes.dx) % 24;
  }

  const theme = BACKGROUNDS[backgroundIndex];
  ctx.fillStyle = theme.ground;
  ctx.fillRect(0, groundY, canvas.width, groundHeight);

  ctx.fillStyle = theme.grass;
  ctx.fillRect(0, groundY, canvas.width, 12);

  ctx.fillStyle = theme.grassLight;
  for (let x = -24; x < canvas.width + 24; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x - groundOffset, groundY + 12);
    ctx.lineTo(x + 12 - groundOffset, groundY + 12);
    ctx.lineTo(x + 18 - groundOffset, groundY);
    ctx.lineTo(x + 6 - groundOffset, groundY);
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = "#222034";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(canvas.width, groundY);
  ctx.moveTo(0, groundY + 12);
  ctx.lineTo(canvas.width, groundY + 12);
  ctx.stroke();
}

// Hitboxes for skin selector buttons on START screen
const selectorUI = {
  leftBtn: { x: 65, y: 168, w: 38, h: 38 },
  rightBtn: { x: 217, y: 168, w: 38, h: 38 },
  bgLeft: { x: 91, y: 247, w: 34, h: 30 },
  bgRight: { x: 195, y: 247, w: 34, h: 30 }
};

function drawSkinSelector() {
  const skinName = compiledSkins[skinKeys[currentSkinIndex]].name;

  // Selector backing box around character
  ctx.fillStyle = "rgba(34, 32, 52, 0.2)";
  ctx.strokeStyle = "#222034";
  ctx.lineWidth = 2;
  ctx.fillRect(115, 160, 90, 54);
  ctx.strokeRect(115, 160, 90, 54);

  // Left & Right Arrow Buttons
  [
    { btn: selectorUI.leftBtn, label: "<" },
    { btn: selectorUI.rightBtn, label: ">" }
  ].forEach(({ btn, label }) => {
    ctx.fillStyle = "#ded895";
    ctx.strokeStyle = "#222034";
    ctx.lineWidth = 2;
    ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
    ctx.strokeRect(btn.x, btn.y, btn.w, btn.h);

    ctx.fillStyle = "#222034";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, btn.x + btn.w / 2, btn.y + 26);
  });

  // Time-of-day selector
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#222034";
  ctx.lineWidth = 2;
  ctx.font = "bold 11px sans-serif";
  ctx.fillText("SCENERY", canvas.width / 2, 249);
  [
    { btn: selectorUI.bgLeft, label: "<" },
    { btn: selectorUI.bgRight, label: ">" }
  ].forEach(({btn,label}) => {
    ctx.fillStyle = "#ded895"; ctx.fillRect(btn.x,btn.y,btn.w,btn.h);
    ctx.strokeRect(btn.x,btn.y,btn.w,btn.h);
    ctx.fillStyle = "#222034"; ctx.font = "bold 17px sans-serif";
    ctx.fillText(label, btn.x+btn.w/2, btn.y+21);
  });
  ctx.fillStyle = "#fff"; ctx.font = "bold 12px sans-serif";
  ctx.strokeText(BACKGROUNDS[backgroundIndex].name, canvas.width/2, 270);
  ctx.fillText(BACKGROUNDS[backgroundIndex].name, canvas.width/2, 270);

  // Active Animal Label
  ctx.fillStyle = "#f8d830";
  ctx.strokeStyle = "#222034";
  ctx.lineWidth = 3;
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "center";
  ctx.strokeText(skinName, canvas.width / 2, 230);
  ctx.fillText(skinName, canvas.width / 2, 230);
}

function drawUI() {
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#222034";
  ctx.lineWidth = 3;
  ctx.textAlign = "center";

  if (gameState === "PLAYING") {
    ctx.font = "bold 36px sans-serif";
    ctx.strokeText(score, canvas.width / 2, 60);
    ctx.fillText(score, canvas.width / 2, 60);
  } else if (gameState === "START") {
    drawSkinSelector();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 22px sans-serif";
    ctx.strokeText("TAP TO START", canvas.width / 2, 310);
    ctx.fillText("TAP TO START", canvas.width / 2, 310);

    ctx.font = "bold 12px sans-serif";
    ctx.lineWidth = 2;
    ctx.strokeText("ARROWS: SKIN  |  A/D: SCENERY", canvas.width / 2, 333);
    ctx.fillText("ARROWS: SKIN  |  A/D: SCENERY", canvas.width / 2, 333);
  } else if (gameState === "GAMEOVER") {
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ded895";
    ctx.strokeStyle = "#222034";
    ctx.lineWidth = 3;
    ctx.fillRect(60, 140, 200, 140);
    ctx.strokeRect(60, 140, 200, 140);

    ctx.fillStyle = "#f05018";
    ctx.font = "bold 28px sans-serif";
    ctx.strokeText("GAME OVER", canvas.width / 2, 120);
    ctx.fillText("GAME OVER", canvas.width / 2, 120);

    ctx.fillStyle = "#222034";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(`SCORE: ${score}`, canvas.width / 2, 185);
    ctx.fillText(`BEST: ${bestScore}`, canvas.width / 2, 220);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px sans-serif";
    ctx.strokeText("TAP TO RESTART", canvas.width / 2, 320);
    ctx.fillText("TAP TO RESTART", canvas.width / 2, 320);
  }
}

// Convert screen touch/mouse coordinates to 320x480 canvas coordinates
function getCanvasCoords(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: ((clientX - rect.left) / rect.width) * canvas.width,
    y: ((clientY - rect.top) / rect.height) * canvas.height
  };
}

function isInside(pos, box) {
  return (
    pos.x >= box.x &&
    pos.x <= box.x + box.w &&
    pos.y >= box.y &&
    pos.y <= box.y + box.h
  );
}

function handleInput(e) {
  if (e.type === "keydown") {
    if (gameState === "START" && (e.code === "ArrowLeft" || e.code === "ArrowRight")) {
      cycleSkin(e.code === "ArrowRight" ? 1 : -1);
      return;
    }
    if (gameState === "START" && (e.code === "KeyA" || e.code === "KeyD")) {
      cycleBackground(e.code === "KeyD" ? 1 : -1);
      return;
    }
    if (e.code !== "Space" && e.code !== "ArrowUp") return;
  }

  if (e.type === "touchstart") e.preventDefault();

  if (gameState === "START") {
    // Check if player tapped the < or > skin buttons
    if (e.type === "mousedown" || e.type === "touchstart") {
      const pos = getCanvasCoords(e);
      if (isInside(pos, selectorUI.leftBtn)) {
        cycleSkin(-1);
        return;
      }
      if (isInside(pos, selectorUI.rightBtn)) {
        cycleSkin(1);
        return;
      }
      if (isInside(pos, selectorUI.bgLeft)) {
        cycleBackground(-1);
        return;
      }
      if (isInside(pos, selectorUI.bgRight)) {
        cycleBackground(1);
        return;
      }
    }

    gameState = "PLAYING";
    bird.flap();
  } else if (gameState === "PLAYING") {
    bird.flap();
  } else if (gameState === "GAMEOVER") {
    bird.reset();
    pipes.reset();
    score = 0;
    gameState = "START";
  }
}

window.addEventListener("touchstart", handleInput, { passive: false });
window.addEventListener("mousedown", handleInput);
window.addEventListener("keydown", handleInput);

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackgroundDetails();

  pipes.update();
  pipes.draw();

  drawGround();

  if (gameState === "START") {
    drawUI();
    bird.update();
    bird.draw();
  } else {
    bird.update();
    bird.draw();
    drawUI();
  }

  frames++;
  requestAnimationFrame(loop);
}

loop();
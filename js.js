// ===========================
// ՀԱՅBLOX — Armenian Roblox-like Platform
// Main Game Script
// ===========================

// ===== GLOBALS =====
let username = '';
let playerAvatar = '🧑';
let playerColor = '#D90012';
let coins = 0;
let currentGame = null;
let gameRunning = false;
let gameTimer = 0;
let gameCoinsCollected = 0;

// ===== GAME DATA =====
const GAMES = [
  {
    id: 'ararat',
    name: 'Mount Ararat Adventure',
    nameHy: 'Արarat Արdelays',
    desc: 'Climb the legendary mountain!',
    emoji: '🏔️',
    color1: '#1a5276',
    color2: '#2ecc71',
    players: Math.floor(Math.random() * 2000) + 500,
    genre: 'Adventure',
    world: 'mountain'
  },
  {
    id: 'yerevan',
    name: 'Yerevan City Obby',
    nameHy: 'Երdelays Obby',
    desc: 'Parkour through the pink city!',
    emoji: '🏛️',
    color1: '#e74c3c',
    color2: '#f39c12',
    players: Math.floor(Math.random() * 3000) + 800,
    genre: 'Obby',
    world: 'city'
  },
  {
    id: 'lavash',
    name: 'Lavash Tycoon',
    nameHy: 'Լdelays Tycoon',
    desc: 'Build your lavash empire!',
    emoji: '🫓',
    color1: '#d4a017',
    color2: '#c0392b',
    players: Math.floor(Math.random() * 1500) + 300,
    genre: 'Tycoon',
    world: 'tycoon'
  },
  {
    id: 'duduk',
    name: 'Duduk Music World',
    nameHy: 'Դdelays Երdelays',
    desc: 'Create music in a magical realm!',
    emoji: '🎵',
    color1: '#8e44ad',
    color2: '#3498db',
    players: Math.floor(Math.random() * 800) + 200,
    genre: 'Social',
    world: 'music'
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate Battlegrounds',
    nameHy: 'Նdelays Մdelays',
    desc: 'Epic pomegranate battles!',
    emoji: '🔴',
    color1: '#c0392b',
    color2: '#2c3e50',
    players: Math.floor(Math.random() * 4000) + 1200,
    genre: 'Battle',
    world: 'battle'
  },
  {
    id: 'chess',
    name: 'Armenian Chess Masters',
    nameHy: 'Շdelays Վdelays',
    desc: 'Strategic chess RPG adventure!',
    emoji: '♟️',
    color1: '#2c3e50',
    color2: '#f1c40f',
    players: Math.floor(Math.random() * 1000) + 400,
    genre: 'Strategy',
    world: 'chess'
  },
  {
    id: 'noahs',
    name: "Noah's Ark Survival",
    nameHy: 'Delays Տdelays',
    desc: 'Survive and build on the ark!',
    emoji: '🚢',
    color1: '#1abc9c',
    color2: '#2980b9',
    players: Math.floor(Math.random() * 2500) + 600,
    genre: 'Survival',
    world: 'ark'
  },
  {
    id: 'dance',
    name: 'Armenian Dance Party',
    nameHy: 'Պdelays Երdelays',
    desc: 'Dance with friends!',
    emoji: '💃',
    color1: '#e91e63',
    color2: '#ff9800',
    players: Math.floor(Math.random() * 1800) + 500,
    genre: 'Social',
    world: 'dance'
  }
];

const AVATARS = [
  '🧑', '👦', '👧', '🧔', '👨‍🦱', '👩‍🦰', '🧑‍🦳', '👲',
  '🤴', '👸', '🦸', '🦹', '🧙', '🧝', '🤖', '👽'
];

const COLORS = [
  '#D90012', '#0033A0', '#F2A800', '#2ecc71', '#9b59b6',
  '#e74c3c', '#3498db', '#1abc9c', '#e67e22', '#ecf0f1'
];

const BOT_NAMES = [
  'Aram_2007', 'Ani_Gamer', 'Tigran_Pro', 'Lusine_YT', 'Armen_King',
  'Nare_Star', 'Hayk_404', 'Anahit_99', 'Gevorg_GG', 'Mariam_TV',
  'Davit_Plays', 'Sona_Art', 'Ruben_Dev', 'Lilit_XO', 'Narek_Boss',
  'Gayane_Hi', 'Artur_Win', 'Tatevik_Go', 'Hovhannes', 'Satenik_UwU'
];

const CHAT_MESSAGES = [
  'Ողdelays! (Hello!)',
  'This game is awesome!',
  'Արdelays Ararat! 🏔️',
  'Who wants to play?',
  'Lol 😂',
  'GG everyone!',
  'I love HayBlox!',
  'Հdelays!! (Cool!!)',
  'Where is the secret area?',
  'Follow me!',
  'Nice jump!',
  'Wow so pretty here',
  'Armenia #1 🇦🇲',
  'Anyone from Yerevan?',
  'Brb getting lavash 🫓',
  'How do I get coins?',
  'This is better than Roblox fr'
];

// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ===== NOTIFICATION =====
function showNotif(msg) {
  var n = document.createElement('div');
  n.className = 'notif';
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(function () {
    n.remove();
  }, 3000);
}

// ===== LOGIN =====
function doLogin() {
  var input = document.getElementById('usernameInput');
  username = input.value.trim() || 'Player' + Math.floor(Math.random() * 9999);
  showScreen('lobbyScreen');
  document.getElementById('displayName').textContent = username;
  document.getElementById('userAvatarSmall').textContent = username[0].toUpperCase();
  buildGames();
  showNotif('Բdelays, ' + username + '! 🇦🇲 Welcome!');
}

document.getElementById('usernameInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') doLogin();
});

// ===== BUILD GAMES GRID =====
function buildGames() {
  var grid = document.getElementById('gamesGrid');
  grid.innerHTML = '';

  GAMES.forEach(function (g) {
    var card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = function () {
      launchGame(g);
    };
    card.innerHTML =
      '<div class="game-thumb">' +
        '<div class="game-thumb-inner" style="background:linear-gradient(135deg,' + g.color1 + ',' + g.color2 + ')">' + g.emoji + '</div>' +
        '<div class="game-players"><span class="dot"></span>' + g.players.toLocaleString() + ' playing</div>' +
      '</div>' +
      '<div class="game-info">' +
        '<h3>' + g.name + '</h3>' +
        '<p>' + g.desc + '</p>' +
        '<span class="game-genre">' + g.genre + '</span>' +
      '</div>';
    grid.appendChild(card);
  });
}

// ===== SIDEBAR =====
function showSection(section, el) {
  document.querySelectorAll('.sidebar-item').forEach(function (i) {
    i.classList.remove('active');
  });
  if (el) el.classList.add('active');
}

// ===== AVATAR MODAL =====
function showAvatar() {
  var modal = document.getElementById('avatarModal');
  modal.classList.add('active');

  // Build avatar picker
  var picker = document.getElementById('avatarPicker');
  picker.innerHTML = '';
  AVATARS.forEach(function (a) {
    var div = document.createElement('div');
    div.className = 'avatar-option' + (a === playerAvatar ? ' selected' : '');
    div.textContent = a;
    div.style.background = 'rgba(255,255,255,0.06)';
    div.onclick = function () {
      picker.querySelectorAll('.avatar-option').forEach(function (x) {
        x.classList.remove('selected');
      });
      div.classList.add('selected');
      playerAvatar = a;
    };
    picker.appendChild(div);
  });

  // Build color picker
  var cpicker = document.getElementById('colorPicker');
  cpicker.innerHTML = '';
  COLORS.forEach(function (c) {
    var div = document.createElement('div');
    div.className = 'color-opt' + (c === playerColor ? ' selected' : '');
    div.style.background = c;
    div.onclick = function () {
      cpicker.querySelectorAll('.color-opt').forEach(function (x) {
        x.classList.remove('selected');
      });
      div.classList.add('selected');
      playerColor = c;
    };
    cpicker.appendChild(div);
  });
}

function closeAvatar() {
  document.getElementById('avatarModal').classList.remove('active');
}

function saveAvatar() {
  closeAvatar();
  showNotif('Avatar updated! ' + playerAvatar);
}

// ==============================
// GAME LAUNCH & EXIT
// ==============================
function launchGame(game) {
  currentGame = game;
  gameCoinsCollected = 0;
  gameTimer = 0;
  showScreen('gameScreen');
  document.getElementById('gameTitle').textContent = game.emoji + ' ' + game.name;
  document.getElementById('gameCoins').textContent = '0';
  document.getElementById('healthDisplay').textContent = '100';

  // Loading
  var loading = document.getElementById('gameLoading');
  loading.classList.remove('hidden');

  buildPlayerList();

  // Initial chat
  var chatMsgs = document.getElementById('chatMessages');
  chatMsgs.innerHTML = '';
  addChatMsg('Server', 'Welcome to ' + game.name + '! 🇦🇲', '#4caf50');

  setTimeout(function () {
    loading.classList.add('hidden');
    startGame();
  }, 1500);
}

function exitGame() {
  gameRunning = false;
  coins += gameCoinsCollected;
  document.getElementById('coinDisplay').textContent = coins.toLocaleString();
  showScreen('lobbyScreen');
  if (gameCoinsCollected > 0) {
    showNotif('Earned ' + gameCoinsCollected + ' Դdelays! 💰');
  }
}

function buildPlayerList() {
  var pl = document.getElementById('playerList');
  var shuffled = BOT_NAMES.slice().sort(function () {
    return 0.5 - Math.random();
  }).slice(0, 8);

  var html = '<h4>Players (' + (shuffled.length + 1) + ')</h4>';
  html += '<div class="pl-item"><span class="pl-dot"></span><span class="pl-you">' +
    playerAvatar + ' ' + username + ' (You)</span></div>';

  shuffled.forEach(function (n) {
    html += '<div class="pl-item"><span class="pl-dot"></span>' +
      AVATARS[Math.floor(Math.random() * AVATARS.length)] + ' ' + n + '</div>';
  });

  pl.innerHTML = html;
}

// ===== CHAT =====
function addChatMsg(name, msg, color) {
  var chatMsgs = document.getElementById('chatMessages');
  var div = document.createElement('div');
  div.className = 'chat-msg';
  div.innerHTML = '<span class="name" style="color:' + (color || '#F2A800') + '">' +
    name + ':</span> ' + msg;
  chatMsgs.appendChild(div);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function sendChat() {
  var input = document.getElementById('chatInput');
  var msg = input.value.trim();
  if (!msg) return;
  addChatMsg(username, msg, '#F2A800');
  input.value = '';

  // Bot reply
  setTimeout(function () {
    var botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    var botMsg = CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)];
    addChatMsg(botName, botMsg, '#4fc3f7');
  }, 1000 + Math.random() * 3000);
}

// ==============================
// 3D GAME ENGINE
// ==============================
var canvas, ctx;
var player = { x: 0, y: 0, z: 0, vy: 0, speed: 3, running: false, onGround: true, rotation: 0 };
var keys = {};
var camera = { x: 0, y: 0, z: 0 };
var objects = [];
var collectibles = [];
var otherPlayers = [];
var particles = [];
var frameCount = 0;

function startGame() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  resizeCanvas();

  gameRunning = true;
  player = { x: 0, y: 0, z: 0, vy: 0, speed: 3, running: false, onGround: true, rotation: 0 };
  objects = [];
  collectibles = [];
  otherPlayers = [];
  particles = [];
  frameCount = 0;
  gameTimer = 0;
  gameCoinsCollected = 0;

  generateWorld();
  generateBots();

  requestAnimationFrame(gameLoop);

  // Bot chat interval
  if (window._chatInterval) clearInterval(window._chatInterval);
  window._chatInterval = setInterval(function () {
    if (!gameRunning) return;
    var botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    var botMsg = CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)];
    addChatMsg(botName, botMsg, '#4fc3f7');
  }, 8000 + Math.random() * 12000);
}

function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}

window.addEventListener('resize', function () {
  if (gameRunning) resizeCanvas();
});

// ===== INPUT =====
window.addEventListener('keydown', function (e) {
  keys[e.key.toLowerCase()] = true;
  if (e.key === ' ' && gameRunning) e.preventDefault();
});

window.addEventListener('keyup', function (e) {
  keys[e.key.toLowerCase()] = false;
});

// Prevent default scrolling for game keys
window.addEventListener('keydown', function (e) {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(e.key) !== -1 && gameRunning) {
    e.preventDefault();
  }
});

// ==============================
// WORLD GENERATION
// ==============================
function generateWorld() {
  var game = currentGame;

  // Ground tiles
  for (var x = -20; x <= 20; x++) {
    for (var z = -20; z <= 20; z++) {
      objects.push({
        type: 'ground',
        x: x * 40,
        y: 0,
        z: z * 40,
        w: 40,
        h: 2,
        d: 40,
        color: getGroundColor(game, x, z)
      });
    }
  }

  // Structures
  var structures = getStructures(game);
  structures.forEach(function (s) {
    objects.push(s);
  });

  // Collectibles
  for (var i = 0; i < 30; i++) {
    collectibles.push({
      x: (Math.random() - 0.5) * 600,
      y: 15 + Math.random() * 20,
      z: (Math.random() - 0.5) * 600,
      type: getCollectibleType(game),
      collected: false,
      bobOffset: Math.random() * Math.PI * 2,
      size: 8
    });
  }
}

function getGroundColor(game, x, z) {
  var dist = Math.sqrt(x * x + z * z);
  switch (game.world) {
    case 'mountain':
      if (dist > 15) return 'hsl(' + (120 + Math.random() * 20) + ',' + (40 + Math.random() * 20) + '%,' + (25 + Math.random() * 10) + '%)';
      return 'hsl(' + (100 + Math.random() * 30) + ',' + (50 + Math.random() * 20) + '%,' + (30 + Math.random() * 15) + '%)';
    case 'city':
      return (x + z) % 2 === 0 ? '#555555' : '#666666';
    case 'tycoon':
      return 'hsl(' + (40 + Math.random() * 20) + ',60%,' + (40 + Math.random() * 10) + '%)';
    case 'battle':
      return 'hsl(' + (Math.random() * 10) + ',' + (30 + Math.random() * 20) + '%,' + (20 + Math.random() * 10) + '%)';
    case 'chess':
      return (x + z) % 2 === 0 ? '#f0d9b5' : '#b58863';
    case 'ark':
      return 'hsl(' + (200 + Math.random() * 20) + ',60%,' + (30 + Math.random() * 15) + '%)';
    default:
      return 'hsl(' + (120 + Math.random() * 20) + ',50%,' + (30 + Math.random() * 10) + '%)';
  }
}

function getStructures(game) {
  var structs = [];
  var colorMap = {
    mountain: ['#8B7355', '#A0522D', '#DEB887', '#fff', '#ccc'],
    city: ['#FFB6C1', '#FF69B4', '#FFA07A', '#FFD700', '#f0e6d3'],
    tycoon: ['#DAA520', '#CD853F', '#D2691E', '#8B4513', '#F4A460'],
    music: ['#9B59B6', '#8E44AD', '#3498DB', '#2980B9', '#1ABC9C'],
    battle: ['#C0392B', '#E74C3C', '#2C3E50', '#34495E', '#7F8C8D'],
    chess: ['#2C3E50', '#F1C40F', '#ECF0F1', '#95A5A6', '#BDC3C7'],
    ark: ['#8B4513', '#A0522D', '#DEB887', '#D2691E', '#CD853F'],
    dance: ['#E91E63', '#FF5722', '#FF9800', '#FFC107', '#FFEB3B']
  };
  var cols = colorMap[game.world] || colorMap.mountain;

  // Mount Ararat (background)
  structs.push({
    type: 'mountain',
    x: 0, y: 0, z: -600,
    w: 300, h: 250, d: 200,
    color: '#fff',
    color2: '#8B7355'
  });

  // Small Ararat
  structs.push({
    type: 'mountain',
    x: 200, y: 0, z: -550,
    w: 150, h: 150, d: 120,
    color: '#fff',
    color2: '#9B8B6B'
  });

  // Buildings
  for (var i = 0; i < 25; i++) {
    var bx = (Math.random() - 0.5) * 700;
    var bz = (Math.random() - 0.5) * 700;
    var bw = 20 + Math.random() * 40;
    var bh = 20 + Math.random() * 80;
    var bd = 20 + Math.random() * 40;

    structs.push({
      type: 'building',
      x: bx, y: 0, z: bz,
      w: bw, h: bh, d: bd,
      color: cols[Math.floor(Math.random() * cols.length)]
    });
  }

  // Khachkars
  for (var j = 0; j < 8; j++) {
    structs.push({
      type: 'khachkar',
      x: (Math.random() - 0.5) * 500,
      y: 0,
      z: (Math.random() - 0.5) * 500,
      w: 6, h: 30, d: 4,
      color: '#DEB887'
    });
  }

  // Trees
  for (var k = 0; k < 40; k++) {
    structs.push({
      type: 'tree',
      x: (Math.random() - 0.5) * 800,
      y: 0,
      z: (Math.random() - 0.5) * 800,
      w: 8, h: 40 + Math.random() * 30, d: 8,
      color: '#2d5a1e',
      trunkColor: '#5a3510'
    });
  }

  return structs;
}

function getCollectibleType(game) {
  var types = {
    mountain: ['💎', '⭐', '🏔️'],
    city: ['💰', '🌟', '🏛️'],
    tycoon: ['🫓', '💰', '⭐'],
    music: ['🎵', '🎶', '⭐'],
    battle: ['🔴', '💣', '⭐'],
    chess: ['♟️', '👑', '⭐'],
    ark: ['🐑', '🕊️', '⭐'],
    dance: ['💃', '🎵', '⭐']
  };
  var t = types[game.world] || types.mountain;
  return t[Math.floor(Math.random() * t.length)];
}

function generateBots() {
  for (var i = 0; i < 6; i++) {
    otherPlayers.push({
      name: BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)],
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      x: (Math.random() - 0.5) * 400,
      y: 0,
      z: (Math.random() - 0.5) * 400,
      targetX: 0,
      targetZ: 0,
      speed: 1 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      moveTimer: 0
    });
  }
}

// ==============================
// GAME LOOP
// ==============================
function gameLoop() {
  if (!gameRunning) return;

  frameCount++;

  if (frameCount % 60 === 0) {
    gameTimer++;
    var m = Math.floor(gameTimer / 60);
    var s = gameTimer % 60;
    document.getElementById('gameTime').textContent = m + ':' + (s < 10 ? '0' : '') + s;
  }

  update();
  render();
  requestAnimationFrame(gameLoop);
}

// ===== UPDATE =====
function update() {
  // Player movement
  var moveX = 0;
  var moveZ = 0;
  var sp = keys['shift'] ? player.speed * 1.8 : player.speed;

  if (keys['w'] || keys['arrowup']) moveZ -= sp;
  if (keys['s'] || keys['arrowdown']) moveZ += sp;
  if (keys['a'] || keys['arrowleft']) moveX -= sp;
  if (keys['d'] || keys['arrowright']) moveX += sp;

  player.x += moveX;
  player.z += moveZ;

  // Jump
  if (keys[' '] && player.onGround) {
    player.vy = 12;
    player.onGround = false;
  }

  // Gravity
  player.vy -= 0.5;
  player.y += player.vy;
  if (player.y <= 0) {
    player.y = 0;
    player.vy = 0;
    player.onGround = true;
  }

  // Rotation
  if (moveX !== 0 || moveZ !== 0) {
    player.rotation = Math.atan2(moveX, moveZ);
  }

  // Camera
  camera.x += (player.x - camera.x) * 0.1;
  camera.y += ((player.y + 100) - camera.y) * 0.05;
  camera.z += ((player.z + 200) - camera.z) * 0.1;

  // Collect items with E
  if (keys['e']) {
    collectibles.forEach(function (c) {
      if (c.collected) return;
      var dx = player.x - c.x;
      var dz = player.z - c.z;
      var dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 40) {
        c.collected = true;
        gameCoinsCollected += 10;
        document.getElementById('gameCoins').textContent = gameCoinsCollected;

        // Particles
        for (var i = 0; i < 8; i++) {
          particles.push({
            x: c.x, y: c.y, z: c.z,
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 5,
            vz: (Math.random() - 0.5) * 5,
            life: 30,
            color: '#F2A800'
          });
        }

        showNotif('+10 💰');
      }
    });
  }

  // Update bots
  otherPlayers.forEach(function (bot) {
    bot.moveTimer--;
    if (bot.moveTimer <= 0) {
      bot.targetX = (Math.random() - 0.5) * 400;
      bot.targetZ = (Math.random() - 0.5) * 400;
      bot.moveTimer = 120 + Math.random() * 180;
    }
    var dx = bot.targetX - bot.x;
    var dz = bot.targetZ - bot.z;
    var dist = Math.sqrt(dx * dx + dz * dz);
    if (dist > 5) {
      bot.x += (dx / dist) * bot.speed;
      bot.z += (dz / dist) * bot.speed;
    }
  });

  // Update particles
  particles = particles.filter(function (p) {
    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;
    p.vy -= 0.2;
    p.life--;
    return p.life > 0;
  });
}

// ===== 3D PROJECTION =====
function project(x, y, z) {
  var rx = x - camera.x;
  var ry = y - camera.y;
  var rz = z - camera.z;

  if (rz > -10) return null;

  var scale = 500 / (-rz);
  var sx = canvas.width / 2 + rx * scale;
  var sy = canvas.height / 2 - ry * scale;

  return { x: sx, y: sy, scale: scale, depth: -rz };
}

// ===== RENDER =====
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sky
  var skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGrad.addColorStop(0, '#1a1a3e');
  skyGrad.addColorStop(0.3, '#4a6fa5');
  skyGrad.addColorStop(0.6, '#87CEEB');
  skyGrad.addColorStop(1, '#b0d4e8');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sun
  var sunProj = project(300, 200, -800);
  if (sunProj) {
    var sunGrad = ctx.createRadialGradient(sunProj.x, sunProj.y, 0, sunProj.x, sunProj.y, 60);
    sunGrad.addColorStop(0, '#FFF9C4');
    sunGrad.addColorStop(0.3, '#FFC107');
    sunGrad.addColorStop(1, 'rgba(255,193,7,0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(sunProj.x - 80, sunProj.y - 80, 160, 160);
  }

  // Collect all renderable things
  var renderList = [];

  // Objects
  objects.forEach(function (obj) {
    var p = project(obj.x, obj.y + obj.h / 2, obj.z);
    if (!p) return;
    renderList.push({
      data: obj, projected: p, sortZ: p.depth, renderType: 'object'
    });
  });

  // Collectibles
  collectibles.forEach(function (c) {
    if (c.collected) return;
    var bob = Math.sin(frameCount * 0.05 + c.bobOffset) * 5;
    var p = project(c.x, c.y + bob, c.z);
    if (!p) return;
    renderList.push({
      data: c, projected: p, bobY: bob, sortZ: p.depth, renderType: 'collectible'
    });
  });

  // Bots
  otherPlayers.forEach(function (bot) {
    var p = project(bot.x, bot.y + 20, bot.z);
    if (!p) return;
    renderList.push({
      data: bot, projected: p, sortZ: p.depth, renderType: 'bot'
    });
  });

  // Player
  var pp = project(player.x, player.y + 20, player.z);
  if (pp) {
    renderList.push({
      data: null, projected: pp, sortZ: pp.depth, renderType: 'player'
    });
  }

  // Particles
  particles.forEach(function (par) {
    var proj = project(par.x, par.y, par.z);
    if (!proj) return;
    renderList.push({
      data: par, projected: proj, sortZ: proj.depth, renderType: 'particle'
    });
  });

  // Sort far → near
  renderList.sort(function (a, b) {
    return b.sortZ - a.sortZ;
  });

  // Draw each item
  renderList.forEach(function (item) {
    var p = item.projected;
    var s = p.scale;

    switch (item.renderType) {
      case 'object':
        renderObject(item.data, p, s);
        break;
      case 'collectible':
        renderCollectible(item.data, p, s);
        break;
      case 'bot':
        renderBot(item.data, p, s);
        break;
      case 'player':
        renderPlayer(p, s);
        break;
      case 'particle':
        renderParticle(item.data, p, s);
        break;
    }
  });

  // Crosshair
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 1;
  var cx = canvas.width / 2;
  var cy = canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(cx - 10, cy);
  ctx.lineTo(cx + 10, cy);
  ctx.moveTo(cx, cy - 10);
  ctx.lineTo(cx, cy + 10);
  ctx.stroke();

  // Minimap
  renderMinimap();
}

// ===== RENDER OBJECT =====
function renderObject(obj, p, s) {
  switch (obj.type) {
    case 'ground': {
      var w = obj.w * s;
      var h = obj.h * s;
      ctx.fillStyle = obj.color;
      ctx.fillRect(p.x - w / 2, p.y - h / 2, w, h);
      break;
    }

    case 'mountain': {
      var mw = obj.w * s;
      var mh = obj.h * s;
      ctx.beginPath();
      ctx.moveTo(p.x - mw / 2, p.y + mh / 2);
      ctx.lineTo(p.x, p.y - mh / 2);
      ctx.lineTo(p.x + mw / 2, p.y + mh / 2);
      ctx.closePath();
      var grad = ctx.createLinearGradient(p.x, p.y - mh / 2, p.x, p.y + mh / 2);
      grad.addColorStop(0, obj.color);
      grad.addColorStop(0.3, '#ddd');
      grad.addColorStop(1, obj.color2);
      ctx.fillStyle = grad;
      ctx.fill();
      // Snow cap
      ctx.beginPath();
      ctx.moveTo(p.x - mw * 0.15, p.y - mh * 0.2);
      ctx.lineTo(p.x, p.y - mh / 2);
      ctx.lineTo(p.x + mw * 0.15, p.y - mh * 0.2);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
      break;
    }

    case 'building': {
      var bw = obj.w * s;
      var bh = obj.h * s;
      var bd = obj.d * s * 0.3;

      // Front
      ctx.fillStyle = obj.color;
      ctx.fillRect(p.x - bw / 2, p.y - bh + bh / 2, bw, bh);

      // Side
      ctx.fillStyle = shadeColor(obj.color, -30);
      ctx.fillRect(p.x + bw / 2, p.y - bh + bh / 2, bd, bh);

      // Top
      ctx.fillStyle = shadeColor(obj.color, 20);
      ctx.beginPath();
      ctx.moveTo(p.x - bw / 2, p.y - bh + bh / 2);
      ctx.lineTo(p.x - bw / 2 + bd, p.y - bh + bh / 2 - bd * 0.5);
      ctx.lineTo(p.x + bw / 2 + bd, p.y - bh + bh / 2 - bd * 0.5);
      ctx.lineTo(p.x + bw / 2, p.y - bh + bh / 2);
      ctx.closePath();
      ctx.fill();

      // Windows
      ctx.fillStyle = 'rgba(255,255,200,0.6)';
      var ww = bw * 0.15;
      var wh = bh * 0.1;
      for (var wy = 0; wy < 3; wy++) {
        for (var wx = 0; wx < 2; wx++) {
          ctx.fillRect(
            p.x - bw * 0.3 + wx * bw * 0.4,
            p.y - bh * 0.7 + bh / 2 + wy * bh * 0.25,
            ww, wh
          );
        }
      }
      break;
    }

    case 'khachkar': {
      var kw = obj.w * s;
      var kh = obj.h * s;
      ctx.fillStyle = obj.color;
      ctx.fillRect(p.x - kw / 2, p.y - kh + kh / 2, kw, kh);
      // Cross
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(p.x - kw * 0.08, p.y - kh * 0.8 + kh / 2, kw * 0.16, kh * 0.6);
      ctx.fillRect(p.x - kw * 0.3, p.y - kh * 0.55 + kh / 2, kw * 0.6, kh * 0.12);
      break;
    }

    case 'tree': {
      var tw = obj.w * s;
      var th = obj.h * s;
      // Trunk
      ctx.fillStyle = obj.trunkColor;
      ctx.fillRect(p.x - tw * 0.3, p.y - th * 0.4 + th / 2, tw * 0.6, th * 0.5);
      // Leaves
      ctx.fillStyle = obj.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y - th * 0.3 + th / 2, tw * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = shadeColor(obj.color, 20);
      ctx.beginPath();
      ctx.arc(p.x + tw * 0.5, p.y - th * 0.4 + th / 2, tw * 1.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }
}

// ===== RENDER COLLECTIBLE =====
function renderCollectible(item, p, s) {
  var size = Math.max(8, item.size * s * 3);

  ctx.shadowColor = '#F2A800';
  ctx.shadowBlur = 15;

  ctx.font = size + 'px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(item.type, p.x, p.y);

  ctx.shadowBlur = 0;
}

// ===== RENDER BOT =====
function renderBot(bot, p, s) {
  var size = Math.max(12, 20 * s);

  // Body
  ctx.fillStyle = bot.color;
  ctx.fillRect(p.x - size / 2, p.y - size, size, size * 1.5);

  // Head
  ctx.fillStyle = '#FFE0BD';
  ctx.beginPath();
  ctx.arc(p.x, p.y - size * 1.2, size * 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Avatar emoji
  ctx.font = (size * 0.7) + 'px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(bot.avatar, p.x, p.y - size * 1.2);

  // Name tag
  ctx.font = 'bold ' + Math.max(9, 10 * s) + 'px Nunito';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText(bot.name, p.x, p.y - size * 1.8);
}

// ===== RENDER PLAYER =====
function renderPlayer(p, s) {
  var size = Math.max(14, 22 * s);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(p.x, p.y + size * 0.8, size * 0.6, size * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = playerColor;
  ctx.fillRect(p.x - size / 2, p.y - size, size, size * 1.5);

  // Arm animation
  var armSwing = Math.sin(frameCount * 0.1) * size * 0.3;
  ctx.fillStyle = shadeColor(playerColor, -20);
  ctx.fillRect(p.x - size * 0.8, p.y - size * 0.7 + armSwing, size * 0.25, size * 0.8);
  ctx.fillRect(p.x + size * 0.55, p.y - size * 0.7 - armSwing, size * 0.25, size * 0.8);

  // Head
  ctx.fillStyle = '#FFE0BD';
  ctx.beginPath();
  ctx.arc(p.x, p.y - size * 1.2, size * 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Avatar
  ctx.font = (size * 0.8) + 'px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(playerAvatar, p.x, p.y - size * 1.2);

  // Name
  ctx.font = 'bold ' + Math.max(10, 12 * s) + 'px Nunito';
  ctx.fillStyle = '#F2A800';
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.lineWidth = 3;
  ctx.strokeText(username, p.x, p.y - size * 1.9);
  ctx.fillText(username, p.x, p.y - size * 1.9);
}

// ===== RENDER PARTICLE =====
function renderParticle(item, p, s) {
  var size = Math.max(2, 4 * s);
  ctx.fillStyle = item.color;
  ctx.globalAlpha = item.life / 30;
  ctx.beginPath();
  ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

// ===== MINIMAP =====
function renderMinimap() {
  var mmSize = 130;
  var mmX = canvas.width - mmSize - 16;
  var mmY = canvas.height - mmSize - 16;
  var mmScale = mmSize / 800;

  // Background
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  roundRect(ctx, mmX - 5, mmY - 5, mmSize + 10, mmSize + 10, 8);
  ctx.fill();
  ctx.stroke();

  // Ground
  ctx.fillStyle = 'rgba(34,139,34,0.3)';
  ctx.fillRect(mmX, mmY, mmSize, mmSize);

  // Objects on minimap
  objects.forEach(function (obj) {
    if (obj.type === 'building') {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      var ox = mmX + mmSize / 2 + obj.x * mmScale;
      var oy = mmY + mmSize / 2 + obj.z * mmScale;
      ctx.fillRect(ox - 2, oy - 2, 4, 4);
    }
  });

  // Bots
  otherPlayers.forEach(function (bot) {
    ctx.fillStyle = '#4fc3f7';
    var bx = mmX + mmSize / 2 + bot.x * mmScale;
    var by = mmY + mmSize / 2 + bot.z * mmScale;
    ctx.beginPath();
    ctx.arc(bx, by, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Collectibles
  collectibles.forEach(function (c) {
    if (c.collected) return;
    ctx.fillStyle = '#F2A800';
    var cx2 = mmX + mmSize / 2 + c.x * mmScale;
    var cy2 = mmY + mmSize / 2 + c.z * mmScale;
    ctx.fillRect(cx2 - 1, cy2 - 1, 2, 2);
  });

  // Player
  ctx.fillStyle = '#ff0000';
  var px = mmX + mmSize / 2 + player.x * mmScale;
  var py = mmY + mmSize / 2 + player.z * mmScale;
  ctx.beginPath();
  ctx.arc(px, py, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.stroke();
}

// ==============================
// UTILITY FUNCTIONS
// ==============================
function shadeColor(color, percent) {
  var num = parseInt(color.replace('#', ''), 16);
  var amt = Math.round(2.55 * percent);
  var R = Math.min(255, Math.max(0, (num >> 16) + amt));
  var G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
  var B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Focus canvas on click
document.getElementById('gameCanvas').addEventListener('click', function () {
  document.getElementById('gameCanvas').focus();
});

console.log('🇦🇲 ՀԱՅBLOX loaded! Welcome to the Armenian Gaming Platform!');

// =====================================
// PIXELPILOT HUB - MAIN JAVASCRIPT
// =====================================


// =====================================
// 1. BUILD STUDIO
// =====================================

const builds = [
  {
    name: "Medieval Castle",
    description: "Build a large castle with towers, walls and a grand entrance.",
    materials: "Stone Bricks, Oak Planks, Glass, Lanterns, Iron Bars"
  },
  {
    name: "Modern Mansion",
    description: "Create a modern house with glass walls and a swimming pool.",
    materials: "White Concrete, Glass, Quartz, Sea Lanterns, Oak Planks"
  },
  {
    name: "Treehouse Village",
    description: "Build connected treehouses high above the forest floor.",
    materials: "Oak Logs, Oak Planks, Leaves, Ladders, Lanterns"
  },
  {
    name: "Underground Base",
    description: "Design a hidden underground base with storage and farms.",
    materials: "Stone Bricks, Deepslate, Glass, Iron Doors, Redstone Lamps"
  },
  {
    name: "Japanese Pagoda",
    description: "Create a layered pagoda with a peaceful garden.",
    materials: "Spruce Planks, Dark Oak, Red Concrete, Stone Bricks, Lanterns"
  },
  {
    name: "Floating Wizard Tower",
    description: "Build a magical tower floating above the clouds.",
    materials: "Purpur Blocks, Amethyst, Glass, Stone Bricks, End Rods"
  }
];

let currentBuild = null;

function generateBuild() {
  const build = builds[Math.floor(Math.random() * builds.length)];
  currentBuild = build;

  const result = document.getElementById("buildResult");

  if (!result) return;

  result.innerHTML = `
    <div class="feature-icon">🏗️</div>
    <h2>${build.name}</h2>
    <p>${build.description}</p>
    <h3>Suggested Materials</h3>
    <p>${build.materials}</p>
  `;
}

document.getElementById("generateBuild")
  ?.addEventListener("click", generateBuild);

document.getElementById("randomBuild")
  ?.addEventListener("click", generateBuild);


// =====================================
// 2. MINECRAFT EXPLORER DATABASE
// =====================================

const minecraftDatabase = {
  biomes: {
    title: "Minecraft Biomes",
    intro: "Biomes are different natural environments with their own terrain, vegetation and climate.",
    items: [
      ["Plains", "A mostly flat grassy biome with flowers, grass and villages."],
      ["Forest", "A wooded biome containing oak and birch trees."],
      ["Desert", "A dry biome with sand, cacti and dead bushes."],
      ["Jungle", "A warm biome with dense trees, vines and jungle wildlife."],
      ["Savanna", "A warm grassland with acacia trees."],
      ["Taiga", "A cool forest biome with spruce trees."],
      ["Snowy Plains", "A cold, open landscape covered in snow."],
      ["Mushroom Fields", "A rare biome with mycelium and giant mushrooms."],
      ["Deep Dark", "An underground biome containing sculk blocks and ancient cities."]
    ]
  },

  mobs: {
    title: "Minecraft Mobs",
    intro: "Mobs are living entities found throughout the Minecraft world.",
    items: [
      ["Zombie", "A hostile undead mob that burns in sunlight."],
      ["Skeleton", "A hostile mob that attacks using a bow."],
      ["Creeper", "A hostile mob known for its explosive attack."],
      ["Enderman", "A tall neutral mob that can teleport."],
      ["Villager", "A peaceful NPC who can trade items with players."],
      ["Iron Golem", "A strong protective mob that defends villagers."],
      ["Axolotl", "An aquatic passive mob found in lush caves."],
      ["Wolf", "An animal that can be tamed."],
      ["Ender Dragon", "The powerful boss found in the End dimension."]
    ]
  },

  blocks: {
    title: "Minecraft Blocks",
    intro: "Blocks are the basic building materials and objects in Minecraft.",
    items: [
      ["Stone", "A common block found underground."],
      ["Dirt", "A natural block found across many surface biomes."],
      ["Oak Planks", "A wooden building block crafted from oak logs."],
      ["Glass", "A transparent block made by smelting sand."],
      ["Obsidian", "A strong block formed when water interacts with lava source blocks."],
      ["Crafting Table", "A block used to access the 3 by 3 crafting grid."],
      ["Furnace", "A block used to smelt ores and cook food."],
      ["Redstone Lamp", "A light-emitting block powered by redstone."],
      ["Beacon", "A block that can provide status effects to nearby players."]
    ]
  },

  ores: {
    title: "Minecraft Ores",
    intro: "Ores are mineral blocks that can be mined to obtain useful resources.",
    items: [
      ["Coal Ore", "Provides coal, commonly used as fuel."],
      ["Iron Ore", "Provides raw iron, which can be smelted into iron ingots."],
      ["Copper Ore", "Provides raw copper for crafting and building."],
      ["Gold Ore", "Provides raw gold, used in several crafting recipes."],
      ["Redstone Ore", "Provides redstone dust for mechanisms."],
      ["Lapis Lazuli Ore", "Provides lapis lazuli, used for enchanting."],
      ["Diamond Ore", "Provides diamonds used for powerful equipment."],
      ["Emerald Ore", "Provides emeralds, useful for villager trading."],
      ["Ancient Debris", "A rare Nether block used to obtain netherite."]
    ]
  },

  dimensions: {
    title: "Minecraft Dimensions",
    intro: "Minecraft has three main dimensions, each with unique terrain and creatures.",
    items: [
      ["Overworld", "The main dimension containing forests, oceans, villages and caves."],
      ["Nether", "A dangerous dimension with lava oceans, fortresses and unique resources."],
      ["The End", "A strange dimension containing End islands and the Ender Dragon."]
    ]
  },

  combat: {
    title: "Minecraft Combat",
    intro: "Combat involves weapons, armor, shields and useful equipment.",
    items: [
      ["Sword", "A melee weapon used to attack enemies."],
      ["Axe", "A tool that can also be used as a melee weapon."],
      ["Bow", "A ranged weapon that fires arrows."],
      ["Crossbow", "A ranged weapon that can be loaded before firing."],
      ["Shield", "An item used to block many incoming attacks."],
      ["Armor", "Equipment that reduces incoming damage."],
      ["Trident", "A weapon that can be used in melee or thrown."],
      ["Enchanted Golden Apple", "A rare food item that grants powerful status effects."]
    ]
  }
};

const explorerCards = document.querySelectorAll(".explorer-card");
const explorerDetails = document.getElementById("explorerDetails");
const explorerContent = document.getElementById("explorerContent");
const backToCategories = document.getElementById("backToCategories");
const explorerSearch = document.getElementById("minecraftSearch");

function showMinecraftCategory(category) {
  const data = minecraftDatabase[category];

  if (!data || !explorerDetails || !explorerContent) return;

  explorerContent.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = data.title;

  const intro = document.createElement("p");
  intro.textContent = data.intro;
  intro.className = "muted";

  const list = document.createElement("div");
  list.className = "explorer-list";

  data.items.forEach(([name, description]) => {
    const item = document.createElement("article");
    item.className = "explorer-item";

    const title = document.createElement("h3");
    title.textContent = name;

    const text = document.createElement("p");
    text.textContent = description;

    item.append(title, text);
    list.appendChild(item);
  });

  explorerContent.append(heading, intro, list);

  document.getElementById("minecraftCards").hidden = true;
  explorerDetails.hidden = false;
}

explorerCards.forEach(card => {
  card.addEventListener("click", () => {
    showMinecraftCategory(card.dataset.category);
  });
});

backToCategories?.addEventListener("click", () => {
  explorerDetails.hidden = true;
  document.getElementById("minecraftCards").hidden = false;
});

explorerSearch?.addEventListener("input", () => {
  const query = explorerSearch.value.toLowerCase().trim();

  explorerCards.forEach(card => {
    card.hidden = !card.textContent.toLowerCase().includes(query);
  });
});


// =====================================
// 3. LOCAL STORAGE
// =====================================

const FAVORITES_KEY = "pixelpilot_favorites";
const SEEDS_KEY = "pixelpilot_seeds";

function readStorage(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    alert("Your browser could not save this data.");
  }
}


// =====================================
// 4. FAVORITES SYSTEM
// =====================================

function addFavorite(name) {
  if (!name) return;

  const favorites = readStorage(FAVORITES_KEY);

  if (favorites.includes(name)) {
    alert("This build is already in your favorites.");
    return;
  }

  favorites.push(name);
  writeStorage(FAVORITES_KEY, favorites);

  renderFavorites();
  updateDashboard();
}

function renderFavorites() {
  const container = document.getElementById("favoritesList");

  if (!container) return;

  const favorites = readStorage(FAVORITES_KEY);

  container.innerHTML = "";

  if (favorites.length === 0) {
    container.textContent = "No favorites saved yet.";
    return;
  }

  favorites.forEach((name, index) => {
    const item = document.createElement("div");
    item.className = "favorite-item";

    const title = document.createElement("span");
    title.textContent = name;

    const remove = document.createElement("button");
    remove.className = "btn secondary";
    remove.textContent = "Remove";

    remove.addEventListener("click", () => {
      const updated = readStorage(FAVORITES_KEY);
      updated.splice(index, 1);
      writeStorage(FAVORITES_KEY, updated);

      renderFavorites();
      updateDashboard();
    });

    item.append(title, remove);
    container.appendChild(item);
  });
}

document.getElementById("saveBuildFavorite")
  ?.addEventListener("click", () => {
    if (!currentBuild) {
      alert("Generate a build first.");
      return;
    }

    addFavorite(currentBuild.name);
  });

document.querySelectorAll(".gallery-save").forEach(button => {
  button.addEventListener("click", () => {
    addFavorite(button.dataset.build);
  });
});

document.getElementById("clearFavorites")
  ?.addEventListener("click", () => {
    if (!confirm("Clear all saved favorites?")) return;

    writeStorage(FAVORITES_KEY, []);
    renderFavorites();
    updateDashboard();
  });


// =====================================
// 5. PERSONAL DASHBOARD
// =====================================

function updateDashboard() {
  const favoriteCount = document.getElementById("favoriteCount");
  const seedCount = document.getElementById("seedCount");

  if (favoriteCount) {
    favoriteCount.textContent = readStorage(FAVORITES_KEY).length;
  }

  if (seedCount) {
    seedCount.textContent = readStorage(SEEDS_KEY).length;
  }
}


// =====================================
// 6. BLOCK CALCULATOR
// =====================================

document.getElementById("calculateBlocks")
  ?.addEventListener("click", () => {
    const length = Number(document.getElementById("calcLength").value);
    const width = Number(document.getElementById("calcWidth").value);
    const height = Number(document.getElementById("calcHeight").value);
    const type = document.getElementById("calcType").value;
    const result = document.getElementById("calcResult");

    if (
      !Number.isInteger(length) ||
      !Number.isInteger(width) ||
      !Number.isInteger(height) ||
      length < 1 ||
      width < 1 ||
      height < 1
    ) {
      result.textContent = "Enter positive whole numbers for all dimensions.";
      return;
    }

    let blocks;

    if (type === "solid") {
      blocks = length * width * height;
    } else if (type === "floor") {
      blocks = length * width;
    } else {
      const outerLayer = length * width;
      const innerLayer =
        Math.max(0, length - 2) * Math.max(0, width - 2);

      blocks = (outerLayer - innerLayer) * height;
    }

    result.textContent =
      `Estimated blocks needed: ${blocks.toLocaleString()}`;
  });


// =====================================
// 7. COMMAND GENERATOR
// =====================================

const commandType = document.getElementById("commandType");
const commandOptions = document.getElementById("commandOptions");

function renderCommandOptions() {
  if (!commandType || !commandOptions) return;

  const options = {
    time: `
      <label>Time
        <select id="commandValue">
          <option value="day">Day</option>
          <option value="noon">Noon</option>
          <option value="night">Night</option>
          <option value="midnight">Midnight</option>
        </select>
      </label>`,

    weather: `
      <label>Weather
        <select id="commandValue">
          <option value="clear">Clear</option>
          <option value="rain">Rain</option>
          <option value="thunder">Thunder</option>
        </select>
      </label>`,

    gamemode: `
      <label>Game mode
        <select id="commandValue">
          <option value="creative">Creative</option>
          <option value="survival">Survival</option>
          <option value="adventure">Adventure</option>
          <option value="spectator">Spectator</option>
        </select>
      </label>`,

    difficulty: `
      <label>Difficulty
        <select id="commandValue">
          <option value="peaceful">Peaceful</option>
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
      </label>`,

    give: `
      <label>Item ID
        <input id="itemValue" type="text" value="diamond">
      </label>
      <label>Amount
        <input id="amountValue" type="number" min="1" max="64" value="1">
      </label>`
  };

  commandOptions.innerHTML = options[commandType.value] || "";
}

commandType?.addEventListener("change", renderCommandOptions);
renderCommandOptions();

document.getElementById("generateCommand")
  ?.addEventListener("click", () => {
    const type = commandType.value;
    let command = "";

    if (type === "give") {
      const item = document.getElementById("itemValue").value.trim();
      const amount = Number(document.getElementById("amountValue").value);

      if (
        !/^[a-z0-9_]+:[a-z0-9_]+$|^[a-z0-9_]+$/i.test(item) ||
        !Number.isInteger(amount) ||
        amount < 1 ||
        amount > 64
      ) {
        document.getElementById("commandOutput").textContent =
          "Enter a valid item ID and an amount from 1 to 64.";
        return;
      }

      const itemId = item.includes(":")
        ? item
        : "minecraft:" + item;

      command = `/give @p ${itemId} ${amount}`;
    } else {
      const value = document.getElementById("commandValue").value;

      if (type === "time") command = `/time set ${value}`;
      if (type === "weather") command = `/weather ${value}`;
      if (type === "gamemode") command = `/gamemode ${value} @p`;
      if (type === "difficulty") command = `/difficulty ${value}`;
    }

    document.getElementById("commandOutput").textContent = command;
  });

document.getElementById("copyCommand")
  ?.addEventListener("click", async () => {
    const command = document.getElementById("commandOutput").textContent;

    if (!command.startsWith("/")) {
      alert("Generate a command first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(command);
      alert("Command copied.");
    } catch {
      alert("Copy was blocked. Select the command and copy it manually.");
    }
  });


// =====================================
// 8. SEED EXPLORER
// =====================================

function renderSeeds() {
  const container = document.getElementById("seedsList");

  if (!container) return;

  const seeds = readStorage(SEEDS_KEY);

  container.innerHTML = "";

  if (seeds.length === 0) {
    container.textContent = "No seeds saved yet.";
    return;
  }

  seeds.forEach((seed, index) => {
    const item = document.createElement("div");
    item.className = "favorite-item";

    const info = document.createElement("span");
    info.textContent = `${seed.seed} · ${seed.version}`;

    const remove = document.createElement("button");
    remove.className = "btn secondary";
    remove.textContent = "Remove";

    remove.addEventListener("click", () => {
      const updated = readStorage(SEEDS_KEY);
      updated.splice(index, 1);
      writeStorage(SEEDS_KEY, updated);

      renderSeeds();
      updateDashboard();
    });

    item.append(info, remove);
    container.appendChild(item);
  });
}

document.getElementById("saveSeed")
  ?.addEventListener("click", () => {
    const seedInput = document.getElementById("seedInput");
    const version = document.getElementById("seedVersion").value;
    const seed = seedInput.value.trim();

    if (!seed) {
      alert("Enter a world seed first.");
      return;
    }

    const seeds = readStorage(SEEDS_KEY);

    if (
      seeds.some(item =>
        item.seed === seed && item.version === version
      )
    ) {
      alert("This seed is already saved.");
      return;
    }

    seeds.push({ seed, version });
    writeStorage(SEEDS_KEY, seeds);

    seedInput.value = "";

    renderSeeds();
    updateDashboard();
  });


// =====================================
// 9. INITIALIZE WEBSITE
// =====================================

renderFavorites();
renderSeeds();
updateDashboard();

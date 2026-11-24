import type { LevelConfig } from '../types';

export const CURRICULUM: LevelConfig[] = [
  // ============================================================
  // FLOOR 1 (Levels 1-10) — Dungeon Sight: SELECT basics
  // bgTheme: 'cell'
  // ============================================================
  {
    id: 1,
    floor: 1,
    name: "The First Sight",
    subtitle: "Open your eyes, adventurer",
    description: "You awaken in a dimly lit dungeon cell. Strange creatures lurk in the shadows. Your magic tome glows — it can reveal all things. Use it to see every monster in the room.",
    sqlConcept: "SELECT * FROM table",
    conceptTag: "SELECT *",
    goal: "Look at all monsters in the room",
    targetTables: ["monsters"],
    targetColumns: ["*"],
    hint1Concept: "The SELECT statement retrieves data from a table. Using SELECT * means you want all columns. You always pair it with FROM followed by the table name.",
    hint2Example: "SELECT * FROM treasure_chest;",
    hint3Template: "SELECT _____ FROM _____;",
    sqlHint: "SELECT * FROM monsters;",
    sqlSeed: `CREATE TABLE monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  level INTEGER
);
INSERT INTO monsters (id, name, hp, level) VALUES (1, 'Cave Rat', 10, 1);
INSERT INTO monsters (id, name, hp, level) VALUES (2, 'Dungeon Slime', 15, 1);
INSERT INTO monsters (id, name, hp, level) VALUES (3, 'Stone Bat', 8, 1);

CREATE TABLE player (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  mana INTEGER
);
INSERT INTO player (id, name, hp, mana) VALUES (1, 'Hero', 100, 50);`,
    winCondition: { type: 'rows_returned', table: 'monsters', minRows: 3, description: 'Reveal all 3 monsters in the cell' },
    schemas: [
      { name: 'monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'level', type: 'INTEGER', nullable: false } ] },
      { name: 'player', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'mana', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 2,
    floor: 1,
    name: "Name the Fallen",
    subtitle: "Columns hold secrets",
    description: "The monsters stir. Your tome can pinpoint exactly what you need. The dungeon keeper only wants to know the names — nothing more. Query just the names of all fallen beasts.",
    sqlConcept: "SELECT specific columns",
    conceptTag: "SELECT column",
    goal: "Retrieve only the name of each monster",
    targetTables: ["monsters"],
    targetColumns: ["name"],
    hint1Concept: "Instead of SELECT *, you can list specific column names after SELECT. This returns only those columns from each row, which is more precise and efficient.",
    hint2Example: "SELECT title FROM books;",
    hint3Template: "SELECT _____ FROM monsters;",
    sqlHint: "SELECT name FROM monsters;",
    sqlSeed: `CREATE TABLE monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  attack INTEGER
);
INSERT INTO monsters (id, name, hp, attack) VALUES (1, 'Goblin Scout', 12, 4);
INSERT INTO monsters (id, name, hp, attack) VALUES (2, 'Tunnel Worm', 20, 2);
INSERT INTO monsters (id, name, hp, attack) VALUES (3, 'Dust Wraith', 18, 6);
INSERT INTO monsters (id, name, hp, attack) VALUES (4, 'Iron Beetle', 25, 3);`,
    winCondition: { type: 'rows_returned', table: 'monsters', minRows: 4, description: 'List all 4 monster names' },
    schemas: [
      { name: 'monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'attack', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 3,
    floor: 1,
    name: "Twin Columns",
    subtitle: "More than one secret revealed",
    description: "The dungeon register demands two pieces of information: the name and hit-points of each creature. Select both columns from the creatures table to satisfy the ancient tome.",
    sqlConcept: "SELECT multiple columns",
    conceptTag: "SELECT col1, col2",
    goal: "Retrieve name and hp of every creature",
    targetTables: ["creatures"],
    targetColumns: ["name", "hp"],
    hint1Concept: "You can select multiple columns by separating their names with commas between SELECT and FROM. Order them as you want them to appear in the result.",
    hint2Example: "SELECT username, email FROM users;",
    hint3Template: "SELECT _____, _____ FROM creatures;",
    sqlHint: "SELECT name, hp FROM creatures;",
    sqlSeed: `CREATE TABLE creatures (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  defense INTEGER,
  gold_drop INTEGER
);
INSERT INTO creatures (id, name, hp, defense, gold_drop) VALUES (1, 'Bone Crawler', 14, 2, 5);
INSERT INTO creatures (id, name, hp, defense, gold_drop) VALUES (2, 'Shadow Imp', 10, 1, 8);
INSERT INTO creatures (id, name, hp, defense, gold_drop) VALUES (3, 'Mossy Golem', 40, 10, 20);`,
    winCondition: { type: 'rows_returned', table: 'creatures', minRows: 3, description: 'Retrieve name and hp for all 3 creatures' },
    schemas: [
      { name: 'creatures', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'defense', type: 'INTEGER', nullable: false }, { name: 'gold_drop', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 4,
    floor: 1,
    name: "The Alias Scroll",
    subtitle: "Rename without changing",
    description: "An ancient contract requires the monster's attack power to be labelled 'power' in the report. Use an alias to rename the column in your output without altering the table.",
    sqlConcept: "Column alias with AS",
    conceptTag: "AS alias",
    goal: "Select attack as 'power' from the beasts table",
    targetTables: ["beasts"],
    targetColumns: ["attack"],
    hint1Concept: "The AS keyword lets you give a column a different label in your query results. The original column name in the table stays unchanged — it only affects what you see in the output.",
    hint2Example: "SELECT price AS cost FROM items;",
    hint3Template: "SELECT attack AS _____ FROM beasts;",
    sqlHint: "SELECT name, attack AS power FROM beasts;",
    sqlSeed: `CREATE TABLE beasts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  attack INTEGER,
  speed INTEGER
);
INSERT INTO beasts (id, name, attack, speed) VALUES (1, 'Feral Wolf', 15, 12);
INSERT INTO beasts (id, name, attack, speed) VALUES (2, 'Venom Spider', 9, 18);
INSERT INTO beasts (id, name, attack, speed) VALUES (3, 'Cave Bear', 25, 7);`,
    winCondition: { type: 'rows_returned', table: 'beasts', minRows: 3, description: 'Return name and attack (aliased as power) for all beasts' },
    schemas: [
      { name: 'beasts', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'attack', type: 'INTEGER', nullable: false }, { name: 'speed', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 5,
    floor: 1,
    name: "Coin Counter's Eye",
    subtitle: "Arithmetic in the query",
    description: "The tax collector needs each monster's gold_drop doubled — a 2× dungeon tax. Calculate the doubled value directly in your SELECT without modifying the table.",
    sqlConcept: "Arithmetic expressions in SELECT",
    conceptTag: "SELECT expression",
    goal: "Return name and double the gold_drop as tax",
    targetTables: ["loot"],
    targetColumns: ["name", "gold_drop"],
    hint1Concept: "You can perform arithmetic (+ - * /) directly inside a SELECT statement. The result appears as a new computed column without changing any stored data.",
    hint2Example: "SELECT product, price * 2 AS double_price FROM shop;",
    hint3Template: "SELECT name, gold_drop * _____ AS tax FROM loot;",
    sqlHint: "SELECT name, gold_drop * 2 AS tax FROM loot;",
    sqlSeed: `CREATE TABLE loot (
  id INTEGER PRIMARY KEY,
  name TEXT,
  gold_drop INTEGER
);
INSERT INTO loot (id, name, gold_drop) VALUES (1, 'Goblin', 10);
INSERT INTO loot (id, name, gold_drop) VALUES (2, 'Orc', 25);
INSERT INTO loot (id, name, gold_drop) VALUES (3, 'Troll', 50);
INSERT INTO loot (id, name, gold_drop) VALUES (4, 'Dragon Hatchling', 100);`,
    winCondition: { type: 'rows_returned', table: 'loot', minRows: 4, description: 'Return all 4 rows with doubled gold values' },
    schemas: [
      { name: 'loot', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'gold_drop', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 6,
    floor: 1,
    name: "The Distinct Runes",
    subtitle: "No duplicates allowed",
    description: "The enchanter's ledger lists monster types but many repeat. You need to know which unique types exist in the dungeon. Use DISTINCT to remove duplicates from your result.",
    sqlConcept: "SELECT DISTINCT",
    conceptTag: "DISTINCT",
    goal: "List each unique monster type once",
    targetTables: ["monsters"],
    targetColumns: ["type"],
    hint1Concept: "DISTINCT placed right after SELECT eliminates duplicate rows from the result. If two rows have the same value in the selected column, only one will appear.",
    hint2Example: "SELECT DISTINCT country FROM travelers;",
    hint3Template: "SELECT DISTINCT _____ FROM monsters;",
    sqlHint: "SELECT DISTINCT type FROM monsters;",
    sqlSeed: `CREATE TABLE monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  hp INTEGER
);
INSERT INTO monsters (id, name, type, hp) VALUES (1, 'Goblin', 'humanoid', 12);
INSERT INTO monsters (id, name, type, hp) VALUES (2, 'Hobgoblin', 'humanoid', 20);
INSERT INTO monsters (id, name, type, hp) VALUES (3, 'Cave Bat', 'beast', 8);
INSERT INTO monsters (id, name, type, hp) VALUES (4, 'Dire Rat', 'beast', 10);
INSERT INTO monsters (id, name, type, hp) VALUES (5, 'Skeleton', 'undead', 15);`,
    winCondition: { type: 'rows_returned', table: 'monsters', minRows: 3, description: 'Return exactly 3 distinct types' },
    schemas: [
      { name: 'monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 7,
    floor: 1,
    name: "The Rune of Truth",
    subtitle: "Literal values in queries",
    description: "The stone tablet needs a constant label beside each monster's name: the word 'ALIVE'. Add a literal string column called 'status' to your result without touching the table.",
    sqlConcept: "Selecting literal values",
    conceptTag: "SELECT literal",
    goal: "Return name and a literal 'ALIVE' status for each monster",
    targetTables: ["guardians"],
    targetColumns: ["name"],
    hint1Concept: "You can include fixed text or numbers directly in a SELECT list. Wrap text in single quotes. Every row will show that same constant value.",
    hint2Example: "SELECT name, 'active' AS status FROM employees;",
    hint3Template: "SELECT name, '______' AS status FROM guardians;",
    sqlHint: "SELECT name, 'ALIVE' AS status FROM guardians;",
    sqlSeed: `CREATE TABLE guardians (
  id INTEGER PRIMARY KEY,
  name TEXT,
  post TEXT
);
INSERT INTO guardians (id, name, post) VALUES (1, 'Iron Sentinel', 'north gate');
INSERT INTO guardians (id, name, post) VALUES (2, 'Stone Warden', 'south gate');
INSERT INTO guardians (id, name, post) VALUES (3, 'Flame Keeper', 'vault');`,
    winCondition: { type: 'rows_returned', table: 'guardians', minRows: 3, description: 'Return all 3 guardians with a literal status column' },
    schemas: [
      { name: 'guardians', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'post', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 8,
    floor: 1,
    name: "Scroll of All Tables",
    subtitle: "Inspect the second table",
    description: "Beyond the monster table lies a table of traps. Query all traps to understand what dangers await. Apply SELECT * to the traps table.",
    sqlConcept: "SELECT * from a second table",
    conceptTag: "SELECT *",
    goal: "Reveal all traps in the room",
    targetTables: ["traps"],
    targetColumns: ["*"],
    hint1Concept: "SELECT * FROM works on any table in the dungeon. Just change the table name after FROM to target a different table and see all its columns and rows.",
    hint2Example: "SELECT * FROM inventory;",
    hint3Template: "SELECT * FROM _____;",
    sqlHint: "SELECT * FROM traps;",
    sqlSeed: `CREATE TABLE traps (
  id INTEGER PRIMARY KEY,
  name TEXT,
  damage INTEGER,
  is_active INTEGER
);
INSERT INTO traps (id, name, damage, is_active) VALUES (1, 'Spike Pit', 20, 1);
INSERT INTO traps (id, name, damage, is_active) VALUES (2, 'Flame Jet', 15, 1);
INSERT INTO traps (id, name, damage, is_active) VALUES (3, 'Poison Needle', 10, 0);
INSERT INTO traps (id, name, damage, is_active) VALUES (4, 'Boulder Roll', 35, 1);

CREATE TABLE monsters (
  id INTEGER PRIMARY KEY,
  name TEXT
);
INSERT INTO monsters (id, name) VALUES (1, 'Dungeon Keeper');`,
    winCondition: { type: 'rows_returned', table: 'traps', minRows: 4, description: 'Reveal all 4 traps' },
    schemas: [
      { name: 'traps', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false }, { name: 'is_active', type: 'INTEGER', nullable: false } ] },
      { name: 'monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 9,
    floor: 1,
    name: "The Concatenation Rune",
    subtitle: "Merge words with magic",
    description: "The herald needs monster names joined with their rank, like 'Goblin the Weak'. Concatenate the name and title columns using the || operator into a single labelled column.",
    sqlConcept: "String concatenation with ||",
    conceptTag: "|| concat",
    goal: "Combine name and title into a full title column",
    targetTables: ["demons"],
    targetColumns: ["name", "title"],
    hint1Concept: "In SQLite, you join (concatenate) text strings using the || operator. You can combine column values with literal strings to form new phrases.",
    hint2Example: "SELECT first_name || ' ' || last_name AS full_name FROM knights;",
    hint3Template: "SELECT name || ' the ' || title AS full_title FROM demons;",
    sqlHint: "SELECT name || ' the ' || title AS full_title FROM demons;",
    sqlSeed: `CREATE TABLE demons (
  id INTEGER PRIMARY KEY,
  name TEXT,
  title TEXT,
  power INTEGER
);
INSERT INTO demons (id, name, title, power) VALUES (1, 'Zar', 'Cruel', 55);
INSERT INTO demons (id, name, title, power) VALUES (2, 'Morg', 'Undying', 70);
INSERT INTO demons (id, name, title, power) VALUES (3, 'Vex', 'Shadow', 45);`,
    winCondition: { type: 'rows_returned', table: 'demons', minRows: 3, description: 'Return all 3 demon full titles' },
    schemas: [
      { name: 'demons', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'title', type: 'TEXT', nullable: false }, { name: 'power', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },
  {
    id: 10,
    floor: 1,
    name: "The Floor Boss Scroll",
    subtitle: "Master the basics",
    description: "The guardian of Floor 1 demands a full report: select the name, hp, and attack of all creatures in the boss chamber. Prove you have mastered the art of selection.",
    sqlConcept: "SELECT multiple columns (review)",
    conceptTag: "SELECT review",
    goal: "Retrieve name, hp, and attack from the boss_chamber table",
    targetTables: ["boss_chamber"],
    targetColumns: ["name", "hp", "attack"],
    hint1Concept: "Combine everything from Floor 1: select specific columns by listing them with commas after SELECT, and name the target table after FROM.",
    hint2Example: "SELECT breed, age, weight FROM animals;",
    hint3Template: "SELECT _____, _____, _____ FROM boss_chamber;",
    sqlHint: "SELECT name, hp, attack FROM boss_chamber;",
    sqlSeed: `CREATE TABLE boss_chamber (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  attack INTEGER,
  reward_gold INTEGER
);
INSERT INTO boss_chamber (id, name, hp, attack, reward_gold) VALUES (1, 'Floor Guardian Alpha', 200, 30, 500);
INSERT INTO boss_chamber (id, name, hp, attack, reward_gold) VALUES (2, 'Stone Titan', 350, 45, 750);
INSERT INTO boss_chamber (id, name, hp, attack, reward_gold) VALUES (3, 'Dungeon Warlord', 500, 60, 1000);`,
    winCondition: { type: 'rows_returned', table: 'boss_chamber', minRows: 3, description: 'Retrieve name, hp, and attack for all 3 boss chamber creatures' },
    schemas: [
      { name: 'boss_chamber', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'attack', type: 'INTEGER', nullable: false }, { name: 'reward_gold', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cell'
  },

  // ============================================================
  // FLOOR 2 (Levels 11-20) — Precision Targeting: WHERE conditions
  // bgTheme: 'armory'
  // ============================================================
  {
    id: 11,
    floor: 2,
    name: "Poison Filter",
    subtitle: "Find the tainted vials",
    description: "The armory shelves are lined with potions. Some are poisoned — deadly to drink. Use a WHERE clause to find only the poisoned potions before an unsuspecting ally grabs one.",
    sqlConcept: "WHERE with equality",
    conceptTag: "WHERE =",
    goal: "Find only the poisoned potions",
    targetTables: ["potions"],
    targetColumns: ["*"],
    hint1Concept: "The WHERE clause filters rows based on a condition. Use = to match an exact value. Only rows where the condition is true will appear in the results.",
    hint2Example: "SELECT * FROM items WHERE rarity = 'rare';",
    hint3Template: "SELECT * FROM potions WHERE is_poisoned = _____;",
    sqlHint: "SELECT * FROM potions WHERE is_poisoned = 1;",
    sqlSeed: `CREATE TABLE potions (
  id INTEGER PRIMARY KEY,
  name TEXT,
  color TEXT,
  is_poisoned INTEGER,
  effect TEXT
);
INSERT INTO potions (id, name, color, is_poisoned, effect) VALUES (1, 'Red Vial', 'red', 0, 'heal 20');
INSERT INTO potions (id, name, color, is_poisoned, effect) VALUES (2, 'Green Vial', 'green', 1, 'damage 15');
INSERT INTO potions (id, name, color, is_poisoned, effect) VALUES (3, 'Blue Vial', 'blue', 0, 'mana 30');
INSERT INTO potions (id, name, color, is_poisoned, effect) VALUES (4, 'Purple Vial', 'purple', 1, 'damage 25');
INSERT INTO potions (id, name, color, is_poisoned, effect) VALUES (5, 'Yellow Vial', 'yellow', 0, 'speed boost');`,
    winCondition: { type: 'rows_returned', table: 'potions', minRows: 2, description: 'Find the 2 poisoned potions' },
    schemas: [
      { name: 'potions', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'color', type: 'TEXT', nullable: false }, { name: 'is_poisoned', type: 'INTEGER', nullable: false }, { name: 'effect', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 12,
    floor: 2,
    name: "The Not-Equal Blade",
    subtitle: "Everything except the cursed",
    description: "The armory has one cursed sword that must never be drawn. Find all weapons that are NOT of type 'cursed' so the warriors can arm themselves safely.",
    sqlConcept: "WHERE with not-equal",
    conceptTag: "WHERE !=",
    goal: "Select all weapons that are not cursed",
    targetTables: ["weapons"],
    targetColumns: ["*"],
    hint1Concept: "Use != (or <>) in a WHERE clause to exclude rows with a specific value. Rows where the column equals that value are filtered out; all others pass through.",
    hint2Example: "SELECT * FROM spells WHERE element != 'fire';",
    hint3Template: "SELECT * FROM weapons WHERE type != '______';",
    sqlHint: "SELECT * FROM weapons WHERE type != 'cursed';",
    sqlSeed: `CREATE TABLE weapons (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  damage INTEGER
);
INSERT INTO weapons (id, name, type, damage) VALUES (1, 'Iron Sword', 'normal', 15);
INSERT INTO weapons (id, name, type, damage) VALUES (2, 'Death Blade', 'cursed', 50);
INSERT INTO weapons (id, name, type, damage) VALUES (3, 'Silver Dagger', 'normal', 10);
INSERT INTO weapons (id, name, type, damage) VALUES (4, 'Void Axe', 'cursed', 40);
INSERT INTO weapons (id, name, type, damage) VALUES (5, 'Oak Staff', 'magic', 12);`,
    winCondition: { type: 'rows_returned', table: 'weapons', minRows: 3, description: 'Return the 3 non-cursed weapons' },
    schemas: [
      { name: 'weapons', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 13,
    floor: 2,
    name: "Greater Than the Threshold",
    subtitle: "Only the worthy",
    description: "The arena gate only opens for warriors with more than 50 hit-points. Find all warriors who meet the minimum strength requirement to enter.",
    sqlConcept: "WHERE with greater-than",
    conceptTag: "WHERE >",
    goal: "Find warriors with hp greater than 50",
    targetTables: ["warriors"],
    targetColumns: ["*"],
    hint1Concept: "The > operator checks if a value is strictly greater than a threshold. Combined with WHERE, it filters rows to only those exceeding the specified number.",
    hint2Example: "SELECT * FROM heroes WHERE level > 10;",
    hint3Template: "SELECT * FROM warriors WHERE hp > _____;",
    sqlHint: "SELECT * FROM warriors WHERE hp > 50;",
    sqlSeed: `CREATE TABLE warriors (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  class TEXT
);
INSERT INTO warriors (id, name, hp, class) VALUES (1, 'Brom', 45, 'fighter');
INSERT INTO warriors (id, name, hp, class) VALUES (2, 'Sera', 80, 'paladin');
INSERT INTO warriors (id, name, hp, class) VALUES (3, 'Dax', 30, 'rogue');
INSERT INTO warriors (id, name, hp, class) VALUES (4, 'Lyra', 110, 'barbarian');
INSERT INTO warriors (id, name, hp, class) VALUES (5, 'Finn', 55, 'ranger');`,
    winCondition: { type: 'rows_returned', table: 'warriors', minRows: 3, description: 'Find the 3 warriors with hp > 50' },
    schemas: [
      { name: 'warriors', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 14,
    floor: 2,
    name: "Cheap Enough",
    subtitle: "Budget of a dungeon shopper",
    description: "You only have 20 gold coins. Find all items in the shop that cost 20 gold or less so you can afford to buy them.",
    sqlConcept: "WHERE with less-than-or-equal",
    conceptTag: "WHERE <=",
    goal: "Find all items costing 20 gold or less",
    targetTables: ["shop_items"],
    targetColumns: ["*"],
    hint1Concept: "The <= operator matches values that are less than or equal to your threshold. It's inclusive, so a value exactly equal to the limit is included in the results.",
    hint2Example: "SELECT * FROM potions WHERE mana_cost <= 10;",
    hint3Template: "SELECT * FROM shop_items WHERE price <= _____;",
    sqlHint: "SELECT * FROM shop_items WHERE price <= 20;",
    sqlSeed: `CREATE TABLE shop_items (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price INTEGER,
  category TEXT
);
INSERT INTO shop_items (id, name, price, category) VALUES (1, 'Rope', 5, 'gear');
INSERT INTO shop_items (id, name, price, category) VALUES (2, 'Torch', 3, 'gear');
INSERT INTO shop_items (id, name, price, category) VALUES (3, 'Health Potion', 20, 'potion');
INSERT INTO shop_items (id, name, price, category) VALUES (4, 'Magic Shield', 75, 'armor');
INSERT INTO shop_items (id, name, price, category) VALUES (5, 'Enchanted Sword', 150, 'weapon');
INSERT INTO shop_items (id, name, price, category) VALUES (6, 'Bandage', 10, 'potion');`,
    winCondition: { type: 'rows_returned', table: 'shop_items', minRows: 4, description: 'Find the 4 affordable items (price <= 20)' },
    schemas: [
      { name: 'shop_items', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'price', type: 'INTEGER', nullable: false }, { name: 'category', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 15,
    floor: 2,
    name: "AND the Gates Hold",
    subtitle: "Two conditions, one survivor",
    description: "The armory recruiter wants fighters who are both above level 3 AND of class 'knight'. Both conditions must be true. Use AND to combine your filters.",
    sqlConcept: "WHERE with AND",
    conceptTag: "WHERE AND",
    goal: "Find knights who are above level 3",
    targetTables: ["recruits"],
    targetColumns: ["*"],
    hint1Concept: "AND combines two conditions so that both must be true for a row to be included. If either condition fails, the row is excluded.",
    hint2Example: "SELECT * FROM items WHERE weight < 5 AND material = 'iron';",
    hint3Template: "SELECT * FROM recruits WHERE level > 3 AND class = '______';",
    sqlHint: "SELECT * FROM recruits WHERE level > 3 AND class = 'knight';",
    sqlSeed: `CREATE TABLE recruits (
  id INTEGER PRIMARY KEY,
  name TEXT,
  level INTEGER,
  class TEXT
);
INSERT INTO recruits (id, name, level, class) VALUES (1, 'Aldric', 5, 'knight');
INSERT INTO recruits (id, name, level, class) VALUES (2, 'Mira', 2, 'knight');
INSERT INTO recruits (id, name, level, class) VALUES (3, 'Thane', 4, 'rogue');
INSERT INTO recruits (id, name, level, class) VALUES (4, 'Cass', 6, 'knight');
INSERT INTO recruits (id, name, level, class) VALUES (5, 'Dorn', 1, 'rogue');`,
    winCondition: { type: 'rows_returned', table: 'recruits', minRows: 2, description: 'Find the 2 knights above level 3' },
    schemas: [
      { name: 'recruits', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'level', type: 'INTEGER', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 16,
    floor: 2,
    name: "OR the Door Opens",
    subtitle: "Either path will do",
    description: "The sanctuary admits heroes who are either a 'mage' OR a 'cleric'. Find all heroes who qualify under either class — both are welcome.",
    sqlConcept: "WHERE with OR",
    conceptTag: "WHERE OR",
    goal: "Find heroes who are mage or cleric",
    targetTables: ["heroes"],
    targetColumns: ["*"],
    hint1Concept: "OR in a WHERE clause includes a row if at least one of the conditions is true. Even if only one condition matches, the row is returned.",
    hint2Example: "SELECT * FROM enemies WHERE weakness = 'fire' OR weakness = 'light';",
    hint3Template: "SELECT * FROM heroes WHERE class = '______' OR class = '______';",
    sqlHint: "SELECT * FROM heroes WHERE class = 'mage' OR class = 'cleric';",
    sqlSeed: `CREATE TABLE heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  class TEXT,
  hp INTEGER
);
INSERT INTO heroes (id, name, hp, class) VALUES (1, 'Zora', 60, 'mage');
INSERT INTO heroes (id, name, hp, class) VALUES (2, 'Brax', 90, 'fighter');
INSERT INTO heroes (id, name, hp, class) VALUES (3, 'Elindra', 70, 'cleric');
INSERT INTO heroes (id, name, hp, class) VALUES (4, 'Rugg', 110, 'barbarian');
INSERT INTO heroes (id, name, hp, class) VALUES (5, 'Sylva', 65, 'mage');`,
    winCondition: { type: 'rows_returned', table: 'heroes', minRows: 3, description: 'Find the 3 mages and clerics' },
    schemas: [
      { name: 'heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'class', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 17,
    floor: 2,
    name: "NOT the Undead",
    subtitle: "Exclude the cursed kind",
    description: "The sanctuary ward repels undead. Find all monsters that are NOT of category 'undead' so the ward can be properly set.",
    sqlConcept: "WHERE with NOT",
    conceptTag: "WHERE NOT",
    goal: "Return all monsters that are not undead",
    targetTables: ["dungeon_monsters"],
    targetColumns: ["*"],
    hint1Concept: "NOT reverses a condition. WHERE NOT (condition) includes rows where the condition is false. It is often clearer to use != for simple equality negation, but NOT works for more complex expressions.",
    hint2Example: "SELECT * FROM spells WHERE NOT element = 'dark';",
    hint3Template: "SELECT * FROM dungeon_monsters WHERE NOT category = '______';",
    sqlHint: "SELECT * FROM dungeon_monsters WHERE NOT category = 'undead';",
    sqlSeed: `CREATE TABLE dungeon_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  category TEXT,
  threat INTEGER
);
INSERT INTO dungeon_monsters (id, name, category, threat) VALUES (1, 'Zombie', 'undead', 3);
INSERT INTO dungeon_monsters (id, name, category, threat) VALUES (2, 'Goblin', 'humanoid', 2);
INSERT INTO dungeon_monsters (id, name, category, threat) VALUES (3, 'Wraith', 'undead', 7);
INSERT INTO dungeon_monsters (id, name, category, threat) VALUES (4, 'Cave Bear', 'beast', 5);
INSERT INTO dungeon_monsters (id, name, category, threat) VALUES (5, 'Skeleton', 'undead', 4);`,
    winCondition: { type: 'rows_returned', table: 'dungeon_monsters', minRows: 2, description: 'Return the 2 non-undead monsters' },
    schemas: [
      { name: 'dungeon_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'category', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 18,
    floor: 2,
    name: "The Exact Strike",
    subtitle: "Match by number",
    description: "The armory log shows weapon damage values. Find the weapon with exactly 30 damage — the one commissioned for the captain's champion.",
    sqlConcept: "WHERE = on numeric column",
    conceptTag: "WHERE = numeric",
    goal: "Find the weapon with exactly 30 damage",
    targetTables: ["armory"],
    targetColumns: ["*"],
    hint1Concept: "You can use = to match an exact numeric value just like you do with text. No quotes are needed around numbers in SQL.",
    hint2Example: "SELECT * FROM enemies WHERE level = 5;",
    hint3Template: "SELECT * FROM armory WHERE damage = _____;",
    sqlHint: "SELECT * FROM armory WHERE damage = 30;",
    sqlSeed: `CREATE TABLE armory (
  id INTEGER PRIMARY KEY,
  name TEXT,
  damage INTEGER,
  material TEXT
);
INSERT INTO armory (id, name, damage, material) VALUES (1, 'Short Sword', 15, 'iron');
INSERT INTO armory (id, name, damage, material) VALUES (2, 'Long Bow', 20, 'oak');
INSERT INTO armory (id, name, damage, material) VALUES (3, 'War Hammer', 30, 'steel');
INSERT INTO armory (id, name, damage, material) VALUES (4, 'Battle Axe', 35, 'steel');
INSERT INTO armory (id, name, damage, material) VALUES (5, 'Rapier', 18, 'silver');`,
    winCondition: { type: 'rows_returned', table: 'armory', minRows: 1, description: 'Find the 1 weapon with exactly 30 damage' },
    schemas: [
      { name: 'armory', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false }, { name: 'material', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 19,
    floor: 2,
    name: "The Triple Lock",
    subtitle: "Three conditions, one key",
    description: "The vault requires three things to open: the key type must be 'gold', the level must be above 2, and it must not be broken. Chain three conditions with AND.",
    sqlConcept: "Multiple AND conditions",
    conceptTag: "WHERE AND AND",
    goal: "Find usable gold keys above level 2",
    targetTables: ["keys"],
    targetColumns: ["*"],
    hint1Concept: "You can chain as many AND conditions as needed in a WHERE clause. All conditions must evaluate to true for a row to be included in the results.",
    hint2Example: "SELECT * FROM gear WHERE type = 'sword' AND weight < 10 AND is_enchanted = 1;",
    hint3Template: "SELECT * FROM keys WHERE material = 'gold' AND level > 2 AND is_broken = _____;",
    sqlHint: "SELECT * FROM keys WHERE material = 'gold' AND level > 2 AND is_broken = 0;",
    sqlSeed: `CREATE TABLE keys (
  id INTEGER PRIMARY KEY,
  name TEXT,
  material TEXT,
  level INTEGER,
  is_broken INTEGER
);
INSERT INTO keys (id, name, material, level, is_broken) VALUES (1, 'Old Gold Key', 'gold', 1, 0);
INSERT INTO keys (id, name, material, level, is_broken) VALUES (2, 'Master Gold Key', 'gold', 5, 0);
INSERT INTO keys (id, name, material, level, is_broken) VALUES (3, 'Cracked Gold Key', 'gold', 4, 1);
INSERT INTO keys (id, name, material, level, is_broken) VALUES (4, 'Iron Key', 'iron', 3, 0);
INSERT INTO keys (id, name, material, level, is_broken) VALUES (5, 'Royal Gold Key', 'gold', 3, 0);`,
    winCondition: { type: 'rows_returned', table: 'keys', minRows: 2, description: 'Find the 2 usable gold keys above level 2' },
    schemas: [
      { name: 'keys', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'material', type: 'TEXT', nullable: false }, { name: 'level', type: 'INTEGER', nullable: false }, { name: 'is_broken', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 20,
    floor: 2,
    name: "The Armory Commander",
    subtitle: "Prove your WHERE mastery",
    description: "The armory commander demands a full report: elite soldiers are those with rank >= 3 and either class 'warrior' or 'archer'. Combine everything you've learned to find them.",
    sqlConcept: "Combined WHERE with AND/OR and parentheses",
    conceptTag: "WHERE compound",
    goal: "Find elite warriors and archers (rank >= 3)",
    targetTables: ["soldiers"],
    targetColumns: ["*"],
    hint1Concept: "Use parentheses to group OR conditions within a larger AND expression. Without parentheses, AND has higher precedence than OR, which can produce unexpected results.",
    hint2Example: "SELECT * FROM items WHERE quality >= 2 AND (type = 'sword' OR type = 'axe');",
    hint3Template: "SELECT * FROM soldiers WHERE rank >= 3 AND (class = '______' OR class = '______');",
    sqlHint: "SELECT * FROM soldiers WHERE rank >= 3 AND (class = 'warrior' OR class = 'archer');",
    sqlSeed: `CREATE TABLE soldiers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  class TEXT,
  rank INTEGER
);
INSERT INTO soldiers (id, name, class, rank) VALUES (1, 'Hera', 'warrior', 4);
INSERT INTO soldiers (id, name, class, rank) VALUES (2, 'Tomas', 'archer', 2);
INSERT INTO soldiers (id, name, class, rank) VALUES (3, 'Bryn', 'mage', 5);
INSERT INTO soldiers (id, name, class, rank) VALUES (4, 'Kastor', 'archer', 3);
INSERT INTO soldiers (id, name, class, rank) VALUES (5, 'Vell', 'warrior', 1);
INSERT INTO soldiers (id, name, class, rank) VALUES (6, 'Nyx', 'warrior', 3);`,
    winCondition: { type: 'rows_returned', table: 'soldiers', minRows: 3, description: 'Find the 3 elite warriors and archers with rank >= 3' },
    schemas: [
      { name: 'soldiers', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'class', type: 'TEXT', nullable: false }, { name: 'rank', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  // ============================================================
  // FLOOR 3 (Levels 21-30) — Pattern & Range Hunting
  // bgTheme: 'forest'
  // ============================================================
  {
    id: 21,
    floor: 3,
    name: "Between the Trees",
    subtitle: "Catch what lives in the range",
    description: "Deep in the enchanted forest, you hunt creatures whose age falls between 5 and 15 seasons. BETWEEN lets you specify a range without chaining two comparisons.",
    sqlConcept: "BETWEEN for range filtering",
    conceptTag: "BETWEEN",
    goal: "Find creatures aged between 5 and 15 (inclusive)",
    targetTables: ["forest_creatures"],
    targetColumns: ["*"],
    hint1Concept: "BETWEEN low AND high is a shorthand for >= low AND <= high. Both boundary values are included. It works on numbers, dates, and alphabetically on text.",
    hint2Example: "SELECT * FROM artifacts WHERE year BETWEEN 100 AND 500;",
    hint3Template: "SELECT * FROM forest_creatures WHERE age BETWEEN _____ AND _____;",
    sqlHint: "SELECT * FROM forest_creatures WHERE age BETWEEN 5 AND 15;",
    sqlSeed: `CREATE TABLE forest_creatures (
  id INTEGER PRIMARY KEY,
  name TEXT,
  age INTEGER,
  type TEXT
);
INSERT INTO forest_creatures (id, name, age, type) VALUES (1, 'Fawn', 2, 'deer');
INSERT INTO forest_creatures (id, name, age, type) VALUES (2, 'Elder Stag', 20, 'deer');
INSERT INTO forest_creatures (id, name, age, type) VALUES (3, 'Young Fox', 5, 'fox');
INSERT INTO forest_creatures (id, name, age, type) VALUES (4, 'Forest Boar', 10, 'boar');
INSERT INTO forest_creatures (id, name, age, type) VALUES (5, 'Wise Owl', 15, 'owl');
INSERT INTO forest_creatures (id, name, age, type) VALUES (6, 'Ancient Tortoise', 100, 'tortoise');`,
    winCondition: { type: 'rows_returned', table: 'forest_creatures', minRows: 3, description: 'Find the 3 creatures aged 5-15' },
    schemas: [
      { name: 'forest_creatures', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'age', type: 'INTEGER', nullable: false }, { name: 'type', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 22,
    floor: 3,
    name: "Not Between the Thorns",
    subtitle: "Avoid the danger zone",
    description: "The danger zone is power level 10 through 20. Find all enchanted flora whose power is NOT in that range, so you can safely harvest them.",
    sqlConcept: "NOT BETWEEN",
    conceptTag: "NOT BETWEEN",
    goal: "Find flora with power level outside 10-20",
    targetTables: ["enchanted_flora"],
    targetColumns: ["*"],
    hint1Concept: "NOT BETWEEN excludes values within the specified range. It is equivalent to value < low OR value > high. Both endpoints are excluded.",
    hint2Example: "SELECT * FROM zones WHERE danger_level NOT BETWEEN 5 AND 8;",
    hint3Template: "SELECT * FROM enchanted_flora WHERE power NOT BETWEEN _____ AND _____;",
    sqlHint: "SELECT * FROM enchanted_flora WHERE power NOT BETWEEN 10 AND 20;",
    sqlSeed: `CREATE TABLE enchanted_flora (
  id INTEGER PRIMARY KEY,
  name TEXT,
  power INTEGER,
  color TEXT
);
INSERT INTO enchanted_flora (id, name, power, color) VALUES (1, 'Glowmoss', 3, 'blue');
INSERT INTO enchanted_flora (id, name, power, color) VALUES (2, 'Thornbloom', 15, 'red');
INSERT INTO enchanted_flora (id, name, power, color) VALUES (3, 'Moonpetal', 25, 'white');
INSERT INTO enchanted_flora (id, name, power, color) VALUES (4, 'Shadowvine', 12, 'black');
INSERT INTO enchanted_flora (id, name, power, color) VALUES (5, 'Sunleaf', 5, 'yellow');`,
    winCondition: { type: 'rows_returned', table: 'enchanted_flora', minRows: 3, description: 'Find the 3 safe flora outside the danger range' },
    schemas: [
      { name: 'enchanted_flora', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'power', type: 'INTEGER', nullable: false }, { name: 'color', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 23,
    floor: 3,
    name: "The IN Trap",
    subtitle: "Match one of many",
    description: "The forest elder needs berries of exactly three safe types: 'bluebell', 'redcap', or 'silverleaf'. Use IN to find only those berry types in a single clean condition.",
    sqlConcept: "IN operator for multiple values",
    conceptTag: "IN",
    goal: "Find berries of type bluebell, redcap, or silverleaf",
    targetTables: ["berries"],
    targetColumns: ["*"],
    hint1Concept: "IN lets you specify a list of acceptable values. A row is included if the column's value matches any value in the list. It is cleaner than multiple OR conditions.",
    hint2Example: "SELECT * FROM spells WHERE school IN ('fire', 'ice', 'lightning');",
    hint3Template: "SELECT * FROM berries WHERE type IN ('______', '______', '______');",
    sqlHint: "SELECT * FROM berries WHERE type IN ('bluebell', 'redcap', 'silverleaf');",
    sqlSeed: `CREATE TABLE berries (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  is_edible INTEGER
);
INSERT INTO berries (id, name, type, is_edible) VALUES (1, 'Blue Bliss', 'bluebell', 1);
INSERT INTO berries (id, name, type, is_edible) VALUES (2, 'Crimson Cap', 'redcap', 1);
INSERT INTO berries (id, name, type, is_edible) VALUES (3, 'Poison Drop', 'darkshade', 0);
INSERT INTO berries (id, name, type, is_edible) VALUES (4, 'Silver Sprout', 'silverleaf', 1);
INSERT INTO berries (id, name, type, is_edible) VALUES (5, 'Venom Vine', 'nightberry', 0);`,
    winCondition: { type: 'rows_returned', table: 'berries', minRows: 3, description: 'Find the 3 safe berry types' },
    schemas: [
      { name: 'berries', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'is_edible', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 24,
    floor: 3,
    name: "Not IN the Circle",
    subtitle: "Reject the unclean list",
    description: "The forest circle rejects spirits of certain clans. Find all spirits that do NOT belong to the banned clans: 'shadow', 'rot', or 'plague'.",
    sqlConcept: "NOT IN operator",
    conceptTag: "NOT IN",
    goal: "Find spirits not of shadow, rot, or plague clans",
    targetTables: ["spirits"],
    targetColumns: ["*"],
    hint1Concept: "NOT IN excludes rows whose column value appears in the given list. It is the opposite of IN and equivalent to a series of != conditions joined by AND.",
    hint2Example: "SELECT * FROM heroes WHERE class NOT IN ('necromancer', 'warlock');",
    hint3Template: "SELECT * FROM spirits WHERE clan NOT IN ('______', '______', '______');",
    sqlHint: "SELECT * FROM spirits WHERE clan NOT IN ('shadow', 'rot', 'plague');",
    sqlSeed: `CREATE TABLE spirits (
  id INTEGER PRIMARY KEY,
  name TEXT,
  clan TEXT,
  power INTEGER
);
INSERT INTO spirits (id, name, clan, power) VALUES (1, 'Lumis', 'light', 40);
INSERT INTO spirits (id, name, clan, power) VALUES (2, 'Umbra', 'shadow', 55);
INSERT INTO spirits (id, name, clan, power) VALUES (3, 'Bloom', 'nature', 30);
INSERT INTO spirits (id, name, clan, power) VALUES (4, 'Decay', 'rot', 45);
INSERT INTO spirits (id, name, clan, power) VALUES (5, 'Blight', 'plague', 60);
INSERT INTO spirits (id, name, clan, power) VALUES (6, 'Zephyr', 'wind', 35);`,
    winCondition: { type: 'rows_returned', table: 'spirits', minRows: 3, description: 'Find the 3 allowed spirits' },
    schemas: [
      { name: 'spirits', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'clan', type: 'TEXT', nullable: false }, { name: 'power', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 25,
    floor: 3,
    name: "Pattern of the Wolf",
    subtitle: "Hunt by name shape",
    description: "Forest scouts report creatures whose names begin with 'Wolf'. Use LIKE with a wildcard to find all creatures whose name starts with that word.",
    sqlConcept: "LIKE with % wildcard (prefix)",
    conceptTag: "LIKE %",
    goal: "Find all creatures whose name starts with 'Wolf'",
    targetTables: ["wildlife"],
    targetColumns: ["*"],
    hint1Concept: "LIKE performs pattern matching on text. The % character matches any sequence of characters (including none). 'Wolf%' matches anything starting with 'Wolf'.",
    hint2Example: "SELECT * FROM spells WHERE name LIKE 'Fire%';",
    hint3Template: "SELECT * FROM wildlife WHERE name LIKE '______%';",
    sqlHint: "SELECT * FROM wildlife WHERE name LIKE 'Wolf%';",
    sqlSeed: `CREATE TABLE wildlife (
  id INTEGER PRIMARY KEY,
  name TEXT,
  biome TEXT,
  danger INTEGER
);
INSERT INTO wildlife (id, name, biome, danger) VALUES (1, 'Wolf Spider', 'forest', 4);
INSERT INTO wildlife (id, name, biome, danger) VALUES (2, 'Wolfhound', 'plains', 3);
INSERT INTO wildlife (id, name, biome, danger) VALUES (3, 'Cave Bear', 'cave', 7);
INSERT INTO wildlife (id, name, biome, danger) VALUES (4, 'Wolf Pack Leader', 'forest', 8);
INSERT INTO wildlife (id, name, biome, danger) VALUES (5, 'Forest Deer', 'forest', 1);`,
    winCondition: { type: 'rows_returned', table: 'wildlife', minRows: 3, description: 'Find the 3 wolf-named creatures' },
    schemas: [
      { name: 'wildlife', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'biome', type: 'TEXT', nullable: false }, { name: 'danger', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 26,
    floor: 3,
    name: "Ends in Fang",
    subtitle: "Tail-matching the beast",
    description: "The bestiary lists creatures whose names end in 'fang'. Find them all using LIKE with a leading wildcard to match a suffix pattern.",
    sqlConcept: "LIKE with % wildcard (suffix)",
    conceptTag: "LIKE suffix",
    goal: "Find creatures whose name ends with 'fang'",
    targetTables: ["beasts"],
    targetColumns: ["*"],
    hint1Concept: "Placing % before the pattern matches any text that ends with your pattern. '%fang' will match 'Stonefang', 'Bonefang', 'fang' itself, and so on.",
    hint2Example: "SELECT * FROM items WHERE name LIKE '%blade';",
    hint3Template: "SELECT * FROM beasts WHERE name LIKE '%______';",
    sqlHint: "SELECT * FROM beasts WHERE name LIKE '%fang';",
    sqlSeed: `CREATE TABLE beasts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  region TEXT,
  hp INTEGER
);
INSERT INTO beasts (id, name, region, hp) VALUES (1, 'Stonefang', 'mountain', 80);
INSERT INTO beasts (id, name, region, hp) VALUES (2, 'Bonefang', 'crypt', 60);
INSERT INTO beasts (id, name, region, hp) VALUES (3, 'River Serpent', 'river', 50);
INSERT INTO beasts (id, name, region, hp) VALUES (4, 'Ironfang', 'forge', 90);
INSERT INTO beasts (id, name, region, hp) VALUES (5, 'Forest Boar', 'forest', 70);`,
    winCondition: { type: 'rows_returned', table: 'beasts', minRows: 3, description: 'Find the 3 fang-named beasts' },
    schemas: [
      { name: 'beasts', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'region', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 27,
    floor: 3,
    name: "The Middle Name Mystery",
    subtitle: "Search within the word",
    description: "A spy's report mentions herbs that contain the substring 'root' anywhere in their name. Use LIKE with wildcards on both sides to find them.",
    sqlConcept: "LIKE with % on both sides (contains)",
    conceptTag: "LIKE contains",
    goal: "Find herbs whose name contains 'root'",
    targetTables: ["herbs"],
    targetColumns: ["*"],
    hint1Concept: "Placing % on both sides of a pattern matches the pattern anywhere within the string. '%root%' matches 'taproot', 'rootbark', 'deep-root-vine', etc.",
    hint2Example: "SELECT * FROM scrolls WHERE title LIKE '%ancient%';",
    hint3Template: "SELECT * FROM herbs WHERE name LIKE '%______%';",
    sqlHint: "SELECT * FROM herbs WHERE name LIKE '%root%';",
    sqlSeed: `CREATE TABLE herbs (
  id INTEGER PRIMARY KEY,
  name TEXT,
  effect TEXT,
  rarity TEXT
);
INSERT INTO herbs (id, name, effect, rarity) VALUES (1, 'Taproot', 'stamina', 'common');
INSERT INTO herbs (id, name, effect, rarity) VALUES (2, 'Moonleaf', 'mana restore', 'uncommon');
INSERT INTO herbs (id, name, effect, rarity) VALUES (3, 'Rootbark', 'poison cure', 'rare');
INSERT INTO herbs (id, name, effect, rarity) VALUES (4, 'Sunpetal', 'heal', 'common');
INSERT INTO herbs (id, name, effect, rarity) VALUES (5, 'Deep Root Vine', 'strength', 'uncommon');`,
    winCondition: { type: 'rows_returned', table: 'herbs', minRows: 3, description: 'Find the 3 herbs containing root in their name' },
    schemas: [
      { name: 'herbs', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'effect', type: 'TEXT', nullable: false }, { name: 'rarity', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 28,
    floor: 3,
    name: "The Void Spore",
    subtitle: "Find what has no name",
    description: "Some forest spores have no recorded name — they are NULL in the register. Find all spores where the name has not been recorded (is NULL).",
    sqlConcept: "IS NULL",
    conceptTag: "IS NULL",
    goal: "Find spores with no recorded name",
    targetTables: ["spores"],
    targetColumns: ["*"],
    hint1Concept: "NULL represents a missing or unknown value. You cannot compare NULL with = because NULL = NULL is itself NULL (not TRUE). Use IS NULL to check for missing values.",
    hint2Example: "SELECT * FROM items WHERE description IS NULL;",
    hint3Template: "SELECT * FROM spores WHERE name IS _____;",
    sqlHint: "SELECT * FROM spores WHERE name IS NULL;",
    sqlSeed: `CREATE TABLE spores (
  id INTEGER PRIMARY KEY,
  name TEXT,
  toxicity INTEGER,
  color TEXT
);
INSERT INTO spores (id, name, toxicity, color) VALUES (1, 'Glowspore', 2, 'blue');
INSERT INTO spores (id, name, toxicity, color) VALUES (2, NULL, 8, 'black');
INSERT INTO spores (id, name, toxicity, color) VALUES (3, 'Dustspore', 1, 'grey');
INSERT INTO spores (id, name, toxicity, color) VALUES (4, NULL, 5, 'red');
INSERT INTO spores (id, name, toxicity, color) VALUES (5, 'Moonspore', 3, 'white');`,
    winCondition: { type: 'rows_returned', table: 'spores', minRows: 2, description: 'Find the 2 unnamed spores' },
    schemas: [
      { name: 'spores', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: true }, { name: 'toxicity', type: 'INTEGER', nullable: false }, { name: 'color', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 29,
    floor: 3,
    name: "Named and Accounted",
    subtitle: "Reject the unknowns",
    description: "The forest census only counts creatures that have a recorded species. Find all creatures whose species is NOT NULL — the ones properly catalogued.",
    sqlConcept: "IS NOT NULL",
    conceptTag: "IS NOT NULL",
    goal: "Find creatures with a known species",
    targetTables: ["forest_census"],
    targetColumns: ["*"],
    hint1Concept: "IS NOT NULL returns rows where the column has an actual value (not missing). It is the complement of IS NULL.",
    hint2Example: "SELECT * FROM relics WHERE owner IS NOT NULL;",
    hint3Template: "SELECT * FROM forest_census WHERE species IS NOT _____;",
    sqlHint: "SELECT * FROM forest_census WHERE species IS NOT NULL;",
    sqlSeed: `CREATE TABLE forest_census (
  id INTEGER PRIMARY KEY,
  name TEXT,
  species TEXT,
  count INTEGER
);
INSERT INTO forest_census (id, name, species, count) VALUES (1, 'Group A', 'wolf', 5);
INSERT INTO forest_census (id, name, species, count) VALUES (2, 'Group B', NULL, 3);
INSERT INTO forest_census (id, name, species, count) VALUES (3, 'Group C', 'deer', 12);
INSERT INTO forest_census (id, name, species, count) VALUES (4, 'Group D', 'boar', 8);
INSERT INTO forest_census (id, name, species, count) VALUES (5, 'Group E', NULL, 2);`,
    winCondition: { type: 'rows_returned', table: 'forest_census', minRows: 3, description: 'Find the 3 catalogued creature groups' },
    schemas: [
      { name: 'forest_census', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'species', type: 'TEXT', nullable: true }, { name: 'count', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'forest'
  },
  {
    id: 30,
    floor: 3,
    name: "The Forest Oracle",
    subtitle: "Range, pattern, and null mastery",
    description: "The Forest Oracle asks you to find rare herbs: they must be of a known rarity (not NULL), cost between 10 and 50 gold, and have a name containing 'bloom'. Combine all you know.",
    sqlConcept: "BETWEEN + LIKE + IS NOT NULL combined",
    conceptTag: "Range & Pattern combined",
    goal: "Find bloom herbs with known rarity priced 10-50",
    targetTables: ["rare_herbs"],
    targetColumns: ["*"],
    hint1Concept: "Combine BETWEEN, LIKE, and IS NOT NULL using AND. Each condition narrows the result further. All three must be true for a row to pass.",
    hint2Example: "SELECT * FROM items WHERE price BETWEEN 10 AND 100 AND name LIKE '%sword%' AND owner IS NOT NULL;",
    hint3Template: "SELECT * FROM rare_herbs WHERE rarity IS NOT NULL AND price BETWEEN _____ AND _____ AND name LIKE '%______%';",
    sqlHint: "SELECT * FROM rare_herbs WHERE rarity IS NOT NULL AND price BETWEEN 10 AND 50 AND name LIKE '%bloom%';",
    sqlSeed: `CREATE TABLE rare_herbs (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price INTEGER,
  rarity TEXT
);
INSERT INTO rare_herbs (id, name, price, rarity) VALUES (1, 'Moonbloom', 25, 'uncommon');
INSERT INTO rare_herbs (id, name, price, rarity) VALUES (2, 'Firebloom', 45, 'rare');
INSERT INTO rare_herbs (id, name, price, rarity) VALUES (3, 'Ironbloom', 80, 'epic');
INSERT INTO rare_herbs (id, name, price, rarity) VALUES (4, 'Dustbloom', 15, NULL);
INSERT INTO rare_herbs (id, name, price, rarity) VALUES (5, 'Voidbloom', 30, 'rare');
INSERT INTO rare_herbs (id, name, price, rarity) VALUES (6, 'Stoneroot', 20, 'common');`,
    winCondition: { type: 'rows_returned', table: 'rare_herbs', minRows: 3, description: 'Find the 3 qualifying bloom herbs' },
    schemas: [
      { name: 'rare_herbs', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'price', type: 'INTEGER', nullable: false }, { name: 'rarity', type: 'TEXT', nullable: true } ] }
    ],
    bgTheme: 'forest'
  },

  // ============================================================
  // FLOOR 4 (Levels 31-40) — Sorting & Organizing
  // bgTheme: 'cave'
  // ============================================================
  {
    id: 31,
    floor: 4,
    name: "Rise of the Strong",
    subtitle: "Weakest to strongest",
    description: "The cave rankings post monsters from weakest to strongest. Use ORDER BY to sort monsters by attack in ascending order.",
    sqlConcept: "ORDER BY ASC",
    conceptTag: "ORDER BY ASC",
    goal: "Sort cave monsters by attack ascending",
    targetTables: ["cave_monsters"],
    targetColumns: ["*"],
    hint1Concept: "ORDER BY sorts your result rows. Without a direction, it defaults to ASC (ascending: smallest to largest, A to Z). Add ASC explicitly for clarity.",
    hint2Example: "SELECT * FROM items ORDER BY price ASC;",
    hint3Template: "SELECT * FROM cave_monsters ORDER BY attack _____;",
    sqlHint: "SELECT * FROM cave_monsters ORDER BY attack ASC;",
    sqlSeed: `CREATE TABLE cave_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  attack INTEGER,
  defense INTEGER
);
INSERT INTO cave_monsters (id, name, attack, defense) VALUES (1, 'Cave Bat', 5, 2);
INSERT INTO cave_monsters (id, name, attack, defense) VALUES (2, 'Rock Troll', 25, 15);
INSERT INTO cave_monsters (id, name, attack, defense) VALUES (3, 'Stone Golem', 40, 30);
INSERT INTO cave_monsters (id, name, attack, defense) VALUES (4, 'Tunnel Rat', 8, 4);
INSERT INTO cave_monsters (id, name, attack, defense) VALUES (5, 'Cave Drake', 35, 20);`,
    winCondition: { type: 'rows_returned', table: 'cave_monsters', minRows: 5, description: 'Return all 5 monsters sorted by attack ASC' },
    schemas: [
      { name: 'cave_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'attack', type: 'INTEGER', nullable: false }, { name: 'defense', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 32,
    floor: 4,
    name: "Fall of the Mighty",
    subtitle: "Strongest to weakest",
    description: "The cave warlord wants to see which treasures are most valuable first. Sort the treasures by value in descending order.",
    sqlConcept: "ORDER BY DESC",
    conceptTag: "ORDER BY DESC",
    goal: "Sort treasures by value descending",
    targetTables: ["treasures"],
    targetColumns: ["*"],
    hint1Concept: "DESC after a column name in ORDER BY reverses the sort to largest-first (or Z to A for text). It stands for descending.",
    hint2Example: "SELECT * FROM scores ORDER BY points DESC;",
    hint3Template: "SELECT * FROM treasures ORDER BY value _____;",
    sqlHint: "SELECT * FROM treasures ORDER BY value DESC;",
    sqlSeed: `CREATE TABLE treasures (
  id INTEGER PRIMARY KEY,
  name TEXT,
  value INTEGER,
  material TEXT
);
INSERT INTO treasures (id, name, value, material) VALUES (1, 'Copper Ring', 10, 'copper');
INSERT INTO treasures (id, name, value, material) VALUES (2, 'Gold Crown', 500, 'gold');
INSERT INTO treasures (id, name, value, material) VALUES (3, 'Silver Chalice', 150, 'silver');
INSERT INTO treasures (id, name, value, material) VALUES (4, 'Diamond Gem', 1000, 'diamond');
INSERT INTO treasures (id, name, value, material) VALUES (5, 'Bronze Coin', 5, 'bronze');`,
    winCondition: { type: 'rows_returned', table: 'treasures', minRows: 5, description: 'Return all 5 treasures sorted by value DESC' },
    schemas: [
      { name: 'treasures', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'value', type: 'INTEGER', nullable: false }, { name: 'material', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 33,
    floor: 4,
    name: "First Blood",
    subtitle: "Take only the top",
    description: "The cave arena only seats 3 challengers. Find the 3 strongest monsters by attack using LIMIT to restrict your result.",
    sqlConcept: "LIMIT",
    conceptTag: "LIMIT",
    goal: "Return the top 3 strongest monsters",
    targetTables: ["arena_monsters"],
    targetColumns: ["*"],
    hint1Concept: "LIMIT restricts the number of rows returned. Combine it with ORDER BY to get the top N or bottom N records reliably.",
    hint2Example: "SELECT * FROM leaders ORDER BY score DESC LIMIT 5;",
    hint3Template: "SELECT * FROM arena_monsters ORDER BY attack DESC LIMIT _____;",
    sqlHint: "SELECT * FROM arena_monsters ORDER BY attack DESC LIMIT 3;",
    sqlSeed: `CREATE TABLE arena_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  attack INTEGER,
  speed INTEGER
);
INSERT INTO arena_monsters (id, name, attack, speed) VALUES (1, 'Iron Crusher', 50, 10);
INSERT INTO arena_monsters (id, name, attack, speed) VALUES (2, 'Swift Fang', 30, 40);
INSERT INTO arena_monsters (id, name, attack, speed) VALUES (3, 'Stone Hulk', 70, 5);
INSERT INTO arena_monsters (id, name, attack, speed) VALUES (4, 'Cave Viper', 45, 35);
INSERT INTO arena_monsters (id, name, attack, speed) VALUES (5, 'Dire Wolf', 55, 25);
INSERT INTO arena_monsters (id, name, attack, speed) VALUES (6, 'Rock Creeper', 20, 15);`,
    winCondition: { type: 'rows_returned', table: 'arena_monsters', minRows: 3, description: 'Return exactly the top 3 monsters by attack' },
    schemas: [
      { name: 'arena_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'attack', type: 'INTEGER', nullable: false }, { name: 'speed', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 34,
    floor: 4,
    name: "Skip the Scouts",
    subtitle: "Offset your position",
    description: "Page 2 of the monster registry skips the first 3 entries and shows the next 3. Use LIMIT with OFFSET to paginate the results.",
    sqlConcept: "LIMIT with OFFSET",
    conceptTag: "OFFSET",
    goal: "Skip 3 monsters and return the next 3",
    targetTables: ["monster_registry"],
    targetColumns: ["*"],
    hint1Concept: "OFFSET tells the database how many rows to skip before starting to return results. Used with LIMIT, it enables pagination: skip the first N rows, then take M.",
    hint2Example: "SELECT * FROM items ORDER BY id LIMIT 5 OFFSET 10;",
    hint3Template: "SELECT * FROM monster_registry ORDER BY id LIMIT 3 OFFSET _____;",
    sqlHint: "SELECT * FROM monster_registry ORDER BY id LIMIT 3 OFFSET 3;",
    sqlSeed: `CREATE TABLE monster_registry (
  id INTEGER PRIMARY KEY,
  name TEXT,
  floor INTEGER
);
INSERT INTO monster_registry (id, name, floor) VALUES (1, 'Slime A', 1);
INSERT INTO monster_registry (id, name, floor) VALUES (2, 'Bat B', 1);
INSERT INTO monster_registry (id, name, floor) VALUES (3, 'Rat C', 2);
INSERT INTO monster_registry (id, name, floor) VALUES (4, 'Goblin D', 2);
INSERT INTO monster_registry (id, name, floor) VALUES (5, 'Orc E', 3);
INSERT INTO monster_registry (id, name, floor) VALUES (6, 'Troll F', 3);`,
    winCondition: { type: 'rows_returned', table: 'monster_registry', minRows: 3, description: 'Return rows 4-6 (skip first 3)' },
    schemas: [
      { name: 'monster_registry', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'floor', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 35,
    floor: 4,
    name: "Alphabetical Decree",
    subtitle: "A-to-Z dungeon order",
    description: "The cave librarian catalogues all spells in alphabetical order. Sort the spells table by name in ascending (A-Z) order.",
    sqlConcept: "ORDER BY text column ASC",
    conceptTag: "ORDER BY text",
    goal: "Return all spells sorted alphabetically by name",
    targetTables: ["spells"],
    targetColumns: ["*"],
    hint1Concept: "ORDER BY works on text columns too, sorting them alphabetically (A before Z for ASC). The sort is case-sensitive by default in SQLite unless a COLLATION is specified.",
    hint2Example: "SELECT * FROM heroes ORDER BY name ASC;",
    hint3Template: "SELECT * FROM spells ORDER BY _____ ASC;",
    sqlHint: "SELECT * FROM spells ORDER BY name ASC;",
    sqlSeed: `CREATE TABLE spells (
  id INTEGER PRIMARY KEY,
  name TEXT,
  mana_cost INTEGER,
  damage INTEGER
);
INSERT INTO spells (id, name, mana_cost, damage) VALUES (1, 'Zap', 10, 15);
INSERT INTO spells (id, name, mana_cost, damage) VALUES (2, 'Arcane Bolt', 20, 30);
INSERT INTO spells (id, name, mana_cost, damage) VALUES (3, 'Fireball', 30, 50);
INSERT INTO spells (id, name, mana_cost, damage) VALUES (4, 'Chain Lightning', 40, 60);
INSERT INTO spells (id, name, mana_cost, damage) VALUES (5, 'Blizzard', 50, 70);`,
    winCondition: { type: 'rows_returned', table: 'spells', minRows: 5, description: 'Return all 5 spells sorted by name A-Z' },
    schemas: [
      { name: 'spells', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'mana_cost', type: 'INTEGER', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 36,
    floor: 4,
    name: "Multi-Key Sorting",
    subtitle: "Primary and secondary order",
    description: "The cave roster sorts soldiers first by rank (descending) and then by name (ascending) for ties. Use two ORDER BY columns to achieve this.",
    sqlConcept: "ORDER BY multiple columns",
    conceptTag: "ORDER BY multi",
    goal: "Sort soldiers by rank DESC then name ASC",
    targetTables: ["cave_soldiers"],
    targetColumns: ["*"],
    hint1Concept: "You can ORDER BY multiple columns separated by commas. The first column is the primary sort key; the second column breaks ties among rows with equal primary values.",
    hint2Example: "SELECT * FROM animals ORDER BY species ASC, age DESC;",
    hint3Template: "SELECT * FROM cave_soldiers ORDER BY rank DESC, name _____;",
    sqlHint: "SELECT * FROM cave_soldiers ORDER BY rank DESC, name ASC;",
    sqlSeed: `CREATE TABLE cave_soldiers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  rank INTEGER,
  class TEXT
);
INSERT INTO cave_soldiers (id, name, rank, class) VALUES (1, 'Zane', 3, 'fighter');
INSERT INTO cave_soldiers (id, name, rank, class) VALUES (2, 'Alara', 3, 'ranger');
INSERT INTO cave_soldiers (id, name, rank, class) VALUES (3, 'Morn', 5, 'paladin');
INSERT INTO cave_soldiers (id, name, rank, class) VALUES (4, 'Beck', 1, 'rogue');
INSERT INTO cave_soldiers (id, name, rank, class) VALUES (5, 'Cilla', 5, 'mage');`,
    winCondition: { type: 'rows_returned', table: 'cave_soldiers', minRows: 5, description: 'Return all 5 soldiers in correct multi-sort order' },
    schemas: [
      { name: 'cave_soldiers', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'rank', type: 'INTEGER', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 37,
    floor: 4,
    name: "The Lone Champion",
    subtitle: "Find exactly one",
    description: "The cave championship crowns exactly one champion: the monster with the highest hp. Use ORDER BY DESC with LIMIT 1 to find them.",
    sqlConcept: "ORDER BY + LIMIT 1 for maximum",
    conceptTag: "LIMIT 1 max",
    goal: "Find the single monster with the highest hp",
    targetTables: ["champions"],
    targetColumns: ["*"],
    hint1Concept: "To find the single row with the highest or lowest value, sort by that column in the desired direction and limit the result to 1 row.",
    hint2Example: "SELECT * FROM scores ORDER BY total DESC LIMIT 1;",
    hint3Template: "SELECT * FROM champions ORDER BY hp DESC LIMIT _____;",
    sqlHint: "SELECT * FROM champions ORDER BY hp DESC LIMIT 1;",
    sqlSeed: `CREATE TABLE champions (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  title TEXT
);
INSERT INTO champions (id, name, hp, title) VALUES (1, 'Iron Bear', 180, 'Crusher');
INSERT INTO champions (id, name, hp, title) VALUES (2, 'Void Hawk', 220, 'Striker');
INSERT INTO champions (id, name, hp, title) VALUES (3, 'Stone Drake', 310, 'Titan');
INSERT INTO champions (id, name, hp, title) VALUES (4, 'Ash Wolf', 190, 'Hunter');`,
    winCondition: { type: 'rows_returned', table: 'champions', minRows: 1, description: 'Return exactly 1 champion (highest hp)' },
    schemas: [
      { name: 'champions', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'title', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 38,
    floor: 4,
    name: "Sort and Filter",
    subtitle: "WHERE before ORDER",
    description: "The cave quartermaster wants undead monsters sorted by threat level (high to low). Combine WHERE and ORDER BY to filter, then sort.",
    sqlConcept: "WHERE combined with ORDER BY",
    conceptTag: "WHERE + ORDER BY",
    goal: "Find undead monsters sorted by threat descending",
    targetTables: ["dungeon_roster"],
    targetColumns: ["*"],
    hint1Concept: "WHERE and ORDER BY work together: WHERE filters which rows are included, ORDER BY determines their presentation order. WHERE always comes before ORDER BY.",
    hint2Example: "SELECT * FROM items WHERE type = 'weapon' ORDER BY damage DESC;",
    hint3Template: "SELECT * FROM dungeon_roster WHERE category = '______' ORDER BY threat DESC;",
    sqlHint: "SELECT * FROM dungeon_roster WHERE category = 'undead' ORDER BY threat DESC;",
    sqlSeed: `CREATE TABLE dungeon_roster (
  id INTEGER PRIMARY KEY,
  name TEXT,
  category TEXT,
  threat INTEGER
);
INSERT INTO dungeon_roster (id, name, category, threat) VALUES (1, 'Zombie', 'undead', 3);
INSERT INTO dungeon_roster (id, name, category, threat) VALUES (2, 'Goblin', 'humanoid', 5);
INSERT INTO dungeon_roster (id, name, category, threat) VALUES (3, 'Lich', 'undead', 9);
INSERT INTO dungeon_roster (id, name, category, threat) VALUES (4, 'Vampire', 'undead', 7);
INSERT INTO dungeon_roster (id, name, category, threat) VALUES (5, 'Ogre', 'humanoid', 6);`,
    winCondition: { type: 'rows_returned', table: 'dungeon_roster', minRows: 3, description: 'Return 3 undead monsters sorted by threat DESC' },
    schemas: [
      { name: 'dungeon_roster', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'category', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 39,
    floor: 4,
    name: "The Middle Ground",
    subtitle: "Skip, take, sort",
    description: "The cave inspector reviews the second page of 2 items from the potions list sorted by name. Apply LIMIT 2 OFFSET 2 with an alphabetical sort.",
    sqlConcept: "ORDER BY + LIMIT + OFFSET together",
    conceptTag: "ORDER LIMIT OFFSET",
    goal: "Return potions 3-4 alphabetically",
    targetTables: ["cave_potions"],
    targetColumns: ["*"],
    hint1Concept: "Combining ORDER BY, LIMIT, and OFFSET lets you retrieve any page of sorted results. The order of clauses is: ORDER BY, then LIMIT, then OFFSET.",
    hint2Example: "SELECT * FROM heroes ORDER BY name ASC LIMIT 2 OFFSET 4;",
    hint3Template: "SELECT * FROM cave_potions ORDER BY name ASC LIMIT 2 OFFSET _____;",
    sqlHint: "SELECT * FROM cave_potions ORDER BY name ASC LIMIT 2 OFFSET 2;",
    sqlSeed: `CREATE TABLE cave_potions (
  id INTEGER PRIMARY KEY,
  name TEXT,
  effect TEXT,
  potency INTEGER
);
INSERT INTO cave_potions (id, name, effect, potency) VALUES (1, 'Amber Flask', 'poison', 4);
INSERT INTO cave_potions (id, name, effect, potency) VALUES (2, 'Blue Vial', 'mana', 6);
INSERT INTO cave_potions (id, name, effect, potency) VALUES (3, 'Crimson Brew', 'heal', 8);
INSERT INTO cave_potions (id, name, effect, potency) VALUES (4, 'Dark Draught', 'stealth', 5);
INSERT INTO cave_potions (id, name, effect, potency) VALUES (5, 'Emerald Elixir', 'strength', 7);`,
    winCondition: { type: 'rows_returned', table: 'cave_potions', minRows: 2, description: 'Return potions 3-4 alphabetically' },
    schemas: [
      { name: 'cave_potions', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'effect', type: 'TEXT', nullable: false }, { name: 'potency', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },
  {
    id: 40,
    floor: 4,
    name: "The Cave Throne",
    subtitle: "Master of order",
    description: "The cave throne room record demands the top 3 richest beast types (not undead) ordered by gold_hoard descending. Chain WHERE, ORDER BY, and LIMIT for the final test.",
    sqlConcept: "WHERE + ORDER BY + LIMIT mastery",
    conceptTag: "Sorting mastery",
    goal: "Find top 3 non-undead beasts by gold_hoard descending",
    targetTables: ["cave_beasts"],
    targetColumns: ["*"],
    hint1Concept: "Put it all together: filter with WHERE, sort the filtered results with ORDER BY, and restrict to the top N with LIMIT. The order of these clauses in SQL is fixed: WHERE, then ORDER BY, then LIMIT.",
    hint2Example: "SELECT * FROM heroes WHERE alive = 1 ORDER BY gold DESC LIMIT 3;",
    hint3Template: "SELECT * FROM cave_beasts WHERE type != '______' ORDER BY gold_hoard DESC LIMIT _____;",
    sqlHint: "SELECT * FROM cave_beasts WHERE type != 'undead' ORDER BY gold_hoard DESC LIMIT 3;",
    sqlSeed: `CREATE TABLE cave_beasts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  gold_hoard INTEGER
);
INSERT INTO cave_beasts (id, name, type, gold_hoard) VALUES (1, 'Dragon', 'beast', 5000);
INSERT INTO cave_beasts (id, name, type, gold_hoard) VALUES (2, 'Lich King', 'undead', 8000);
INSERT INTO cave_beasts (id, name, type, gold_hoard) VALUES (3, 'Cave Wyrm', 'beast', 3000);
INSERT INTO cave_beasts (id, name, type, gold_hoard) VALUES (4, 'Death Knight', 'undead', 4500);
INSERT INTO cave_beasts (id, name, type, gold_hoard) VALUES (5, 'Fire Salamander', 'beast', 2000);
INSERT INTO cave_beasts (id, name, type, gold_hoard) VALUES (6, 'Stone Giant', 'giant', 3500);`,
    winCondition: { type: 'rows_returned', table: 'cave_beasts', minRows: 3, description: 'Return top 3 non-undead beasts by gold_hoard' },
    schemas: [
      { name: 'cave_beasts', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'gold_hoard', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'cave'
  },

  // ============================================================
  // FLOOR 5 (Levels 41-50) — Battle Math
  // bgTheme: 'tower'
  // ============================================================
  {
    id: 41,
    floor: 5,
    name: "The Body Count",
    subtitle: "How many have fallen?",
    description: "The tower general needs to know the total number of enemies in the battlefield. Use COUNT(*) to count all rows.",
    sqlConcept: "COUNT(*)",
    conceptTag: "COUNT",
    goal: "Count all enemies on the battlefield",
    targetTables: ["battlefield"],
    targetColumns: ["*"],
    hint1Concept: "COUNT(*) returns the total number of rows in the result. It counts every row, including those with NULL values in some columns.",
    hint2Example: "SELECT COUNT(*) FROM inventory;",
    hint3Template: "SELECT COUNT(*) FROM _____;",
    sqlHint: "SELECT COUNT(*) AS total_enemies FROM battlefield;",
    sqlSeed: `CREATE TABLE battlefield (
  id INTEGER PRIMARY KEY,
  name TEXT,
  faction TEXT,
  hp INTEGER
);
INSERT INTO battlefield (id, name, faction, hp) VALUES (1, 'Orc A', 'dark', 50);
INSERT INTO battlefield (id, name, faction, hp) VALUES (2, 'Orc B', 'dark', 45);
INSERT INTO battlefield (id, name, faction, hp) VALUES (3, 'Goblin C', 'dark', 20);
INSERT INTO battlefield (id, name, faction, hp) VALUES (4, 'Troll D', 'dark', 100);
INSERT INTO battlefield (id, name, faction, hp) VALUES (5, 'Goblin E', 'dark', 25);`,
    winCondition: { type: 'rows_returned', table: 'battlefield', minRows: 1, description: 'Return a count of all 5 battlefield enemies' },
    schemas: [
      { name: 'battlefield', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'faction', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 42,
    floor: 5,
    name: "Gold Vault Total",
    subtitle: "Sum the riches",
    description: "The tower treasurer needs the total gold across all chests in the vault. Use SUM to add up all the gold values.",
    sqlConcept: "SUM aggregate function",
    conceptTag: "SUM",
    goal: "Calculate total gold in all treasure chests",
    targetTables: ["treasure_chests"],
    targetColumns: ["gold"],
    hint1Concept: "SUM adds up all values in a numeric column, ignoring NULL values. It returns a single row with the total.",
    hint2Example: "SELECT SUM(damage) FROM attacks;",
    hint3Template: "SELECT SUM(_____) AS total_gold FROM treasure_chests;",
    sqlHint: "SELECT SUM(gold) AS total_gold FROM treasure_chests;",
    sqlSeed: `CREATE TABLE treasure_chests (
  id INTEGER PRIMARY KEY,
  location TEXT,
  gold INTEGER,
  is_trapped INTEGER
);
INSERT INTO treasure_chests (id, location, gold, is_trapped) VALUES (1, 'north room', 200, 0);
INSERT INTO treasure_chests (id, location, gold, is_trapped) VALUES (2, 'east corridor', 150, 1);
INSERT INTO treasure_chests (id, location, gold, is_trapped) VALUES (3, 'throne room', 500, 0);
INSERT INTO treasure_chests (id, location, gold, is_trapped) VALUES (4, 'basement', 75, 0);`,
    winCondition: { type: 'rows_returned', table: 'treasure_chests', minRows: 1, description: 'Return the total gold sum' },
    schemas: [
      { name: 'treasure_chests', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'location', type: 'TEXT', nullable: false }, { name: 'gold', type: 'INTEGER', nullable: false }, { name: 'is_trapped', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 43,
    floor: 5,
    name: "The Average Threat",
    subtitle: "Find the middle ground",
    description: "The tower strategist wants to know the average threat level of all dungeon beasts so she can calibrate the defense. Use AVG to compute it.",
    sqlConcept: "AVG aggregate function",
    conceptTag: "AVG",
    goal: "Calculate the average threat level of all beasts",
    targetTables: ["dungeon_beasts"],
    targetColumns: ["threat_level"],
    hint1Concept: "AVG calculates the arithmetic mean of a numeric column, ignoring NULLs. The result may be a decimal even if all input values are integers.",
    hint2Example: "SELECT AVG(age) FROM dragons;",
    hint3Template: "SELECT AVG(_____) AS avg_threat FROM dungeon_beasts;",
    sqlHint: "SELECT AVG(threat_level) AS avg_threat FROM dungeon_beasts;",
    sqlSeed: `CREATE TABLE dungeon_beasts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  threat_level INTEGER,
  type TEXT
);
INSERT INTO dungeon_beasts (id, name, threat_level, type) VALUES (1, 'Slime', 2, 'ooze');
INSERT INTO dungeon_beasts (id, name, threat_level, type) VALUES (2, 'Goblin', 4, 'humanoid');
INSERT INTO dungeon_beasts (id, name, threat_level, type) VALUES (3, 'Troll', 7, 'giant');
INSERT INTO dungeon_beasts (id, name, threat_level, type) VALUES (4, 'Dragon', 10, 'beast');
INSERT INTO dungeon_beasts (id, name, threat_level, type) VALUES (5, 'Wraith', 8, 'undead');`,
    winCondition: { type: 'rows_returned', table: 'dungeon_beasts', minRows: 1, description: 'Return the average threat level' },
    schemas: [
      { name: 'dungeon_beasts', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'threat_level', type: 'INTEGER', nullable: false }, { name: 'type', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 44,
    floor: 5,
    name: "The Weakest Link",
    subtitle: "Find the minimum",
    description: "The tower healer needs to treat the most injured hero first — the one with the lowest hp. Use MIN to find the minimum hp value.",
    sqlConcept: "MIN aggregate function",
    conceptTag: "MIN",
    goal: "Find the minimum hp among all tower heroes",
    targetTables: ["tower_heroes"],
    targetColumns: ["hp"],
    hint1Concept: "MIN returns the smallest value in a numeric (or text) column, ignoring NULLs. It tells you the bottom of the range.",
    hint2Example: "SELECT MIN(price) FROM market_items;",
    hint3Template: "SELECT MIN(_____) AS lowest_hp FROM tower_heroes;",
    sqlHint: "SELECT MIN(hp) AS lowest_hp FROM tower_heroes;",
    sqlSeed: `CREATE TABLE tower_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  mana INTEGER
);
INSERT INTO tower_heroes (id, name, hp, mana) VALUES (1, 'Aldric', 85, 40);
INSERT INTO tower_heroes (id, name, hp, mana) VALUES (2, 'Sera', 12, 90);
INSERT INTO tower_heroes (id, name, hp, mana) VALUES (3, 'Bryn', 55, 60);
INSERT INTO tower_heroes (id, name, hp, mana) VALUES (4, 'Lyra', 70, 80);`,
    winCondition: { type: 'rows_returned', table: 'tower_heroes', minRows: 1, description: 'Return the minimum hp value' },
    schemas: [
      { name: 'tower_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'mana', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 45,
    floor: 5,
    name: "The Mightiest Peak",
    subtitle: "Find the maximum",
    description: "The tower archivist records the most powerful spell ever cast. Use MAX to find the highest damage value in the spellbook.",
    sqlConcept: "MAX aggregate function",
    conceptTag: "MAX",
    goal: "Find the maximum damage in the spellbook",
    targetTables: ["spellbook"],
    targetColumns: ["damage"],
    hint1Concept: "MAX returns the largest value in a column, ignoring NULLs. Use it to find the top value without sorting and limiting.",
    hint2Example: "SELECT MAX(level) FROM characters;",
    hint3Template: "SELECT MAX(_____) AS highest_damage FROM spellbook;",
    sqlHint: "SELECT MAX(damage) AS highest_damage FROM spellbook;",
    sqlSeed: `CREATE TABLE spellbook (
  id INTEGER PRIMARY KEY,
  name TEXT,
  damage INTEGER,
  mana_cost INTEGER
);
INSERT INTO spellbook (id, name, damage, mana_cost) VALUES (1, 'Magic Missile', 15, 5);
INSERT INTO spellbook (id, name, damage, mana_cost) VALUES (2, 'Fireball', 50, 20);
INSERT INTO spellbook (id, name, damage, mana_cost) VALUES (3, 'Chain Lightning', 70, 35);
INSERT INTO spellbook (id, name, damage, mana_cost) VALUES (4, 'Meteor Strike', 120, 60);
INSERT INTO spellbook (id, name, damage, mana_cost) VALUES (5, 'Frostbolt', 30, 15);`,
    winCondition: { type: 'rows_returned', table: 'spellbook', minRows: 1, description: 'Return the maximum damage value' },
    schemas: [
      { name: 'spellbook', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false }, { name: 'mana_cost', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 46,
    floor: 5,
    name: "The Four Pillars",
    subtitle: "All aggregates at once",
    description: "The tower statistician needs a full report on monster hp: count, sum, average, minimum, and maximum — all in one query.",
    sqlConcept: "Multiple aggregate functions in one SELECT",
    conceptTag: "Multi-aggregate",
    goal: "Return COUNT, SUM, AVG, MIN, MAX of monster hp in one row",
    targetTables: ["tower_monsters"],
    targetColumns: ["hp"],
    hint1Concept: "You can include multiple aggregate functions in the same SELECT clause. Each becomes its own column in a single-row result.",
    hint2Example: "SELECT COUNT(*), SUM(gold), AVG(gold) FROM chests;",
    hint3Template: "SELECT COUNT(*), SUM(hp), AVG(hp), MIN(hp), MAX(hp) FROM _____;",
    sqlHint: "SELECT COUNT(*) AS total, SUM(hp) AS sum_hp, AVG(hp) AS avg_hp, MIN(hp) AS min_hp, MAX(hp) AS max_hp FROM tower_monsters;",
    sqlSeed: `CREATE TABLE tower_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  floor INTEGER
);
INSERT INTO tower_monsters (id, name, hp, floor) VALUES (1, 'Sentinel', 100, 5);
INSERT INTO tower_monsters (id, name, hp, floor) VALUES (2, 'Flame Djinn', 80, 5);
INSERT INTO tower_monsters (id, name, hp, floor) VALUES (3, 'Storm Elemental', 120, 5);
INSERT INTO tower_monsters (id, name, hp, floor) VALUES (4, 'Shadow Mage', 60, 5);`,
    winCondition: { type: 'rows_returned', table: 'tower_monsters', minRows: 1, description: 'Return a single stats row with all 5 aggregates' },
    schemas: [
      { name: 'tower_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'floor', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 47,
    floor: 5,
    name: "Conditional Count",
    subtitle: "Count only the worthy",
    description: "The tower only records elite monsters: those with hp above 50. Count how many meet that threshold using COUNT with a WHERE clause.",
    sqlConcept: "COUNT with WHERE filter",
    conceptTag: "COUNT WHERE",
    goal: "Count monsters with hp above 50",
    targetTables: ["elite_monsters"],
    targetColumns: ["hp"],
    hint1Concept: "Combining COUNT(*) with a WHERE clause counts only the rows that match the filter. The WHERE clause is applied before the aggregation.",
    hint2Example: "SELECT COUNT(*) FROM heroes WHERE alive = 1;",
    hint3Template: "SELECT COUNT(*) AS elite_count FROM elite_monsters WHERE hp > _____;",
    sqlHint: "SELECT COUNT(*) AS elite_count FROM elite_monsters WHERE hp > 50;",
    sqlSeed: `CREATE TABLE elite_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  type TEXT
);
INSERT INTO elite_monsters (id, name, hp, type) VALUES (1, 'Bone Lord', 80, 'undead');
INSERT INTO elite_monsters (id, name, hp, type) VALUES (2, 'Goblin Runt', 20, 'humanoid');
INSERT INTO elite_monsters (id, name, hp, type) VALUES (3, 'Fire Drake', 150, 'beast');
INSERT INTO elite_monsters (id, name, hp, type) VALUES (4, 'Dust Moth', 15, 'beast');
INSERT INTO elite_monsters (id, name, hp, type) VALUES (5, 'Death Knight', 200, 'undead');
INSERT INTO elite_monsters (id, name, hp, type) VALUES (6, 'Cave Imp', 30, 'demon');`,
    winCondition: { type: 'rows_returned', table: 'elite_monsters', minRows: 1, description: 'Return the count of elite monsters (hp > 50)' },
    schemas: [
      { name: 'elite_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'type', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 48,
    floor: 5,
    name: "Distinct Souls",
    subtitle: "Count unique values",
    description: "The tower registry tracks how many unique spell schools are used by its mages. Use COUNT(DISTINCT column) to count only unique values.",
    sqlConcept: "COUNT(DISTINCT column)",
    conceptTag: "COUNT DISTINCT",
    goal: "Count unique spell schools in the mage registry",
    targetTables: ["mage_registry"],
    targetColumns: ["spell_school"],
    hint1Concept: "COUNT(DISTINCT column) counts only unique non-NULL values in the column. Duplicates are counted once.",
    hint2Example: "SELECT COUNT(DISTINCT category) FROM items;",
    hint3Template: "SELECT COUNT(DISTINCT _____) AS unique_schools FROM mage_registry;",
    sqlHint: "SELECT COUNT(DISTINCT spell_school) AS unique_schools FROM mage_registry;",
    sqlSeed: `CREATE TABLE mage_registry (
  id INTEGER PRIMARY KEY,
  name TEXT,
  spell_school TEXT,
  level INTEGER
);
INSERT INTO mage_registry (id, name, spell_school, level) VALUES (1, 'Zora', 'fire', 5);
INSERT INTO mage_registry (id, name, spell_school, level) VALUES (2, 'Myrn', 'ice', 3);
INSERT INTO mage_registry (id, name, spell_school, level) VALUES (3, 'Elara', 'fire', 7);
INSERT INTO mage_registry (id, name, spell_school, level) VALUES (4, 'Sable', 'shadow', 4);
INSERT INTO mage_registry (id, name, spell_school, level) VALUES (5, 'Bryn', 'ice', 6);
INSERT INTO mage_registry (id, name, spell_school, level) VALUES (6, 'Rook', 'lightning', 2);`,
    winCondition: { type: 'rows_returned', table: 'mage_registry', minRows: 1, description: 'Return the count of unique spell schools' },
    schemas: [
      { name: 'mage_registry', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'spell_school', type: 'TEXT', nullable: false }, { name: 'level', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 49,
    floor: 5,
    name: "Conditional Sum",
    subtitle: "Total only the active",
    description: "The tower quartermaster tallies gold only from active trade routes (status = 'active'). Use SUM with a WHERE clause to get the conditional total.",
    sqlConcept: "SUM with WHERE filter",
    conceptTag: "SUM WHERE",
    goal: "Sum gold from active trade routes only",
    targetTables: ["trade_routes"],
    targetColumns: ["gold"],
    hint1Concept: "SUM with WHERE filters the rows first, then sums only the matching ones. The WHERE clause is processed before any aggregation.",
    hint2Example: "SELECT SUM(value) FROM loot WHERE collected = 1;",
    hint3Template: "SELECT SUM(gold) AS active_gold FROM trade_routes WHERE status = '______';",
    sqlHint: "SELECT SUM(gold) AS active_gold FROM trade_routes WHERE status = 'active';",
    sqlSeed: `CREATE TABLE trade_routes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  gold INTEGER,
  status TEXT
);
INSERT INTO trade_routes (id, name, gold, status) VALUES (1, 'Northern Pass', 300, 'active');
INSERT INTO trade_routes (id, name, gold, status) VALUES (2, 'Eastern Road', 200, 'blocked');
INSERT INTO trade_routes (id, name, gold, status) VALUES (3, 'Southern Sea', 500, 'active');
INSERT INTO trade_routes (id, name, gold, status) VALUES (4, 'Western Trail', 150, 'inactive');
INSERT INTO trade_routes (id, name, gold, status) VALUES (5, 'Central Hub', 400, 'active');`,
    winCondition: { type: 'rows_returned', table: 'trade_routes', minRows: 1, description: 'Return sum of gold from active routes' },
    schemas: [
      { name: 'trade_routes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'gold', type: 'INTEGER', nullable: false }, { name: 'status', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  {
    id: 50,
    floor: 5,
    name: "The Counting Curse",
    subtitle: "Count monsters by type",
    description: "The tower archmage places a counting curse: she needs to know how many monsters exist for each type. Use COUNT with GROUP BY to count per type.",
    sqlConcept: "COUNT + GROUP BY",
    conceptTag: "COUNT + GROUP BY",
    goal: "Count monsters grouped by type",
    targetTables: ["monsters"],
    targetColumns: ["type"],
    hint1Concept: "GROUP BY divides rows into groups based on a column's value. When combined with COUNT, you get a count per group rather than a single total.",
    hint2Example: "SELECT category, COUNT(*) AS total FROM items GROUP BY category;",
    hint3Template: "SELECT type, COUNT(*) AS total FROM monsters GROUP BY _____;",
    sqlHint: "SELECT type, COUNT(*) AS total FROM monsters GROUP BY type;",
    sqlSeed: `CREATE TABLE monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  hp INTEGER
);
INSERT INTO monsters (id, name, type, hp) VALUES (1, 'Goblin', 'humanoid', 20);
INSERT INTO monsters (id, name, type, hp) VALUES (2, 'Zombie', 'undead', 30);
INSERT INTO monsters (id, name, type, hp) VALUES (3, 'Hobgoblin', 'humanoid', 35);
INSERT INTO monsters (id, name, type, hp) VALUES (4, 'Skeleton', 'undead', 25);
INSERT INTO monsters (id, name, type, hp) VALUES (5, 'Cave Bat', 'beast', 15);
INSERT INTO monsters (id, name, type, hp) VALUES (6, 'Cave Bear', 'beast', 80);
INSERT INTO monsters (id, name, type, hp) VALUES (7, 'Lich', 'undead', 200);`,
    winCondition: { type: 'rows_returned', table: 'monsters', minRows: 3, description: 'Return count per monster type (3 unique types)' },
    schemas: [
      { name: 'monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'tower'
  },
  // ============================================================
  // FLOOR 6 (Levels 51-60) — Grouping: GROUP BY, HAVING
  // bgTheme: 'crypt'
  // ============================================================
  {
    id: 51,
    floor: 6,
    name: "Crypt Census",
    subtitle: "Gather the undead by lair",
    description: "The crypt keeper catalogues undead by their lair. Use GROUP BY to count how many undead reside in each lair.",
    sqlConcept: "GROUP BY with COUNT",
    conceptTag: "GROUP BY",
    goal: "Count undead per lair",
    targetTables: ["undead"],
    targetColumns: ["lair"],
    hint1Concept: "GROUP BY collapses rows with the same value into a single group. Aggregate functions like COUNT then apply to each group separately.",
    hint2Example: "SELECT region, COUNT(*) FROM troops GROUP BY region;",
    hint3Template: "SELECT lair, COUNT(*) AS count FROM undead GROUP BY _____;",
    sqlHint: "SELECT lair, COUNT(*) AS count FROM undead GROUP BY lair;",
    sqlSeed: `CREATE TABLE undead (
  id INTEGER PRIMARY KEY,
  name TEXT,
  lair TEXT,
  threat INTEGER
);
INSERT INTO undead (id, name, lair, threat) VALUES (1, 'Zombie', 'north crypt', 3);
INSERT INTO undead (id, name, lair, threat) VALUES (2, 'Skeleton', 'north crypt', 2);
INSERT INTO undead (id, name, lair, threat) VALUES (3, 'Wraith', 'east tomb', 7);
INSERT INTO undead (id, name, lair, threat) VALUES (4, 'Ghoul', 'east tomb', 5);
INSERT INTO undead (id, name, lair, threat) VALUES (5, 'Specter', 'north crypt', 6);
INSERT INTO undead (id, name, lair, threat) VALUES (6, 'Bone Golem', 'west vault', 8);`,
    winCondition: { type: 'rows_returned', table: 'undead', minRows: 3, description: 'Return counts for all 3 lairs' },
    schemas: [
      { name: 'undead', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'lair', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 52,
    floor: 6,
    name: "Crypt Gold Ledger",
    subtitle: "Total loot per zone",
    description: "The crypt accountant needs the total gold stashed in each zone. Use GROUP BY zone with SUM(gold) to tally each area's wealth.",
    sqlConcept: "GROUP BY with SUM",
    conceptTag: "GROUP BY SUM",
    goal: "Total gold per zone in the crypt",
    targetTables: ["crypt_loot"],
    targetColumns: ["zone", "gold"],
    hint1Concept: "Any aggregate function (SUM, AVG, MAX, MIN) works with GROUP BY. Each group gets its own aggregated value.",
    hint2Example: "SELECT department, SUM(salary) FROM employees GROUP BY department;",
    hint3Template: "SELECT zone, SUM(gold) AS total_gold FROM crypt_loot GROUP BY _____;",
    sqlHint: "SELECT zone, SUM(gold) AS total_gold FROM crypt_loot GROUP BY zone;",
    sqlSeed: `CREATE TABLE crypt_loot (
  id INTEGER PRIMARY KEY,
  item TEXT,
  gold INTEGER,
  zone TEXT
);
INSERT INTO crypt_loot (id, item, gold, zone) VALUES (1, 'Old Coin', 10, 'antechamber');
INSERT INTO crypt_loot (id, item, gold, zone) VALUES (2, 'Jeweled Skull', 200, 'inner sanctum');
INSERT INTO crypt_loot (id, item, gold, zone) VALUES (3, 'Silver Ring', 50, 'antechamber');
INSERT INTO crypt_loot (id, item, gold, zone) VALUES (4, 'Gold Scepter', 400, 'inner sanctum');
INSERT INTO crypt_loot (id, item, gold, zone) VALUES (5, 'Bone Relic', 75, 'catacombs');
INSERT INTO crypt_loot (id, item, gold, zone) VALUES (6, 'Dust Gem', 25, 'catacombs');`,
    winCondition: { type: 'rows_returned', table: 'crypt_loot', minRows: 3, description: 'Return total gold for all 3 zones' },
    schemas: [
      { name: 'crypt_loot', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'item', type: 'TEXT', nullable: false }, { name: 'gold', type: 'INTEGER', nullable: false }, { name: 'zone', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 53,
    floor: 6,
    name: "Average Threat by Type",
    subtitle: "Mean menace per breed",
    description: "The crypt warden needs the average threat level per monster type to plan guard rotations. Use GROUP BY with AVG.",
    sqlConcept: "GROUP BY with AVG",
    conceptTag: "GROUP BY AVG",
    goal: "Calculate average threat level per monster type",
    targetTables: ["crypt_monsters"],
    targetColumns: ["type", "threat"],
    hint1Concept: "GROUP BY with AVG computes the mean of a column within each group. Each unique value in the GROUP BY column becomes its own row in the result.",
    hint2Example: "SELECT class, AVG(level) FROM players GROUP BY class;",
    hint3Template: "SELECT type, AVG(threat) AS avg_threat FROM crypt_monsters GROUP BY _____;",
    sqlHint: "SELECT type, AVG(threat) AS avg_threat FROM crypt_monsters GROUP BY type;",
    sqlSeed: `CREATE TABLE crypt_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  threat INTEGER
);
INSERT INTO crypt_monsters (id, name, type, threat) VALUES (1, 'Zombie Grunt', 'undead', 3);
INSERT INTO crypt_monsters (id, name, type, threat) VALUES (2, 'Skeleton Archer', 'undead', 5);
INSERT INTO crypt_monsters (id, name, type, threat) VALUES (3, 'Crypt Bat', 'beast', 2);
INSERT INTO crypt_monsters (id, name, type, threat) VALUES (4, 'Shadow Wraith', 'spirit', 8);
INSERT INTO crypt_monsters (id, name, type, threat) VALUES (5, 'Dire Rat', 'beast', 4);
INSERT INTO crypt_monsters (id, name, type, threat) VALUES (6, 'Banshee', 'spirit', 9);`,
    winCondition: { type: 'rows_returned', table: 'crypt_monsters', minRows: 3, description: 'Return average threat for all 3 types' },
    schemas: [
      { name: 'crypt_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 54,
    floor: 6,
    name: "HAVING a Nightmare",
    subtitle: "Filter the groups",
    description: "The crypt overseer only cares about lair clusters with more than 2 residents. Use HAVING to filter groups after aggregation.",
    sqlConcept: "HAVING clause",
    conceptTag: "HAVING",
    goal: "Find lairs with more than 2 undead residents",
    targetTables: ["crypt_residents"],
    targetColumns: ["lair"],
    hint1Concept: "HAVING filters groups after GROUP BY aggregation, unlike WHERE which filters rows before grouping. Use HAVING when your condition involves an aggregate function.",
    hint2Example: "SELECT team, COUNT(*) FROM players GROUP BY team HAVING COUNT(*) > 5;",
    hint3Template: "SELECT lair, COUNT(*) AS residents FROM crypt_residents GROUP BY lair HAVING COUNT(*) > _____;",
    sqlHint: "SELECT lair, COUNT(*) AS residents FROM crypt_residents GROUP BY lair HAVING COUNT(*) > 2;",
    sqlSeed: `CREATE TABLE crypt_residents (
  id INTEGER PRIMARY KEY,
  name TEXT,
  lair TEXT
);
INSERT INTO crypt_residents (id, name, lair) VALUES (1, 'Zombie 1', 'north crypt');
INSERT INTO crypt_residents (id, name, lair) VALUES (2, 'Skeleton 1', 'north crypt');
INSERT INTO crypt_residents (id, name, lair) VALUES (3, 'Wraith 1', 'east tomb');
INSERT INTO crypt_residents (id, name, lair) VALUES (4, 'Ghoul 1', 'north crypt');
INSERT INTO crypt_residents (id, name, lair) VALUES (5, 'Specter 1', 'east tomb');
INSERT INTO crypt_residents (id, name, lair) VALUES (6, 'Ghoul 2', 'west vault');`,
    winCondition: { type: 'rows_returned', table: 'crypt_residents', minRows: 1, description: 'Return lairs with more than 2 residents' },
    schemas: [
      { name: 'crypt_residents', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'lair', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 55,
    floor: 6,
    name: "High-Value Clusters",
    subtitle: "Wealthy zones only",
    description: "The treasure guild only registers zones whose total gold exceeds 200. Use GROUP BY with SUM and HAVING to find them.",
    sqlConcept: "HAVING with SUM",
    conceptTag: "HAVING SUM",
    goal: "Find zones with total gold above 200",
    targetTables: ["vault_zones"],
    targetColumns: ["zone", "gold"],
    hint1Concept: "HAVING can filter on any aggregate: HAVING SUM(column) > value will only show groups where the sum exceeds your threshold.",
    hint2Example: "SELECT region, SUM(income) FROM merchants GROUP BY region HAVING SUM(income) > 1000;",
    hint3Template: "SELECT zone, SUM(gold) AS total FROM vault_zones GROUP BY zone HAVING SUM(gold) > _____;",
    sqlHint: "SELECT zone, SUM(gold) AS total FROM vault_zones GROUP BY zone HAVING SUM(gold) > 200;",
    sqlSeed: `CREATE TABLE vault_zones (
  id INTEGER PRIMARY KEY,
  item TEXT,
  gold INTEGER,
  zone TEXT
);
INSERT INTO vault_zones (id, item, gold, zone) VALUES (1, 'Coin Pile', 50, 'antechamber');
INSERT INTO vault_zones (id, item, gold, zone) VALUES (2, 'Ruby', 300, 'inner vault');
INSERT INTO vault_zones (id, item, gold, zone) VALUES (3, 'Gem', 100, 'antechamber');
INSERT INTO vault_zones (id, item, gold, zone) VALUES (4, 'Crown', 500, 'inner vault');
INSERT INTO vault_zones (id, item, gold, zone) VALUES (5, 'Bronze Coin', 30, 'entry hall');
INSERT INTO vault_zones (id, item, gold, zone) VALUES (6, 'Old Ring', 20, 'entry hall');`,
    winCondition: { type: 'rows_returned', table: 'vault_zones', minRows: 1, description: 'Return zones whose total gold exceeds 200' },
    schemas: [
      { name: 'vault_zones', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'item', type: 'TEXT', nullable: false }, { name: 'gold', type: 'INTEGER', nullable: false }, { name: 'zone', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 56,
    floor: 6,
    name: "Where Before Having",
    subtitle: "Filter, group, then filter again",
    description: "Count active undead per lair, but only count those with threat above 3, and only show lairs with 2 or more such undead. Chain WHERE and HAVING.",
    sqlConcept: "WHERE + GROUP BY + HAVING combined",
    conceptTag: "WHERE HAVING",
    goal: "Count high-threat undead per lair, filter lairs with 2+",
    targetTables: ["crypt_guard"],
    targetColumns: ["lair", "threat"],
    hint1Concept: "WHERE filters rows before grouping. HAVING filters groups after aggregation. You can use both: WHERE reduces the data first, then GROUP BY groups what remains, then HAVING filters those groups.",
    hint2Example: "SELECT dept, COUNT(*) FROM staff WHERE active = 1 GROUP BY dept HAVING COUNT(*) >= 3;",
    hint3Template: "SELECT lair, COUNT(*) AS count FROM crypt_guard WHERE threat > 3 GROUP BY lair HAVING COUNT(*) >= _____;",
    sqlHint: "SELECT lair, COUNT(*) AS count FROM crypt_guard WHERE threat > 3 GROUP BY lair HAVING COUNT(*) >= 2;",
    sqlSeed: `CREATE TABLE crypt_guard (
  id INTEGER PRIMARY KEY,
  name TEXT,
  lair TEXT,
  threat INTEGER
);
INSERT INTO crypt_guard (id, name, lair, threat) VALUES (1, 'Ghoul A', 'north crypt', 5);
INSERT INTO crypt_guard (id, name, lair, threat) VALUES (2, 'Zombie A', 'north crypt', 2);
INSERT INTO crypt_guard (id, name, lair, threat) VALUES (3, 'Wraith A', 'east tomb', 8);
INSERT INTO crypt_guard (id, name, lair, threat) VALUES (4, 'Specter A', 'east tomb', 7);
INSERT INTO crypt_guard (id, name, lair, threat) VALUES (5, 'Bone Lord', 'north crypt', 6);
INSERT INTO crypt_guard (id, name, lair, threat) VALUES (6, 'Dust Ghost', 'west vault', 1);`,
    winCondition: { type: 'rows_returned', table: 'crypt_guard', minRows: 2, description: 'Return lairs with 2+ high-threat guards' },
    schemas: [
      { name: 'crypt_guard', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'lair', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 57,
    floor: 6,
    name: "The Max Tomb",
    subtitle: "Highest threat per lair",
    description: "The crypt scout needs to know the most dangerous creature in each lair. Use GROUP BY with MAX to find it.",
    sqlConcept: "GROUP BY with MAX",
    conceptTag: "GROUP BY MAX",
    goal: "Find max threat per lair",
    targetTables: ["tomb_monsters"],
    targetColumns: ["lair", "threat"],
    hint1Concept: "MAX within GROUP BY returns the maximum value of a column per group. Each lair's row in the result shows its own highest threat value.",
    hint2Example: "SELECT floor, MAX(hp) FROM enemies GROUP BY floor;",
    hint3Template: "SELECT lair, MAX(threat) AS max_threat FROM tomb_monsters GROUP BY _____;",
    sqlHint: "SELECT lair, MAX(threat) AS max_threat FROM tomb_monsters GROUP BY lair;",
    sqlSeed: `CREATE TABLE tomb_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  lair TEXT,
  threat INTEGER
);
INSERT INTO tomb_monsters (id, name, lair, threat) VALUES (1, 'Zombie', 'north tomb', 3);
INSERT INTO tomb_monsters (id, name, lair, threat) VALUES (2, 'Bone Archer', 'north tomb', 7);
INSERT INTO tomb_monsters (id, name, lair, threat) VALUES (3, 'Wraith', 'south tomb', 8);
INSERT INTO tomb_monsters (id, name, lair, threat) VALUES (4, 'Ghost', 'south tomb', 5);
INSERT INTO tomb_monsters (id, name, lair, threat) VALUES (5, 'Lich', 'inner sanctum', 10);`,
    winCondition: { type: 'rows_returned', table: 'tomb_monsters', minRows: 3, description: 'Return max threat for each of 3 lairs' },
    schemas: [
      { name: 'tomb_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'lair', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 58,
    floor: 6,
    name: "Order Among Groups",
    subtitle: "Sort the grouped results",
    description: "The crypt registry lists monster types by their average threat, most dangerous first. Combine GROUP BY, AVG, and ORDER BY.",
    sqlConcept: "GROUP BY + ORDER BY aggregate",
    conceptTag: "GROUP BY ORDER BY",
    goal: "List monster types by average threat descending",
    targetTables: ["crypt_types"],
    targetColumns: ["type", "threat"],
    hint1Concept: "You can ORDER BY an aggregate function result even if you aliased it. The ORDER BY clause comes after GROUP BY and HAVING in the query.",
    hint2Example: "SELECT faction, AVG(power) AS avg_p FROM warriors GROUP BY faction ORDER BY avg_p DESC;",
    hint3Template: "SELECT type, AVG(threat) AS avg_threat FROM crypt_types GROUP BY type ORDER BY avg_threat _____;",
    sqlHint: "SELECT type, AVG(threat) AS avg_threat FROM crypt_types GROUP BY type ORDER BY avg_threat DESC;",
    sqlSeed: `CREATE TABLE crypt_types (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  threat INTEGER
);
INSERT INTO crypt_types (id, name, type, threat) VALUES (1, 'Zombie', 'undead', 3);
INSERT INTO crypt_types (id, name, type, threat) VALUES (2, 'Lich', 'undead', 10);
INSERT INTO crypt_types (id, name, type, threat) VALUES (3, 'Cave Bat', 'beast', 2);
INSERT INTO crypt_types (id, name, type, threat) VALUES (4, 'Dire Wolf', 'beast', 6);
INSERT INTO crypt_types (id, name, type, threat) VALUES (5, 'Banshee', 'spirit', 9);
INSERT INTO crypt_types (id, name, type, threat) VALUES (6, 'Specter', 'spirit', 7);`,
    winCondition: { type: 'rows_returned', table: 'crypt_types', minRows: 3, description: 'Return 3 types sorted by average threat DESC' },
    schemas: [
      { name: 'crypt_types', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 59,
    floor: 6,
    name: "The Deadly Average",
    subtitle: "Only the most feared types",
    description: "The crypt high council only studies monster types whose average threat exceeds 5. Find them using HAVING AVG.",
    sqlConcept: "HAVING with AVG condition",
    conceptTag: "HAVING AVG",
    goal: "Find monster types with average threat above 5",
    targetTables: ["dark_registry"],
    targetColumns: ["type", "threat"],
    hint1Concept: "HAVING AVG(column) > value filters groups to only those where the average meets your threshold, just like HAVING COUNT filters by count.",
    hint2Example: "SELECT school, AVG(damage) FROM spells GROUP BY school HAVING AVG(damage) > 30;",
    hint3Template: "SELECT type, AVG(threat) AS avg_t FROM dark_registry GROUP BY type HAVING AVG(threat) > _____;",
    sqlHint: "SELECT type, AVG(threat) AS avg_t FROM dark_registry GROUP BY type HAVING AVG(threat) > 5;",
    sqlSeed: `CREATE TABLE dark_registry (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  threat INTEGER
);
INSERT INTO dark_registry (id, name, type, threat) VALUES (1, 'Ghoul', 'undead', 4);
INSERT INTO dark_registry (id, name, type, threat) VALUES (2, 'Vampire', 'undead', 8);
INSERT INTO dark_registry (id, name, type, threat) VALUES (3, 'Goblin', 'humanoid', 3);
INSERT INTO dark_registry (id, name, type, threat) VALUES (4, 'Orc', 'humanoid', 5);
INSERT INTO dark_registry (id, name, type, threat) VALUES (5, 'Wraith', 'spirit', 7);
INSERT INTO dark_registry (id, name, type, threat) VALUES (6, 'Banshee', 'spirit', 9);`,
    winCondition: { type: 'rows_returned', table: 'dark_registry', minRows: 2, description: 'Return types with avg threat > 5' },
    schemas: [
      { name: 'dark_registry', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },
  {
    id: 60,
    floor: 6,
    name: "The Crypt Master",
    subtitle: "Full grouping mastery",
    description: "The Crypt Master demands: show each monster class, its member count, and average hp — but only classes with at least 2 members and average hp above 40. Order by count descending.",
    sqlConcept: "Full GROUP BY + HAVING + ORDER BY",
    conceptTag: "Grouping mastery",
    goal: "Show classes with 2+ members and avg hp > 40, ordered by count",
    targetTables: ["master_roster"],
    targetColumns: ["class", "hp"],
    hint1Concept: "Combine GROUP BY, HAVING with multiple conditions (using AND), and ORDER BY to fully control grouped output. This is the full aggregate query pattern.",
    hint2Example: "SELECT role, COUNT(*), AVG(power) FROM heroes GROUP BY role HAVING COUNT(*) >= 2 AND AVG(power) > 50 ORDER BY COUNT(*) DESC;",
    hint3Template: "SELECT class, COUNT(*) AS cnt, AVG(hp) AS avg_hp FROM master_roster GROUP BY class HAVING COUNT(*) >= 2 AND AVG(hp) > 40 ORDER BY cnt _____;",
    sqlHint: "SELECT class, COUNT(*) AS cnt, AVG(hp) AS avg_hp FROM master_roster GROUP BY class HAVING COUNT(*) >= 2 AND AVG(hp) > 40 ORDER BY cnt DESC;",
    sqlSeed: `CREATE TABLE master_roster (
  id INTEGER PRIMARY KEY,
  name TEXT,
  class TEXT,
  hp INTEGER
);
INSERT INTO master_roster (id, name, class, hp) VALUES (1, 'Aldric', 'warrior', 80);
INSERT INTO master_roster (id, name, class, hp) VALUES (2, 'Sera', 'warrior', 90);
INSERT INTO master_roster (id, name, class, hp) VALUES (3, 'Bryn', 'mage', 40);
INSERT INTO master_roster (id, name, class, hp) VALUES (4, 'Lyra', 'rogue', 55);
INSERT INTO master_roster (id, name, class, hp) VALUES (5, 'Finn', 'warrior', 70);
INSERT INTO master_roster (id, name, class, hp) VALUES (6, 'Nyx', 'mage', 35);
INSERT INTO master_roster (id, name, class, hp) VALUES (7, 'Dax', 'rogue', 50);`,
    winCondition: { type: 'rows_returned', table: 'master_roster', minRows: 2, description: 'Return qualifying classes ordered by count DESC' },
    schemas: [
      { name: 'master_roster', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'class', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'crypt'
  },

  // ============================================================
  // FLOOR 7 (Levels 61-70) — Modifying the World
  // bgTheme: 'bridge'
  // ============================================================
  {
    id: 61,
    floor: 7,
    name: "Bridge of Creation",
    subtitle: "Bring something new into existence",
    description: "The bridge builder needs a new toll record added to the bridge log. Use INSERT INTO to add a new row to the table.",
    sqlConcept: "INSERT INTO",
    conceptTag: "INSERT INTO",
    goal: "Insert a new toll record into the bridge_log",
    targetTables: ["bridge_log"],
    targetColumns: ["traveler", "toll", "direction"],
    hint1Concept: "INSERT INTO adds a new row to a table. List the column names in parentheses after the table name, then provide the matching values after VALUES.",
    hint2Example: "INSERT INTO items (name, price) VALUES ('Shield', 50);",
    hint3Template: "INSERT INTO bridge_log (traveler, toll, direction) VALUES ('______', _____, '______');",
    sqlHint: "INSERT INTO bridge_log (traveler, toll, direction) VALUES ('Wanderer', 5, 'north');",
    sqlSeed: `CREATE TABLE bridge_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  traveler TEXT,
  toll INTEGER,
  direction TEXT
);
INSERT INTO bridge_log (traveler, toll, direction) VALUES ('Merchant', 10, 'south');
INSERT INTO bridge_log (traveler, toll, direction) VALUES ('Knight', 0, 'north');
INSERT INTO bridge_log (traveler, toll, direction) VALUES ('Thief', 5, 'east');`,
    winCondition: { type: 'rows_affected', table: 'bridge_log', count: 1, description: 'Insert 1 new toll record' },
    schemas: [
      { name: 'bridge_log', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'traveler', type: 'TEXT', nullable: false }, { name: 'toll', type: 'INTEGER', nullable: false }, { name: 'direction', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 62,
    floor: 7,
    name: "Heal the Wounded",
    subtitle: "Change what already exists",
    description: "The bridge healer must restore a wounded warrior's hp to 100. Use UPDATE with a WHERE clause to change a specific row.",
    sqlConcept: "UPDATE with WHERE",
    conceptTag: "UPDATE WHERE",
    goal: "Set the warrior named 'Aldric' hp to 100",
    targetTables: ["bridge_warriors"],
    targetColumns: ["hp"],
    hint1Concept: "UPDATE modifies existing rows. SET specifies which columns to change and their new values. Always include WHERE to target specific rows — without it, every row gets updated.",
    hint2Example: "UPDATE players SET status = 'active' WHERE id = 3;",
    hint3Template: "UPDATE bridge_warriors SET hp = _____ WHERE name = '______';",
    sqlHint: "UPDATE bridge_warriors SET hp = 100 WHERE name = 'Aldric';",
    sqlSeed: `CREATE TABLE bridge_warriors (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  class TEXT
);
INSERT INTO bridge_warriors (id, name, hp, class) VALUES (1, 'Aldric', 35, 'fighter');
INSERT INTO bridge_warriors (id, name, hp, class) VALUES (2, 'Sera', 90, 'cleric');
INSERT INTO bridge_warriors (id, name, hp, class) VALUES (3, 'Bryn', 60, 'mage');`,
    winCondition: { type: 'rows_affected', table: 'bridge_warriors', count: 1, description: "Update Aldric's hp to 100" },
    schemas: [
      { name: 'bridge_warriors', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 63,
    floor: 7,
    name: "Mass Leveling",
    subtitle: "Update many at once",
    description: "All 'goblin' enemies on the bridge have been weakened by a curse. Reduce their attack by 5 using an UPDATE without a row-specific WHERE — target all goblins by type.",
    sqlConcept: "UPDATE affecting multiple rows",
    conceptTag: "UPDATE multi-row",
    goal: "Decrease attack by 5 for all goblins",
    targetTables: ["bridge_enemies"],
    targetColumns: ["attack"],
    hint1Concept: "UPDATE can modify multiple rows at once. If your WHERE condition matches several rows, all of them are updated. Use arithmetic like attack - 5 to compute the new value.",
    hint2Example: "UPDATE enemies SET defense = defense + 2 WHERE type = 'armored';",
    hint3Template: "UPDATE bridge_enemies SET attack = attack - _____ WHERE type = 'goblin';",
    sqlHint: "UPDATE bridge_enemies SET attack = attack - 5 WHERE type = 'goblin';",
    sqlSeed: `CREATE TABLE bridge_enemies (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  attack INTEGER
);
INSERT INTO bridge_enemies (id, name, type, attack) VALUES (1, 'Goblin Scout', 'goblin', 15);
INSERT INTO bridge_enemies (id, name, type, attack) VALUES (2, 'Orc Brute', 'orc', 30);
INSERT INTO bridge_enemies (id, name, type, attack) VALUES (3, 'Goblin Archer', 'goblin', 20);
INSERT INTO bridge_enemies (id, name, type, attack) VALUES (4, 'Troll', 'troll', 40);
INSERT INTO bridge_enemies (id, name, type, attack) VALUES (5, 'Goblin Shaman', 'goblin', 25);`,
    winCondition: { type: 'rows_affected', table: 'bridge_enemies', count: 3, description: 'Update all 3 goblins\'s attack' },
    schemas: [
      { name: 'bridge_enemies', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'attack', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 64,
    floor: 7,
    name: "The Eraser",
    subtitle: "Delete the unwanted",
    description: "A banished knight's record must be removed. Use DELETE with WHERE to remove only that knight's row from the bridge roster.",
    sqlConcept: "DELETE with WHERE",
    conceptTag: "DELETE WHERE",
    goal: "Delete the knight named 'Maldrek' from the roster",
    targetTables: ["bridge_roster"],
    targetColumns: ["name"],
    hint1Concept: "DELETE FROM removes rows from a table. Always use WHERE to target specific rows. Without WHERE, all rows are deleted.",
    hint2Example: "DELETE FROM inventory WHERE item_name = 'cursed_ring';",
    hint3Template: "DELETE FROM bridge_roster WHERE name = '______';",
    sqlHint: "DELETE FROM bridge_roster WHERE name = 'Maldrek';",
    sqlSeed: `CREATE TABLE bridge_roster (
  id INTEGER PRIMARY KEY,
  name TEXT,
  rank INTEGER,
  status TEXT
);
INSERT INTO bridge_roster (id, name, rank, status) VALUES (1, 'Aldric', 5, 'active');
INSERT INTO bridge_roster (id, name, rank, status) VALUES (2, 'Maldrek', 3, 'banished');
INSERT INTO bridge_roster (id, name, rank, status) VALUES (3, 'Sera', 4, 'active');`,
    winCondition: { type: 'rows_affected', table: 'bridge_roster', count: 1, description: 'Delete 1 banished knight record' },
    schemas: [
      { name: 'bridge_roster', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'rank', type: 'INTEGER', nullable: false }, { name: 'status', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 65,
    floor: 7,
    name: "Purge the Weak",
    subtitle: "Delete by condition",
    description: "The bridge champion purges all monsters with hp below 20 from the encounter list — they're not worthy opponents.",
    sqlConcept: "DELETE with numeric WHERE",
    conceptTag: "DELETE multi-row",
    goal: "Delete all monsters with hp below 20",
    targetTables: ["encounter_list"],
    targetColumns: ["hp"],
    hint1Concept: "DELETE can remove multiple rows at once when the WHERE condition matches several rows. Use comparison operators just as you would in a SELECT statement.",
    hint2Example: "DELETE FROM items WHERE durability < 10;",
    hint3Template: "DELETE FROM encounter_list WHERE hp < _____;",
    sqlHint: "DELETE FROM encounter_list WHERE hp < 20;",
    sqlSeed: `CREATE TABLE encounter_list (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  type TEXT
);
INSERT INTO encounter_list (id, name, hp, type) VALUES (1, 'Dust Mite', 5, 'pest');
INSERT INTO encounter_list (id, name, hp, type) VALUES (2, 'Cave Rat', 12, 'beast');
INSERT INTO encounter_list (id, name, hp, type) VALUES (3, 'Stone Golem', 150, 'construct');
INSERT INTO encounter_list (id, name, hp, type) VALUES (4, 'Twig Wisp', 8, 'spirit');
INSERT INTO encounter_list (id, name, hp, type) VALUES (5, 'Fire Drake', 200, 'beast');`,
    winCondition: { type: 'rows_affected', table: 'encounter_list', count: 3, description: 'Delete the 3 monsters with hp below 20' },
    schemas: [
      { name: 'encounter_list', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'type', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 66,
    floor: 7,
    name: "Soul Insertion",
    subtitle: "Add a new spell to the spellbook",
    description: "A wandering mage has discovered a new spell. Add it to the spellbook using INSERT INTO with specific values for all relevant columns.",
    sqlConcept: "INSERT INTO with specific columns",
    conceptTag: "INSERT specific",
    goal: "Add a Fireball spell with damage 50 and mana_cost 30",
    targetTables: ["spellbook"],
    targetColumns: ["name", "damage", "mana_cost"],
    hint1Concept: "INSERT INTO lets you specify exactly which columns to populate. Any column you omit must be nullable or have a default value. This is safer than providing all columns in order.",
    hint2Example: "INSERT INTO weapons (name, damage) VALUES ('Dagger', 10);",
    hint3Template: "INSERT INTO spellbook (name, damage, mana_cost) VALUES ('______', _____, _____);",
    sqlHint: "INSERT INTO spellbook (name, damage, mana_cost) VALUES ('Fireball', 50, 30);",
    sqlSeed: `CREATE TABLE spellbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  damage INTEGER,
  mana_cost INTEGER
);
INSERT INTO spellbook (name, damage, mana_cost) VALUES ('Magic Missile', 15, 5);
INSERT INTO spellbook (name, damage, mana_cost) VALUES ('Frostbolt', 25, 12);
INSERT INTO spellbook (name, damage, mana_cost) VALUES ('Shadow Bolt', 30, 15);`,
    winCondition: { type: 'rows_affected', table: 'spellbook', count: 1, description: 'Insert the Fireball spell' },
    schemas: [
      { name: 'spellbook', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false }, { name: 'mana_cost', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 67,
    floor: 7,
    name: "Conditional Path",
    subtitle: "Choose your fate with CASE",
    description: "The bridge toll system charges different rates: 'knight' pays 0, 'merchant' pays 10, everyone else pays 5. Use CASE WHEN to compute the correct toll for each traveler.",
    sqlConcept: "CASE WHEN THEN ELSE END",
    conceptTag: "CASE WHEN",
    goal: "Return name and computed toll using CASE",
    targetTables: ["travelers"],
    targetColumns: ["name", "class"],
    hint1Concept: "CASE WHEN is SQL's if-else. It evaluates conditions in order and returns the value of the first matching THEN clause. ELSE handles everything that doesn't match, and END closes the CASE.",
    hint2Example: "SELECT name, CASE WHEN score >= 90 THEN 'A' WHEN score >= 70 THEN 'B' ELSE 'C' END AS grade FROM results;",
    hint3Template: "SELECT name, CASE WHEN class = 'knight' THEN 0 WHEN class = 'merchant' THEN 10 ELSE _____ END AS toll FROM travelers;",
    sqlHint: "SELECT name, CASE WHEN class = 'knight' THEN 0 WHEN class = 'merchant' THEN 10 ELSE 5 END AS toll FROM travelers;",
    sqlSeed: `CREATE TABLE travelers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  class TEXT
);
INSERT INTO travelers (id, name, class) VALUES (1, 'Sir Aldric', 'knight');
INSERT INTO travelers (id, name, class) VALUES (2, 'Merchants Guild', 'merchant');
INSERT INTO travelers (id, name, class) VALUES (3, 'Wandering Bard', 'bard');
INSERT INTO travelers (id, name, class) VALUES (4, 'Royal Guard', 'knight');
INSERT INTO travelers (id, name, class) VALUES (5, 'Spice Trader', 'merchant');`,
    winCondition: { type: 'rows_returned', table: 'travelers', minRows: 5, description: 'Return all 5 travelers with computed toll' },
    schemas: [
      { name: 'travelers', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 68,
    floor: 7,
    name: "Multi-Column Update",
    subtitle: "Change many fields at once",
    description: "A powerful artifact has been enhanced: update the bridge artifact named 'Void Edge' to set damage to 80 and rarity to 'legendary' in a single UPDATE statement.",
    sqlConcept: "UPDATE multiple columns",
    conceptTag: "UPDATE multi-column",
    goal: "Set damage and rarity for Void Edge in one UPDATE",
    targetTables: ["bridge_artifacts"],
    targetColumns: ["damage", "rarity"],
    hint1Concept: "UPDATE can change multiple columns at once by separating SET assignments with commas: SET col1 = val1, col2 = val2. All changes apply to the same matching rows.",
    hint2Example: "UPDATE gear SET attack = 50, durability = 100 WHERE name = 'Steel Sword';",
    hint3Template: "UPDATE bridge_artifacts SET damage = _____, rarity = '______' WHERE name = 'Void Edge';",
    sqlHint: "UPDATE bridge_artifacts SET damage = 80, rarity = 'legendary' WHERE name = 'Void Edge';",
    sqlSeed: `CREATE TABLE bridge_artifacts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  damage INTEGER,
  rarity TEXT
);
INSERT INTO bridge_artifacts (id, name, damage, rarity) VALUES (1, 'Void Edge', 40, 'rare');
INSERT INTO bridge_artifacts (id, name, damage, rarity) VALUES (2, 'Iron Club', 20, 'common');
INSERT INTO bridge_artifacts (id, name, damage, rarity) VALUES (3, 'Silver Lance', 55, 'uncommon');`,
    winCondition: { type: 'rows_affected', table: 'bridge_artifacts', count: 1, description: 'Update the Void Edge artifact' },
    schemas: [
      { name: 'bridge_artifacts', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false }, { name: 'rarity', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 69,
    floor: 7,
    name: "The Void Cleanse",
    subtitle: "Purge all entries",
    description: "The cursed scroll must be purged entirely. Use DELETE without a WHERE clause to remove every row from the cursed_scrolls table.",
    sqlConcept: "DELETE all rows (no WHERE)",
    conceptTag: "DELETE all",
    goal: "Delete all rows from cursed_scrolls",
    targetTables: ["cursed_scrolls"],
    targetColumns: ["*"],
    hint1Concept: "Omitting WHERE in a DELETE statement removes all rows from the table. The table structure remains, but it will be empty. Use this with caution.",
    hint2Example: "DELETE FROM temp_data;",
    hint3Template: "DELETE FROM _____;",
    sqlHint: "DELETE FROM cursed_scrolls;",
    sqlSeed: `CREATE TABLE cursed_scrolls (
  id INTEGER PRIMARY KEY,
  name TEXT,
  curse TEXT
);
INSERT INTO cursed_scrolls (id, name, curse) VALUES (1, 'Scroll of Doom', 'plague');
INSERT INTO cursed_scrolls (id, name, curse) VALUES (2, 'Scroll of Chaos', 'madness');
INSERT INTO cursed_scrolls (id, name, curse) VALUES (3, 'Scroll of Void', 'silence');`,
    winCondition: { type: 'rows_affected', table: 'cursed_scrolls', count: 3, description: 'Delete all 3 cursed scrolls' },
    schemas: [
      { name: 'cursed_scrolls', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'curse', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  {
    id: 70,
    floor: 7,
    name: "Bridge Master's Trial",
    subtitle: "Insert, update, then read",
    description: "The Bridge Master tests all skills: insert a new bridge record for 'Flame Titan' with hp 300 and class 'titan', then select all titans from the table to confirm.",
    sqlConcept: "INSERT then SELECT verification",
    conceptTag: "INSERT + SELECT",
    goal: "Insert Flame Titan then retrieve all titans",
    targetTables: ["bridge_records"],
    targetColumns: ["name", "hp", "class"],
    hint1Concept: "You can run multiple SQL statements in sequence. First INSERT to add the row, then use SELECT to verify it was added. Each statement ends with a semicolon.",
    hint2Example: "INSERT INTO heroes (name) VALUES ('Aria'); SELECT * FROM heroes WHERE name = 'Aria';",
    hint3Template: "INSERT INTO bridge_records (name, hp, class) VALUES ('______', _____, '______'); SELECT * FROM bridge_records WHERE class = 'titan';",
    sqlHint: "INSERT INTO bridge_records (name, hp, class) VALUES ('Flame Titan', 300, 'titan'); SELECT * FROM bridge_records WHERE class = 'titan';",
    sqlSeed: `CREATE TABLE bridge_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  hp INTEGER,
  class TEXT
);
INSERT INTO bridge_records (name, hp, class) VALUES ('Stone Titan', 250, 'titan');
INSERT INTO bridge_records (name, hp, class) VALUES ('Cave Troll', 100, 'troll');
INSERT INTO bridge_records (name, hp, class) VALUES ('Iron Titan', 280, 'titan');`,
    winCondition: { type: 'rows_returned', table: 'bridge_records', minRows: 3, description: 'After insert, return all 3 titan rows' },
    schemas: [
      { name: 'bridge_records', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'bridge'
  },
  // ============================================================
  // FLOOR 8 (Levels 71-80) — Connecting Realms: JOINs
  // bgTheme: 'vault'
  // ============================================================
  {
    id: 71,
    floor: 8,
    name: "Soul Insertion",
    subtitle: "Two tables, one truth",
    description: "The vault keeper connects two records: each hero has an assigned weapon stored in a separate table. Use INNER JOIN to bring them together.",
    sqlConcept: "INNER JOIN",
    conceptTag: "INNER JOIN",
    goal: "Join heroes to their weapons using INNER JOIN",
    targetTables: ["vault_heroes", "vault_weapons"],
    targetColumns: ["vault_heroes.name", "vault_weapons.name"],
    hint1Concept: "INNER JOIN combines rows from two tables where a matching key exists in both. Rows that have no match in the other table are excluded from the result.",
    hint2Example: "SELECT players.name, guilds.name FROM players INNER JOIN guilds ON players.guild_id = guilds.id;",
    hint3Template: "SELECT vault_heroes.name, vault_weapons.name FROM vault_heroes INNER JOIN vault_weapons ON vault_heroes.weapon_id = vault_weapons._____;",
    sqlHint: "SELECT vault_heroes.name AS hero, vault_weapons.name AS weapon FROM vault_heroes INNER JOIN vault_weapons ON vault_heroes.weapon_id = vault_weapons.id;",
    sqlSeed: `CREATE TABLE vault_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  weapon_id INTEGER
);
CREATE TABLE vault_weapons (
  id INTEGER PRIMARY KEY,
  name TEXT,
  damage INTEGER
);
INSERT INTO vault_weapons (id, name, damage) VALUES (1, 'Iron Sword', 20);
INSERT INTO vault_weapons (id, name, damage) VALUES (2, 'Fire Staff', 40);
INSERT INTO vault_weapons (id, name, damage) VALUES (3, 'Silver Dagger', 15);
INSERT INTO vault_heroes (id, name, weapon_id) VALUES (1, 'Aldric', 1);
INSERT INTO vault_heroes (id, name, weapon_id) VALUES (2, 'Zora', 2);
INSERT INTO vault_heroes (id, name, weapon_id) VALUES (3, 'Bryn', 3);`,
    winCondition: { type: 'rows_returned', table: 'vault_heroes', minRows: 3, description: 'Return all 3 hero-weapon pairs' },
    schemas: [
      { name: 'vault_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'weapon_id', type: 'INTEGER', nullable: false } ] },
      { name: 'vault_weapons', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 72,
    floor: 8,
    name: "The Orphaned Warrior",
    subtitle: "Find those left behind",
    description: "Some vault soldiers have no assigned guild. Use LEFT JOIN to list all soldiers alongside their guild name, showing NULL for those without one.",
    sqlConcept: "LEFT JOIN",
    conceptTag: "LEFT JOIN",
    goal: "List all soldiers and their guild (NULL if unassigned)",
    targetTables: ["vault_soldiers", "guilds"],
    targetColumns: ["vault_soldiers.name", "guilds.name"],
    hint1Concept: "LEFT JOIN returns all rows from the left table, plus matching rows from the right table. Where no match exists on the right, NULL fills those columns.",
    hint2Example: "SELECT e.name, d.name FROM employees e LEFT JOIN departments d ON e.dept_id = d.id;",
    hint3Template: "SELECT vault_soldiers.name, guilds.name AS guild FROM vault_soldiers LEFT JOIN guilds ON vault_soldiers.guild_id = guilds._____;",
    sqlHint: "SELECT vault_soldiers.name, guilds.name AS guild FROM vault_soldiers LEFT JOIN guilds ON vault_soldiers.guild_id = guilds.id;",
    sqlSeed: `CREATE TABLE vault_soldiers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  guild_id INTEGER
);
CREATE TABLE guilds (
  id INTEGER PRIMARY KEY,
  name TEXT
);
INSERT INTO guilds (id, name) VALUES (1, 'Iron Brotherhood');
INSERT INTO guilds (id, name) VALUES (2, 'Shadow Guild');
INSERT INTO vault_soldiers (id, name, guild_id) VALUES (1, 'Aldric', 1);
INSERT INTO vault_soldiers (id, name, guild_id) VALUES (2, 'Mira', NULL);
INSERT INTO vault_soldiers (id, name, guild_id) VALUES (3, 'Dax', 2);
INSERT INTO vault_soldiers (id, name, guild_id) VALUES (4, 'Lyra', NULL);`,
    winCondition: { type: 'rows_returned', table: 'vault_soldiers', minRows: 4, description: 'Return all 4 soldiers including unassigned ones' },
    schemas: [
      { name: 'vault_soldiers', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'guild_id', type: 'INTEGER', nullable: true } ] },
      { name: 'guilds', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 73,
    floor: 8,
    name: "Join and Filter",
    subtitle: "Match and sift",
    description: "The vault treasurer wants to see only heroes who wield 'fire' type weapons. Join heroes to weapons then filter by weapon type.",
    sqlConcept: "JOIN with WHERE filter",
    conceptTag: "JOIN + WHERE",
    goal: "Find heroes whose weapon type is 'fire'",
    targetTables: ["heroes", "weapons"],
    targetColumns: ["heroes.name", "weapons.type"],
    hint1Concept: "You can filter a JOIN result with WHERE just like a simple SELECT. The WHERE clause applies after the join, so you can filter on columns from either table.",
    hint2Example: "SELECT h.name, w.element FROM heroes h JOIN weapons w ON h.weapon_id = w.id WHERE w.element = 'dark';",
    hint3Template: "SELECT heroes.name, weapons.name FROM heroes JOIN weapons ON heroes.weapon_id = weapons.id WHERE weapons.type = '______';",
    sqlHint: "SELECT heroes.name, weapons.name AS weapon FROM heroes JOIN weapons ON heroes.weapon_id = weapons.id WHERE weapons.type = 'fire';",
    sqlSeed: `CREATE TABLE heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  weapon_id INTEGER
);
CREATE TABLE weapons (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  damage INTEGER
);
INSERT INTO weapons (id, name, type, damage) VALUES (1, 'Iron Sword', 'physical', 20);
INSERT INTO weapons (id, name, type, damage) VALUES (2, 'Flame Staff', 'fire', 40);
INSERT INTO weapons (id, name, type, damage) VALUES (3, 'Fire Dagger', 'fire', 25);
INSERT INTO weapons (id, name, type, damage) VALUES (4, 'Oak Bow', 'physical', 18);
INSERT INTO heroes (id, name, weapon_id) VALUES (1, 'Aldric', 1);
INSERT INTO heroes (id, name, weapon_id) VALUES (2, 'Zora', 2);
INSERT INTO heroes (id, name, weapon_id) VALUES (3, 'Sera', 3);
INSERT INTO heroes (id, name, weapon_id) VALUES (4, 'Bryn', 4);`,
    winCondition: { type: 'rows_returned', table: 'heroes', minRows: 2, description: 'Return the 2 fire weapon heroes' },
    schemas: [
      { name: 'heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'weapon_id', type: 'INTEGER', nullable: false } ] },
      { name: 'weapons', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'damage', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 74,
    floor: 8,
    name: "Table Aliases",
    subtitle: "Short names for long queries",
    description: "The vault scribe uses short aliases to write cleaner join queries. Rewrite a hero-quest join using table aliases h and q.",
    sqlConcept: "Table aliases in JOIN",
    conceptTag: "JOIN alias",
    goal: "Join heroes and quests using table aliases h and q",
    targetTables: ["vault_heroes", "quests"],
    targetColumns: ["vault_heroes.name", "quests.title"],
    hint1Concept: "Table aliases (defined with AS or just a space after the table name) shorten references in queries. Use alias.column instead of tablename.column throughout the query.",
    hint2Example: "SELECT p.name, g.title FROM players p JOIN games g ON p.game_id = g.id;",
    hint3Template: "SELECT h.name, q.title FROM vault_heroes h JOIN quests q ON h.quest_id = q._____;",
    sqlHint: "SELECT h.name AS hero, q.title AS quest FROM vault_heroes h JOIN quests q ON h.quest_id = q.id;",
    sqlSeed: `CREATE TABLE vault_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  quest_id INTEGER
);
CREATE TABLE quests (
  id INTEGER PRIMARY KEY,
  title TEXT,
  reward INTEGER
);
INSERT INTO quests (id, title, reward) VALUES (1, 'Slay the Dragon', 500);
INSERT INTO quests (id, title, reward) VALUES (2, 'Find the Relic', 300);
INSERT INTO quests (id, title, reward) VALUES (3, 'Guard the Bridge', 200);
INSERT INTO vault_heroes (id, name, quest_id) VALUES (1, 'Aldric', 1);
INSERT INTO vault_heroes (id, name, quest_id) VALUES (2, 'Sera', 2);
INSERT INTO vault_heroes (id, name, quest_id) VALUES (3, 'Bryn', 3);`,
    winCondition: { type: 'rows_returned', table: 'vault_heroes', minRows: 3, description: 'Return all 3 hero-quest pairs using aliases' },
    schemas: [
      { name: 'vault_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'quest_id', type: 'INTEGER', nullable: false } ] },
      { name: 'quests', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'title', type: 'TEXT', nullable: false }, { name: 'reward', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 75,
    floor: 8,
    name: "Three-Way Passage",
    subtitle: "Join three tables",
    description: "The vault registry links heroes to guilds through guild memberships. Use two JOINs to traverse all three tables and find each hero's guild name.",
    sqlConcept: "Multiple JOINs (three tables)",
    conceptTag: "Multi-JOIN",
    goal: "Join heroes, memberships, and guilds across three tables",
    targetTables: ["vault_heroes", "memberships", "guilds"],
    targetColumns: ["vault_heroes.name", "guilds.name"],
    hint1Concept: "You can chain multiple JOINs by adding more JOIN...ON clauses. Each JOIN connects the previous result set to a new table using a matching key.",
    hint2Example: "SELECT u.name, r.name FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id;",
    hint3Template: "SELECT h.name, g.name AS guild FROM vault_heroes h JOIN memberships m ON h.id = m.hero_id JOIN guilds g ON m.guild_id = g._____;",
    sqlHint: "SELECT h.name AS hero, g.name AS guild FROM vault_heroes h JOIN memberships m ON h.id = m.hero_id JOIN guilds g ON m.guild_id = g.id;",
    sqlSeed: `CREATE TABLE vault_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE guilds (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE memberships (
  id INTEGER PRIMARY KEY,
  hero_id INTEGER,
  guild_id INTEGER
);
INSERT INTO vault_heroes (id, name) VALUES (1, 'Aldric');
INSERT INTO vault_heroes (id, name) VALUES (2, 'Sera');
INSERT INTO vault_heroes (id, name) VALUES (3, 'Bryn');
INSERT INTO guilds (id, name) VALUES (1, 'Iron Brotherhood');
INSERT INTO guilds (id, name) VALUES (2, 'Mage Circle');
INSERT INTO memberships (id, hero_id, guild_id) VALUES (1, 1, 1);
INSERT INTO memberships (id, hero_id, guild_id) VALUES (2, 2, 2);
INSERT INTO memberships (id, hero_id, guild_id) VALUES (3, 3, 1);`,
    winCondition: { type: 'rows_returned', table: 'vault_heroes', minRows: 3, description: 'Return all 3 hero-guild pairs' },
    schemas: [
      { name: 'vault_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'guilds', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'memberships', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'hero_id', type: 'INTEGER', nullable: false }, { name: 'guild_id', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 76,
    floor: 8,
    name: "Self-Referential Bond",
    subtitle: "A table speaks to itself",
    description: "The vault's monster hierarchy: each monster has a mentor_id pointing to another row in the same table. Use a self-join to list each monster alongside its mentor's name.",
    sqlConcept: "Self JOIN",
    conceptTag: "Self JOIN",
    goal: "Join monsters to their mentors from the same table",
    targetTables: ["vault_monsters"],
    targetColumns: ["vault_monsters.name", "mentor.name"],
    hint1Concept: "A self-join joins a table to itself using two different aliases. This lets you treat the same table as two separate sources within one query, useful for hierarchical or relationship data.",
    hint2Example: "SELECT e.name, m.name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id;",
    hint3Template: "SELECT m.name, mentor.name AS mentor_name FROM vault_monsters m JOIN vault_monsters mentor ON m.mentor_id = mentor._____;",
    sqlHint: "SELECT m.name AS monster, mentor.name AS mentor FROM vault_monsters m JOIN vault_monsters mentor ON m.mentor_id = mentor.id;",
    sqlSeed: `CREATE TABLE vault_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  mentor_id INTEGER
);
INSERT INTO vault_monsters (id, name, mentor_id) VALUES (1, 'Elder Lich', NULL);
INSERT INTO vault_monsters (id, name, mentor_id) VALUES (2, 'Bone Lord', 1);
INSERT INTO vault_monsters (id, name, mentor_id) VALUES (3, 'Wraith Knight', 1);
INSERT INTO vault_monsters (id, name, mentor_id) VALUES (4, 'Ghoul Apprentice', 2);`,
    winCondition: { type: 'rows_returned', table: 'vault_monsters', minRows: 3, description: 'Return 3 monster-mentor pairs (excluding the top-level)' },
    schemas: [
      { name: 'vault_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'mentor_id', type: 'INTEGER', nullable: true } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 77,
    floor: 8,
    name: "Join and Aggregate",
    subtitle: "Count per category across tables",
    description: "The vault administrator counts how many heroes belong to each guild. Join heroes to guilds and use GROUP BY on the guild name to count.",
    sqlConcept: "JOIN with GROUP BY",
    conceptTag: "JOIN GROUP BY",
    goal: "Count heroes per guild using a join",
    targetTables: ["guild_heroes", "guild_names"],
    targetColumns: ["guild_names.name"],
    hint1Concept: "After joining tables, you can GROUP BY any column from either table (using the alias if needed). This lets you aggregate data that spans multiple tables.",
    hint2Example: "SELECT d.name, COUNT(*) FROM employees e JOIN departments d ON e.dept_id = d.id GROUP BY d.name;",
    hint3Template: "SELECT g.name, COUNT(*) AS hero_count FROM guild_heroes h JOIN guild_names g ON h.guild_id = g.id GROUP BY g._____;",
    sqlHint: "SELECT g.name AS guild, COUNT(*) AS hero_count FROM guild_heroes h JOIN guild_names g ON h.guild_id = g.id GROUP BY g.name;",
    sqlSeed: `CREATE TABLE guild_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  guild_id INTEGER
);
CREATE TABLE guild_names (
  id INTEGER PRIMARY KEY,
  name TEXT
);
INSERT INTO guild_names (id, name) VALUES (1, 'Iron Brotherhood');
INSERT INTO guild_names (id, name) VALUES (2, 'Shadow Guild');
INSERT INTO guild_names (id, name) VALUES (3, 'Mage Circle');
INSERT INTO guild_heroes (id, name, guild_id) VALUES (1, 'Aldric', 1);
INSERT INTO guild_heroes (id, name, guild_id) VALUES (2, 'Brax', 1);
INSERT INTO guild_heroes (id, name, guild_id) VALUES (3, 'Zora', 3);
INSERT INTO guild_heroes (id, name, guild_id) VALUES (4, 'Nyx', 2);
INSERT INTO guild_heroes (id, name, guild_id) VALUES (5, 'Sera', 3);`,
    winCondition: { type: 'rows_returned', table: 'guild_heroes', minRows: 3, description: 'Return hero counts for all 3 guilds' },
    schemas: [
      { name: 'guild_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'guild_id', type: 'INTEGER', nullable: false } ] },
      { name: 'guild_names', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 78,
    floor: 8,
    name: "The Vacant Throne",
    subtitle: "Find the unmatched right side",
    description: "Some guilds have no heroes assigned. Use a LEFT JOIN and filter for NULL hero records to find guilds with zero members.",
    sqlConcept: "LEFT JOIN to find unmatched rows",
    conceptTag: "LEFT JOIN NULL",
    goal: "Find guilds with no heroes assigned",
    targetTables: ["vault_guilds", "vault_members"],
    targetColumns: ["vault_guilds.name"],
    hint1Concept: "LEFT JOIN followed by WHERE right_table.column IS NULL is a classic pattern for finding rows in the left table that have no match in the right table (anti-join).",
    hint2Example: "SELECT c.name FROM categories c LEFT JOIN products p ON c.id = p.category_id WHERE p.id IS NULL;",
    hint3Template: "SELECT g.name FROM vault_guilds g LEFT JOIN vault_members m ON g.id = m.guild_id WHERE m.id IS _____;",
    sqlHint: "SELECT g.name AS empty_guild FROM vault_guilds g LEFT JOIN vault_members m ON g.id = m.guild_id WHERE m.id IS NULL;",
    sqlSeed: `CREATE TABLE vault_guilds (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE vault_members (
  id INTEGER PRIMARY KEY,
  name TEXT,
  guild_id INTEGER
);
INSERT INTO vault_guilds (id, name) VALUES (1, 'Iron Brotherhood');
INSERT INTO vault_guilds (id, name) VALUES (2, 'Ghost Council');
INSERT INTO vault_guilds (id, name) VALUES (3, 'Flame Order');
INSERT INTO vault_members (id, name, guild_id) VALUES (1, 'Aldric', 1);
INSERT INTO vault_members (id, name, guild_id) VALUES (2, 'Sera', 3);`,
    winCondition: { type: 'rows_returned', table: 'vault_guilds', minRows: 1, description: 'Find the 1 empty guild (Ghost Council)' },
    schemas: [
      { name: 'vault_guilds', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'vault_members', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'guild_id', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 79,
    floor: 8,
    name: "Cross Paths",
    subtitle: "Every combination",
    description: "The vault tournament pairs every hero with every monster for training. Use a CROSS JOIN to generate every possible hero-monster combination.",
    sqlConcept: "CROSS JOIN",
    conceptTag: "CROSS JOIN",
    goal: "Generate every hero-monster training pair",
    targetTables: ["tournament_heroes", "tournament_monsters"],
    targetColumns: ["tournament_heroes.name", "tournament_monsters.name"],
    hint1Concept: "CROSS JOIN produces the Cartesian product: every row from the left table combined with every row from the right table. If left has 3 rows and right has 4, the result has 12 rows.",
    hint2Example: "SELECT a.color, b.size FROM colors a CROSS JOIN sizes b;",
    hint3Template: "SELECT h.name AS hero, m.name AS monster FROM tournament_heroes h CROSS JOIN _____ m;",
    sqlHint: "SELECT h.name AS hero, m.name AS monster FROM tournament_heroes h CROSS JOIN tournament_monsters m;",
    sqlSeed: `CREATE TABLE tournament_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE tournament_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT
);
INSERT INTO tournament_heroes (id, name) VALUES (1, 'Aldric');
INSERT INTO tournament_heroes (id, name) VALUES (2, 'Zora');
INSERT INTO tournament_monsters (id, name) VALUES (1, 'Goblin');
INSERT INTO tournament_monsters (id, name) VALUES (2, 'Troll');
INSERT INTO tournament_monsters (id, name) VALUES (3, 'Drake');`,
    winCondition: { type: 'rows_returned', table: 'tournament_heroes', minRows: 6, description: 'Return all 6 hero-monster combinations (2x3)' },
    schemas: [
      { name: 'tournament_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'tournament_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },
  {
    id: 80,
    floor: 8,
    name: "Vault Grandmaster",
    subtitle: "Join, group, and filter",
    description: "The vault grandmaster demands: show each quest with its assigned hero and quest reward, but only for quests with reward above 200. Prove your JOIN mastery.",
    sqlConcept: "JOIN + WHERE + ORDER BY combined",
    conceptTag: "JOIN mastery",
    goal: "Join heroes and quests, filter by reward > 200, order by reward DESC",
    targetTables: ["grand_heroes", "grand_quests"],
    targetColumns: ["grand_heroes.name", "grand_quests.reward"],
    hint1Concept: "Combine JOIN with WHERE and ORDER BY just as you would for a single-table query. The WHERE filters the joined result, and ORDER BY sorts it.",
    hint2Example: "SELECT u.name, o.amount FROM users u JOIN orders o ON u.id = o.user_id WHERE o.amount > 100 ORDER BY o.amount DESC;",
    hint3Template: "SELECT h.name, q.title, q.reward FROM grand_heroes h JOIN grand_quests q ON h.quest_id = q.id WHERE q.reward > 200 ORDER BY q.reward _____;",
    sqlHint: "SELECT h.name AS hero, q.title, q.reward FROM grand_heroes h JOIN grand_quests q ON h.quest_id = q.id WHERE q.reward > 200 ORDER BY q.reward DESC;",
    sqlSeed: `CREATE TABLE grand_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  quest_id INTEGER
);
CREATE TABLE grand_quests (
  id INTEGER PRIMARY KEY,
  title TEXT,
  reward INTEGER
);
INSERT INTO grand_quests (id, title, reward) VALUES (1, 'Slay the Lich', 500);
INSERT INTO grand_quests (id, title, reward) VALUES (2, 'Rescue the Mage', 150);
INSERT INTO grand_quests (id, title, reward) VALUES (3, 'Find the Artifact', 300);
INSERT INTO grand_quests (id, title, reward) VALUES (4, 'Guard the Gate', 100);
INSERT INTO grand_heroes (id, name, quest_id) VALUES (1, 'Aldric', 1);
INSERT INTO grand_heroes (id, name, quest_id) VALUES (2, 'Sera', 2);
INSERT INTO grand_heroes (id, name, quest_id) VALUES (3, 'Bryn', 3);
INSERT INTO grand_heroes (id, name, quest_id) VALUES (4, 'Lyra', 4);`,
    winCondition: { type: 'rows_returned', table: 'grand_heroes', minRows: 2, description: 'Return the 2 hero-quest pairs with reward > 200' },
    schemas: [
      { name: 'grand_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'quest_id', type: 'INTEGER', nullable: false } ] },
      { name: 'grand_quests', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'title', type: 'TEXT', nullable: false }, { name: 'reward', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'vault'
  },

  // ============================================================
  // FLOOR 9 (Levels 81-90) — Nested Magic: Subqueries, EXISTS, UNION
  // bgTheme: 'armory'
  // ============================================================
  {
    id: 81,
    floor: 9,
    name: "The Inner Eye",
    subtitle: "A query within a query",
    description: "Deep in the armory, only monsters stronger than average may pass. Use a subquery to compare each monster's hp against the average hp of all monsters.",
    sqlConcept: "Subquery in WHERE",
    conceptTag: "Subquery",
    goal: "Find monsters with hp above the average hp",
    targetTables: ["monsters"],
    targetColumns: ["name", "hp"],
    hint1Concept: "A subquery is a SELECT inside another SELECT. In a WHERE clause, a subquery can produce a single value (scalar subquery) that the outer query compares against, like a dynamic threshold.",
    hint2Example: "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);",
    hint3Template: "SELECT name, hp FROM monsters WHERE hp > (SELECT AVG(_____) FROM monsters);",
    sqlHint: "SELECT name, hp FROM monsters WHERE hp > (SELECT AVG(hp) FROM monsters);",
    sqlSeed: `CREATE TABLE monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  type TEXT
);
INSERT INTO monsters (id, name, hp, type) VALUES (1, 'Cave Rat', 20, 'beast');
INSERT INTO monsters (id, name, hp, type) VALUES (2, 'Ogre', 120, 'giant');
INSERT INTO monsters (id, name, hp, type) VALUES (3, 'Goblin', 30, 'humanoid');
INSERT INTO monsters (id, name, hp, type) VALUES (4, 'Dragon', 200, 'beast');
INSERT INTO monsters (id, name, hp, type) VALUES (5, 'Wraith', 80, 'undead');`,
    winCondition: { type: 'rows_returned', table: 'monsters', minRows: 2, description: 'Find monsters with hp above the average (90)' },
    schemas: [
      { name: 'monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'type', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 82,
    floor: 9,
    name: "Maximum Seeker",
    subtitle: "Find the strongest using a subquery",
    description: "Use a subquery to find the monster whose hp equals the maximum hp, returning the full row rather than just the max value.",
    sqlConcept: "Subquery with MAX",
    conceptTag: "Subquery MAX",
    goal: "Return the monster with the maximum hp using a subquery",
    targetTables: ["armory_monsters"],
    targetColumns: ["*"],
    hint1Concept: "A subquery returning MAX(column) can be used in a WHERE column = (subquery) pattern to retrieve the full row of the maximum entry without a JOIN.",
    hint2Example: "SELECT * FROM items WHERE price = (SELECT MAX(price) FROM items);",
    hint3Template: "SELECT * FROM armory_monsters WHERE hp = (SELECT MAX(_____) FROM armory_monsters);",
    sqlHint: "SELECT * FROM armory_monsters WHERE hp = (SELECT MAX(hp) FROM armory_monsters);",
    sqlSeed: `CREATE TABLE armory_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  hp INTEGER,
  attack INTEGER
);
INSERT INTO armory_monsters (id, name, hp, attack) VALUES (1, 'Dust Mite', 10, 2);
INSERT INTO armory_monsters (id, name, hp, attack) VALUES (2, 'Stone Golem', 300, 50);
INSERT INTO armory_monsters (id, name, hp, attack) VALUES (3, 'Cave Drake', 180, 40);
INSERT INTO armory_monsters (id, name, hp, attack) VALUES (4, 'Goblin Runt', 25, 5);`,
    winCondition: { type: 'rows_returned', table: 'armory_monsters', minRows: 1, description: 'Return the 1 monster with maximum hp' },
    schemas: [
      { name: 'armory_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false }, { name: 'attack', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 83,
    floor: 9,
    name: "IN the Subquery",
    subtitle: "Match a dynamic list",
    description: "Find all heroes who are assigned to quests that reward more than 300 gold. Use a subquery with IN to generate the matching quest IDs dynamically.",
    sqlConcept: "Subquery with IN",
    conceptTag: "IN subquery",
    goal: "Find heroes on high-reward quests (reward > 300)",
    targetTables: ["armory_heroes", "armory_quests"],
    targetColumns: ["armory_heroes.name"],
    hint1Concept: "A subquery can return multiple rows. Use IN (subquery) to check if a column's value appears in those rows. It is a dynamic version of IN ('val1', 'val2').",
    hint2Example: "SELECT name FROM employees WHERE dept_id IN (SELECT id FROM departments WHERE budget > 50000);",
    hint3Template: "SELECT name FROM armory_heroes WHERE quest_id IN (SELECT id FROM armory_quests WHERE reward > _____);",
    sqlHint: "SELECT name FROM armory_heroes WHERE quest_id IN (SELECT id FROM armory_quests WHERE reward > 300);",
    sqlSeed: `CREATE TABLE armory_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  quest_id INTEGER
);
CREATE TABLE armory_quests (
  id INTEGER PRIMARY KEY,
  title TEXT,
  reward INTEGER
);
INSERT INTO armory_quests (id, title, reward) VALUES (1, 'Dragon Hunt', 500);
INSERT INTO armory_quests (id, title, reward) VALUES (2, 'Guard Duty', 100);
INSERT INTO armory_quests (id, title, reward) VALUES (3, 'Relic Recovery', 400);
INSERT INTO armory_quests (id, title, reward) VALUES (4, 'Patrol Route', 150);
INSERT INTO armory_heroes (id, name, quest_id) VALUES (1, 'Aldric', 1);
INSERT INTO armory_heroes (id, name, quest_id) VALUES (2, 'Sera', 2);
INSERT INTO armory_heroes (id, name, quest_id) VALUES (3, 'Bryn', 3);
INSERT INTO armory_heroes (id, name, quest_id) VALUES (4, 'Lyra', 4);`,
    winCondition: { type: 'rows_returned', table: 'armory_heroes', minRows: 2, description: 'Find the 2 heroes on high-reward quests' },
    schemas: [
      { name: 'armory_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'quest_id', type: 'INTEGER', nullable: false } ] },
      { name: 'armory_quests', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'title', type: 'TEXT', nullable: false }, { name: 'reward', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 84,
    floor: 9,
    name: "Exists or Perishes",
    subtitle: "Check for presence",
    description: "The armory gate opens only for guilds that have at least one active hero. Use EXISTS to find guilds with any matching hero.",
    sqlConcept: "EXISTS subquery",
    conceptTag: "EXISTS",
    goal: "Find guilds that have at least one active hero",
    targetTables: ["armory_guilds", "active_heroes"],
    targetColumns: ["armory_guilds.name"],
    hint1Concept: "EXISTS tests whether a subquery returns any rows. It returns TRUE if the subquery produces at least one row, and FALSE if it produces none. It is often more efficient than IN for correlated checks.",
    hint2Example: "SELECT name FROM departments WHERE EXISTS (SELECT 1 FROM employees WHERE employees.dept_id = departments.id);",
    hint3Template: "SELECT g.name FROM armory_guilds g WHERE EXISTS (SELECT 1 FROM active_heroes h WHERE h.guild_id = g._____);",
    sqlHint: "SELECT g.name FROM armory_guilds g WHERE EXISTS (SELECT 1 FROM active_heroes h WHERE h.guild_id = g.id);",
    sqlSeed: `CREATE TABLE armory_guilds (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE active_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  guild_id INTEGER,
  status TEXT
);
INSERT INTO armory_guilds (id, name) VALUES (1, 'Iron Brotherhood');
INSERT INTO armory_guilds (id, name) VALUES (2, 'Ghost Council');
INSERT INTO armory_guilds (id, name) VALUES (3, 'Flame Order');
INSERT INTO active_heroes (id, name, guild_id, status) VALUES (1, 'Aldric', 1, 'active');
INSERT INTO active_heroes (id, name, guild_id, status) VALUES (2, 'Sera', 3, 'active');`,
    winCondition: { type: 'rows_returned', table: 'armory_guilds', minRows: 2, description: 'Return the 2 guilds with active heroes' },
    schemas: [
      { name: 'armory_guilds', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'active_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'guild_id', type: 'INTEGER', nullable: false }, { name: 'status', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 85,
    floor: 9,
    name: "Not Exists",
    subtitle: "Find the absent",
    description: "The armory recruiter looks for guilds with no registered heroes at all. Use NOT EXISTS to find them.",
    sqlConcept: "NOT EXISTS subquery",
    conceptTag: "NOT EXISTS",
    goal: "Find guilds with no registered heroes",
    targetTables: ["ne_guilds", "ne_heroes"],
    targetColumns: ["ne_guilds.name"],
    hint1Concept: "NOT EXISTS returns TRUE when the subquery finds no matching rows. It is the complement of EXISTS, useful for finding the absence of a relationship.",
    hint2Example: "SELECT name FROM projects WHERE NOT EXISTS (SELECT 1 FROM tasks WHERE tasks.project_id = projects.id);",
    hint3Template: "SELECT g.name FROM ne_guilds g WHERE NOT EXISTS (SELECT 1 FROM ne_heroes h WHERE h.guild_id = g._____);",
    sqlHint: "SELECT g.name FROM ne_guilds g WHERE NOT EXISTS (SELECT 1 FROM ne_heroes h WHERE h.guild_id = g.id);",
    sqlSeed: `CREATE TABLE ne_guilds (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE ne_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  guild_id INTEGER
);
INSERT INTO ne_guilds (id, name) VALUES (1, 'Steel Pact');
INSERT INTO ne_guilds (id, name) VALUES (2, 'Void Circle');
INSERT INTO ne_guilds (id, name) VALUES (3, 'Dawn Watch');
INSERT INTO ne_heroes (id, name, guild_id) VALUES (1, 'Aldric', 1);
INSERT INTO ne_heroes (id, name, guild_id) VALUES (2, 'Sera', 3);`,
    winCondition: { type: 'rows_returned', table: 'ne_guilds', minRows: 1, description: 'Return the 1 guild with no heroes' },
    schemas: [
      { name: 'ne_guilds', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'ne_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'guild_id', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 86,
    floor: 9,
    name: "Dual Forces",
    subtitle: "Combine two result sets",
    description: "The armory registry needs a combined list of all fighters from both the east and west barracks. Use UNION to combine both SELECT results, eliminating duplicates.",
    sqlConcept: "UNION",
    conceptTag: "UNION",
    goal: "Combine fighter lists from east and west barracks",
    targetTables: ["east_barracks", "west_barracks"],
    targetColumns: ["name"],
    hint1Concept: "UNION stacks the results of two SELECT statements. Duplicate rows are removed. Both queries must have the same number of columns with compatible types.",
    hint2Example: "SELECT name FROM heroes UNION SELECT name FROM allies;",
    hint3Template: "SELECT name FROM east_barracks UNION SELECT name FROM _____;",
    sqlHint: "SELECT name FROM east_barracks UNION SELECT name FROM west_barracks;",
    sqlSeed: `CREATE TABLE east_barracks (
  id INTEGER PRIMARY KEY,
  name TEXT,
  rank INTEGER
);
CREATE TABLE west_barracks (
  id INTEGER PRIMARY KEY,
  name TEXT,
  rank INTEGER
);
INSERT INTO east_barracks (id, name, rank) VALUES (1, 'Aldric', 3);
INSERT INTO east_barracks (id, name, rank) VALUES (2, 'Sera', 2);
INSERT INTO east_barracks (id, name, rank) VALUES (3, 'Shared Fighter', 1);
INSERT INTO west_barracks (id, name, rank) VALUES (1, 'Bryn', 4);
INSERT INTO west_barracks (id, name, rank) VALUES (2, 'Lyra', 3);
INSERT INTO west_barracks (id, name, rank) VALUES (3, 'Shared Fighter', 1);`,
    winCondition: { type: 'rows_returned', table: 'east_barracks', minRows: 5, description: 'Return 5 unique fighters (6 rows - 1 duplicate)' },
    schemas: [
      { name: 'east_barracks', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'rank', type: 'INTEGER', nullable: false } ] },
      { name: 'west_barracks', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'rank', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 87,
    floor: 9,
    name: "All Forces",
    subtitle: "Keep every soul, even duplicates",
    description: "The battlefield log needs every entry including repeated names. Use UNION ALL to combine the two barracks lists without removing duplicates.",
    sqlConcept: "UNION ALL",
    conceptTag: "UNION ALL",
    goal: "Combine fighter lists keeping all duplicates",
    targetTables: ["north_guard", "south_guard"],
    targetColumns: ["name"],
    hint1Concept: "UNION ALL stacks results without removing duplicates, making it faster than UNION. Use it when duplicates are expected and meaningful, or when you know there are none.",
    hint2Example: "SELECT name FROM jan_sales UNION ALL SELECT name FROM feb_sales;",
    hint3Template: "SELECT name FROM north_guard UNION ALL SELECT name FROM _____;",
    sqlHint: "SELECT name FROM north_guard UNION ALL SELECT name FROM south_guard;",
    sqlSeed: `CREATE TABLE north_guard (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE south_guard (
  id INTEGER PRIMARY KEY,
  name TEXT
);
INSERT INTO north_guard (id, name) VALUES (1, 'Aldric');
INSERT INTO north_guard (id, name) VALUES (2, 'Bryn');
INSERT INTO south_guard (id, name) VALUES (1, 'Sera');
INSERT INTO south_guard (id, name) VALUES (2, 'Bryn');`,
    winCondition: { type: 'rows_returned', table: 'north_guard', minRows: 4, description: 'Return all 4 entries including the duplicate Bryn' },
    schemas: [
      { name: 'north_guard', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'south_guard', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 88,
    floor: 9,
    name: "Subquery in FROM",
    subtitle: "A table from thin air",
    description: "Use a subquery as a derived table in the FROM clause to first filter monsters with hp > 50, then count how many types are in that subset.",
    sqlConcept: "Subquery in FROM (derived table)",
    conceptTag: "FROM subquery",
    goal: "Count distinct types among high-hp monsters using a FROM subquery",
    targetTables: ["armory_beasts"],
    targetColumns: ["type", "hp"],
    hint1Concept: "A subquery in the FROM clause acts as a temporary table (derived table or inline view). You must give it an alias. The outer query then selects from that temporary result.",
    hint2Example: "SELECT COUNT(DISTINCT category) FROM (SELECT * FROM items WHERE price > 100) AS expensive;",
    hint3Template: "SELECT COUNT(DISTINCT type) AS type_count FROM (SELECT * FROM armory_beasts WHERE hp > _____ ) AS strong;",
    sqlHint: "SELECT COUNT(DISTINCT type) AS type_count FROM (SELECT * FROM armory_beasts WHERE hp > 50) AS strong;",
    sqlSeed: `CREATE TABLE armory_beasts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  hp INTEGER
);
INSERT INTO armory_beasts (id, name, type, hp) VALUES (1, 'Dust Bat', 'beast', 15);
INSERT INTO armory_beasts (id, name, type, hp) VALUES (2, 'Stone Golem', 'construct', 200);
INSERT INTO armory_beasts (id, name, type, hp) VALUES (3, 'Fire Drake', 'beast', 150);
INSERT INTO armory_beasts (id, name, type, hp) VALUES (4, 'Ghoul', 'undead', 60);
INSERT INTO armory_beasts (id, name, type, hp) VALUES (5, 'Bone Wisp', 'undead', 20);`,
    winCondition: { type: 'rows_returned', table: 'armory_beasts', minRows: 1, description: 'Return the count of distinct types among high-hp beasts' },
    schemas: [
      { name: 'armory_beasts', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'type', type: 'TEXT', nullable: false }, { name: 'hp', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 89,
    floor: 9,
    name: "Correlated Vision",
    subtitle: "Inner sees the outer",
    description: "Find each hero alongside the count of quests completed specifically by that hero. Use a correlated subquery in the SELECT clause.",
    sqlConcept: "Correlated subquery in SELECT",
    conceptTag: "Correlated subquery",
    goal: "Return each hero name and their personal quest count",
    targetTables: ["vision_heroes", "completed_quests"],
    targetColumns: ["vision_heroes.name"],
    hint1Concept: "A correlated subquery references columns from the outer query. It runs once per row of the outer query, allowing per-row computations without a JOIN.",
    hint2Example: "SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.customer_id = customers.id) AS order_count FROM customers;",
    hint3Template: "SELECT name, (SELECT COUNT(*) FROM completed_quests WHERE completed_quests.hero_id = vision_heroes._____) AS quests FROM vision_heroes;",
    sqlHint: "SELECT name, (SELECT COUNT(*) FROM completed_quests WHERE completed_quests.hero_id = vision_heroes.id) AS quest_count FROM vision_heroes;",
    sqlSeed: `CREATE TABLE vision_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE completed_quests (
  id INTEGER PRIMARY KEY,
  title TEXT,
  hero_id INTEGER
);
INSERT INTO vision_heroes (id, name) VALUES (1, 'Aldric');
INSERT INTO vision_heroes (id, name) VALUES (2, 'Sera');
INSERT INTO vision_heroes (id, name) VALUES (3, 'Bryn');
INSERT INTO completed_quests (id, title, hero_id) VALUES (1, 'Cave Sweep', 1);
INSERT INTO completed_quests (id, title, hero_id) VALUES (2, 'Relic Hunt', 1);
INSERT INTO completed_quests (id, title, hero_id) VALUES (3, 'Escort Duty', 2);
INSERT INTO completed_quests (id, title, hero_id) VALUES (4, 'Dungeon Clear', 1);`,
    winCondition: { type: 'rows_returned', table: 'vision_heroes', minRows: 3, description: 'Return all 3 heroes with their quest counts' },
    schemas: [
      { name: 'vision_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'completed_quests', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'title', type: 'TEXT', nullable: false }, { name: 'hero_id', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },
  {
    id: 90,
    floor: 9,
    name: "Armory Sage",
    subtitle: "Nested mastery challenge",
    description: "The armory sage's final test: find all heroes whose total quest reward exceeds the average total reward across all heroes. Use a subquery in the FROM and another in the WHERE.",
    sqlConcept: "Nested subqueries",
    conceptTag: "Nested subquery",
    goal: "Find heroes whose total quest reward beats the per-hero average",
    targetTables: ["sage_heroes", "sage_quests"],
    targetColumns: ["sage_heroes.name"],
    hint1Concept: "You can nest subqueries multiple levels deep. A subquery in FROM computes per-hero totals, then the outer WHERE compares each total against the average of those totals.",
    hint2Example: "SELECT name FROM (SELECT name, SUM(val) AS total FROM t GROUP BY name) AS sub WHERE total > (SELECT AVG(total) FROM (SELECT SUM(val) AS total FROM t GROUP BY name) AS sub2);",
    hint3Template: "SELECT name FROM (SELECT h.name, SUM(q.reward) AS total FROM sage_heroes h JOIN sage_quests q ON h.id = q.hero_id GROUP BY h.name) AS hero_totals WHERE total > (SELECT AVG(total) FROM (SELECT SUM(q2.reward) AS total FROM sage_heroes h2 JOIN sage_quests q2 ON h2.id = q2.hero_id GROUP BY h2._____) AS avg_sub);",
    sqlHint: "SELECT name FROM (SELECT h.name, SUM(q.reward) AS total FROM sage_heroes h JOIN sage_quests q ON h.id = q.hero_id GROUP BY h.name) AS hero_totals WHERE total > (SELECT AVG(total) FROM (SELECT SUM(q2.reward) AS total FROM sage_heroes h2 JOIN sage_quests q2 ON h2.id = q2.hero_id GROUP BY h2.name) AS avg_sub);",
    sqlSeed: `CREATE TABLE sage_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE sage_quests (
  id INTEGER PRIMARY KEY,
  title TEXT,
  hero_id INTEGER,
  reward INTEGER
);
INSERT INTO sage_heroes (id, name) VALUES (1, 'Aldric');
INSERT INTO sage_heroes (id, name) VALUES (2, 'Sera');
INSERT INTO sage_heroes (id, name) VALUES (3, 'Bryn');
INSERT INTO sage_quests (id, title, hero_id, reward) VALUES (1, 'Dragon Hunt', 1, 500);
INSERT INTO sage_quests (id, title, hero_id, reward) VALUES (2, 'Relic Run', 1, 300);
INSERT INTO sage_quests (id, title, hero_id, reward) VALUES (3, 'Cave Guard', 2, 100);
INSERT INTO sage_quests (id, title, hero_id, reward) VALUES (4, 'Escort', 3, 200);
INSERT INTO sage_quests (id, title, hero_id, reward) VALUES (5, 'Artifact Hunt', 3, 150);`,
    winCondition: { type: 'rows_returned', table: 'sage_heroes', minRows: 1, description: 'Return heroes whose total reward beats the average' },
    schemas: [
      { name: 'sage_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false } ] },
      { name: 'sage_quests', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'title', type: 'TEXT', nullable: false }, { name: 'hero_id', type: 'INTEGER', nullable: false }, { name: 'reward', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'armory'
  },

  // ============================================================
  // FLOOR 10 (Levels 91-100) — Grandmaster
  // bgTheme: 'boss'
  // ============================================================
  {
    id: 91,
    floor: 10,
    name: "The Grand Scroll",
    subtitle: "Name your query, then use it",
    description: "The grandmaster's first lesson: use a CTE (Common Table Expression) to define elite warriors, then select from it.",
    sqlConcept: "CTE / WITH clause",
    conceptTag: "CTE / WITH",
    goal: "Use a CTE to find elite warriors (rank > 5)",
    targetTables: ["warriors"],
    targetColumns: ["*"],
    hint1Concept: "A CTE (WITH clause) names a temporary result set that you can reference in the main query. It makes complex queries more readable by breaking them into named steps.",
    hint2Example: "WITH high_earners AS (SELECT * FROM employees WHERE salary > 80000) SELECT * FROM high_earners;",
    hint3Template: "WITH elite AS (SELECT * FROM warriors WHERE rank > _____) SELECT * FROM elite;",
    sqlHint: "WITH elite AS (SELECT * FROM warriors WHERE rank > 5) SELECT * FROM elite;",
    sqlSeed: `CREATE TABLE warriors (
  id INTEGER PRIMARY KEY,
  name TEXT,
  rank INTEGER,
  class TEXT
);
INSERT INTO warriors (id, name, rank, class) VALUES (1, 'Aldric', 7, 'paladin');
INSERT INTO warriors (id, name, rank, class) VALUES (2, 'Mira', 3, 'rogue');
INSERT INTO warriors (id, name, rank, class) VALUES (3, 'Brax', 9, 'warrior');
INSERT INTO warriors (id, name, rank, class) VALUES (4, 'Lyra', 2, 'ranger');
INSERT INTO warriors (id, name, rank, class) VALUES (5, 'Cass', 6, 'mage');`,
    winCondition: { type: 'rows_returned', table: 'warriors', minRows: 3, description: 'Return the 3 elite warriors (rank > 5)' },
    schemas: [
      { name: 'warriors', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'rank', type: 'INTEGER', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 92,
    floor: 10,
    name: "Chained Scrolls",
    subtitle: "Multiple CTEs in sequence",
    description: "Use two CTEs: the first filters high-threat monsters, the second picks the top-attack ones from that filtered set. Chain them with a comma.",
    sqlConcept: "Multiple CTEs",
    conceptTag: "Multi-CTE",
    goal: "Chain two CTEs: filter by threat, then by top attack",
    targetTables: ["boss_monsters"],
    targetColumns: ["*"],
    hint1Concept: "You can define multiple CTEs in one WITH clause by separating them with commas. Later CTEs can reference earlier ones by name.",
    hint2Example: "WITH filtered AS (SELECT * FROM items WHERE price > 10), top AS (SELECT * FROM filtered WHERE rating = 5) SELECT * FROM top;",
    hint3Template: "WITH high_threat AS (SELECT * FROM boss_monsters WHERE threat > 5), top_attack AS (SELECT * FROM high_threat WHERE attack > _____) SELECT * FROM top_attack;",
    sqlHint: "WITH high_threat AS (SELECT * FROM boss_monsters WHERE threat > 5), top_attack AS (SELECT * FROM high_threat WHERE attack > 40) SELECT * FROM top_attack;",
    sqlSeed: `CREATE TABLE boss_monsters (
  id INTEGER PRIMARY KEY,
  name TEXT,
  threat INTEGER,
  attack INTEGER
);
INSERT INTO boss_monsters (id, name, threat, attack) VALUES (1, 'Goblin', 3, 15);
INSERT INTO boss_monsters (id, name, threat, attack) VALUES (2, 'Ogre', 6, 35);
INSERT INTO boss_monsters (id, name, threat, attack) VALUES (3, 'Fire Drake', 8, 55);
INSERT INTO boss_monsters (id, name, threat, attack) VALUES (4, 'Void Wraith', 7, 45);
INSERT INTO boss_monsters (id, name, threat, attack) VALUES (5, 'Bone Titan', 9, 70);`,
    winCondition: { type: 'rows_returned', table: 'boss_monsters', minRows: 3, description: 'Return monsters that are high-threat and high-attack' },
    schemas: [
      { name: 'boss_monsters', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'threat', type: 'INTEGER', nullable: false }, { name: 'attack', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 93,
    floor: 10,
    name: "Row Number Rising",
    subtitle: "Rank each row",
    description: "The boss arena assigns a sequential row number to each hero ordered by level descending. Use ROW_NUMBER() OVER (ORDER BY level DESC) to generate it.",
    sqlConcept: "ROW_NUMBER() window function",
    conceptTag: "ROW_NUMBER",
    goal: "Assign row numbers to heroes by level descending",
    targetTables: ["boss_heroes"],
    targetColumns: ["name", "level"],
    hint1Concept: "ROW_NUMBER() is a window function that assigns a unique sequential integer to each row within a result. OVER (ORDER BY ...) defines the order used to assign numbers.",
    hint2Example: "SELECT name, ROW_NUMBER() OVER (ORDER BY score DESC) AS pos FROM leaderboard;",
    hint3Template: "SELECT name, level, ROW_NUMBER() OVER (ORDER BY level _____) AS row_num FROM boss_heroes;",
    sqlHint: "SELECT name, level, ROW_NUMBER() OVER (ORDER BY level DESC) AS row_num FROM boss_heroes;",
    sqlSeed: `CREATE TABLE boss_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  level INTEGER,
  class TEXT
);
INSERT INTO boss_heroes (id, name, level, class) VALUES (1, 'Aldric', 10, 'warrior');
INSERT INTO boss_heroes (id, name, level, class) VALUES (2, 'Sera', 7, 'cleric');
INSERT INTO boss_heroes (id, name, level, class) VALUES (3, 'Bryn', 15, 'mage');
INSERT INTO boss_heroes (id, name, level, class) VALUES (4, 'Lyra', 12, 'ranger');`,
    winCondition: { type: 'rows_returned', table: 'boss_heroes', minRows: 4, description: 'Return all 4 heroes with row numbers' },
    schemas: [
      { name: 'boss_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'level', type: 'INTEGER', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 94,
    floor: 10,
    name: "Rank Among the Fallen",
    subtitle: "Ties share the same rank",
    description: "The boss tournament uses RANK() so tied scores share a rank. Use RANK() OVER (ORDER BY score DESC) to rank each contender.",
    sqlConcept: "RANK() window function",
    conceptTag: "RANK()",
    goal: "Rank contenders by score, sharing ranks for ties",
    targetTables: ["contenders"],
    targetColumns: ["name", "score"],
    hint1Concept: "RANK() assigns the same rank to ties, then skips ahead (1,1,3 not 1,1,2). DENSE_RANK() is similar but doesn't skip. Both use OVER(ORDER BY ...) to determine order.",
    hint2Example: "SELECT name, RANK() OVER (ORDER BY kills DESC) AS rank FROM warriors;",
    hint3Template: "SELECT name, score, RANK() OVER (ORDER BY score _____) AS rank FROM contenders;",
    sqlHint: "SELECT name, score, RANK() OVER (ORDER BY score DESC) AS rank FROM contenders;",
    sqlSeed: `CREATE TABLE contenders (
  id INTEGER PRIMARY KEY,
  name TEXT,
  score INTEGER
);
INSERT INTO contenders (id, name, score) VALUES (1, 'Aldric', 85);
INSERT INTO contenders (id, name, score) VALUES (2, 'Sera', 92);
INSERT INTO contenders (id, name, score) VALUES (3, 'Bryn', 85);
INSERT INTO contenders (id, name, score) VALUES (4, 'Lyra', 78);
INSERT INTO contenders (id, name, score) VALUES (5, 'Cass', 92);`,
    winCondition: { type: 'rows_returned', table: 'contenders', minRows: 5, description: 'Return all 5 contenders with their ranks' },
    schemas: [
      { name: 'contenders', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'score', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 95,
    floor: 10,
    name: "Running Total",
    subtitle: "Accumulate as you go",
    description: "The boss treasury calculates a running total of gold collected across quests, ordered by quest id. Use SUM() OVER (ORDER BY id) to compute it.",
    sqlConcept: "Running total with SUM() window",
    conceptTag: "Window SUM",
    goal: "Compute cumulative gold collected per quest row",
    targetTables: ["boss_quests"],
    targetColumns: ["gold"],
    hint1Concept: "SUM() with OVER (ORDER BY ...) computes a running (cumulative) total. Each row shows the sum of all previous rows plus itself, in the specified order.",
    hint2Example: "SELECT date, amount, SUM(amount) OVER (ORDER BY date) AS running_total FROM payments;",
    hint3Template: "SELECT title, gold, SUM(gold) OVER (ORDER BY _____) AS running_total FROM boss_quests;",
    sqlHint: "SELECT title, gold, SUM(gold) OVER (ORDER BY id) AS running_total FROM boss_quests;",
    sqlSeed: `CREATE TABLE boss_quests (
  id INTEGER PRIMARY KEY,
  title TEXT,
  gold INTEGER
);
INSERT INTO boss_quests (id, title, gold) VALUES (1, 'First Strike', 100);
INSERT INTO boss_quests (id, title, gold) VALUES (2, 'Goblin Slayer', 150);
INSERT INTO boss_quests (id, title, gold) VALUES (3, 'Cave Cleanse', 200);
INSERT INTO boss_quests (id, title, gold) VALUES (4, 'Dragon Loot', 500);`,
    winCondition: { type: 'rows_returned', table: 'boss_quests', minRows: 4, description: 'Return all 4 quests with running gold total' },
    schemas: [
      { name: 'boss_quests', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'title', type: 'TEXT', nullable: false }, { name: 'gold', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 96,
    floor: 10,
    name: "Partitioned Power",
    subtitle: "Rank within groups",
    description: "Rank each hero within their class by level. Use ROW_NUMBER() OVER (PARTITION BY class ORDER BY level DESC) to restart numbering for each class.",
    sqlConcept: "Window function with PARTITION BY",
    conceptTag: "PARTITION BY",
    goal: "Assign within-class ranks to heroes by level",
    targetTables: ["ranked_heroes"],
    targetColumns: ["name", "class", "level"],
    hint1Concept: "PARTITION BY inside OVER divides rows into groups (like GROUP BY) and applies the window function separately within each partition. The numbering restarts for each partition.",
    hint2Example: "SELECT name, dept, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank FROM employees;",
    hint3Template: "SELECT name, class, level, ROW_NUMBER() OVER (PARTITION BY _____ ORDER BY level DESC) AS class_rank FROM ranked_heroes;",
    sqlHint: "SELECT name, class, level, ROW_NUMBER() OVER (PARTITION BY class ORDER BY level DESC) AS class_rank FROM ranked_heroes;",
    sqlSeed: `CREATE TABLE ranked_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  class TEXT,
  level INTEGER
);
INSERT INTO ranked_heroes (id, name, class, level) VALUES (1, 'Aldric', 'warrior', 10);
INSERT INTO ranked_heroes (id, name, class, level) VALUES (2, 'Brax', 'warrior', 14);
INSERT INTO ranked_heroes (id, name, class, level) VALUES (3, 'Zora', 'mage', 12);
INSERT INTO ranked_heroes (id, name, class, level) VALUES (4, 'Elara', 'mage', 9);
INSERT INTO ranked_heroes (id, name, class, level) VALUES (5, 'Sera', 'cleric', 11);
INSERT INTO ranked_heroes (id, name, class, level) VALUES (6, 'Lyra', 'cleric', 8);`,
    winCondition: { type: 'rows_returned', table: 'ranked_heroes', minRows: 6, description: 'Return all 6 heroes with within-class ranks' },
    schemas: [
      { name: 'ranked_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'class', type: 'TEXT', nullable: false }, { name: 'level', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 97,
    floor: 10,
    name: "Create the Realm",
    subtitle: "Forge a table from nothing",
    description: "The grandmaster commands you to forge a new table: create a 'legends' table with columns id (INTEGER PRIMARY KEY), name (TEXT), and power (INTEGER).",
    sqlConcept: "CREATE TABLE",
    conceptTag: "CREATE TABLE",
    goal: "Create a new 'legends' table with the specified schema",
    targetTables: ["legends"],
    targetColumns: ["id", "name", "power"],
    hint1Concept: "CREATE TABLE defines a new table with column names and their data types. PRIMARY KEY marks the unique identifier column.",
    hint2Example: "CREATE TABLE artifacts (id INTEGER PRIMARY KEY, name TEXT, rarity TEXT);",
    hint3Template: "CREATE TABLE legends (id INTEGER PRIMARY KEY, name TEXT, power _____);" ,
    sqlHint: "CREATE TABLE legends (id INTEGER PRIMARY KEY, name TEXT, power INTEGER);",
    sqlSeed: `CREATE TABLE existing_lore (
  id INTEGER PRIMARY KEY,
  note TEXT
);
INSERT INTO existing_lore (id, note) VALUES (1, 'The table does not exist yet. Create it.');`,
    winCondition: { type: 'custom_sql', table: 'legends', checkSql: "SELECT name FROM sqlite_master WHERE type='table' AND name='legends'", description: 'Verify that the legends table was created' },
    schemas: [
      { name: 'existing_lore', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'note', type: 'TEXT', nullable: false } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 98,
    floor: 10,
    name: "LAG of the Past",
    subtitle: "Look back one row",
    description: "The grandmaster's chronicle shows how each hero's power compares to the previous one. Use LAG(power) OVER (ORDER BY id) to access the previous row's power.",
    sqlConcept: "LAG() window function",
    conceptTag: "LAG()",
    goal: "Return each hero's power and the previous row's power using LAG",
    targetTables: ["boss_chronicle"],
    targetColumns: ["name", "power"],
    hint1Concept: "LAG(column) OVER (ORDER BY ...) returns the value of a column from the previous row in the specified order. The first row gets NULL since there is no previous row.",
    hint2Example: "SELECT date, revenue, LAG(revenue) OVER (ORDER BY date) AS prev_revenue FROM daily_sales;",
    hint3Template: "SELECT name, power, LAG(power) OVER (ORDER BY id) AS prev_power FROM boss_chronicle;",
    sqlHint: "SELECT name, power, LAG(power) OVER (ORDER BY id) AS prev_power FROM boss_chronicle;",
    sqlSeed: `CREATE TABLE boss_chronicle (
  id INTEGER PRIMARY KEY,
  name TEXT,
  power INTEGER
);
INSERT INTO boss_chronicle (id, name, power) VALUES (1, 'The Apprentice', 10);
INSERT INTO boss_chronicle (id, name, power) VALUES (2, 'The Journeyman', 30);
INSERT INTO boss_chronicle (id, name, power) VALUES (3, 'The Adept', 55);
INSERT INTO boss_chronicle (id, name, power) VALUES (4, 'The Master', 80);
INSERT INTO boss_chronicle (id, name, power) VALUES (5, 'The Grandmaster', 120);`,
    winCondition: { type: 'rows_returned', table: 'boss_chronicle', minRows: 5, description: 'Return all 5 chronicle rows with lag power' },
    schemas: [
      { name: 'boss_chronicle', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'power', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 99,
    floor: 10,
    name: "The Recursive Labyrinth",
    subtitle: "A CTE that calls itself",
    description: "The labyrinth's map is stored as a recursive structure: each room has a parent_id. Use a recursive CTE to traverse from the entrance (id=1) through all connected rooms.",
    sqlConcept: "Recursive CTE",
    conceptTag: "Recursive CTE",
    goal: "Traverse all labyrinth rooms from the entrance using a recursive CTE",
    targetTables: ["labyrinth_rooms"],
    targetColumns: ["id", "name", "parent_id"],
    hint1Concept: "A recursive CTE has two parts joined by UNION ALL: the base case (the starting row) and the recursive step (each step joins back to the CTE). It is used for hierarchical or graph traversal.",
    hint2Example: "WITH RECURSIVE tree AS (SELECT id, name, parent_id FROM nodes WHERE parent_id IS NULL UNION ALL SELECT n.id, n.name, n.parent_id FROM nodes n JOIN tree t ON n.parent_id = t.id) SELECT * FROM tree;",
    hint3Template: "WITH RECURSIVE path AS (SELECT id, name, parent_id FROM labyrinth_rooms WHERE id = 1 UNION ALL SELECT r.id, r.name, r.parent_id FROM labyrinth_rooms r JOIN path p ON r.parent_id = p._____) SELECT * FROM path;",
    sqlHint: "WITH RECURSIVE path AS (SELECT id, name, parent_id FROM labyrinth_rooms WHERE id = 1 UNION ALL SELECT r.id, r.name, r.parent_id FROM labyrinth_rooms r JOIN path p ON r.parent_id = p.id) SELECT * FROM path;",
    sqlSeed: `CREATE TABLE labyrinth_rooms (
  id INTEGER PRIMARY KEY,
  name TEXT,
  parent_id INTEGER
);
INSERT INTO labyrinth_rooms (id, name, parent_id) VALUES (1, 'Entrance Hall', NULL);
INSERT INTO labyrinth_rooms (id, name, parent_id) VALUES (2, 'Torch Corridor', 1);
INSERT INTO labyrinth_rooms (id, name, parent_id) VALUES (3, 'Stone Chamber', 1);
INSERT INTO labyrinth_rooms (id, name, parent_id) VALUES (4, 'Deep Passage', 2);
INSERT INTO labyrinth_rooms (id, name, parent_id) VALUES (5, 'Boss Lair', 4);
INSERT INTO labyrinth_rooms (id, name, parent_id) VALUES (6, 'Hidden Alcove', 3);`,
    winCondition: { type: 'rows_returned', table: 'labyrinth_rooms', minRows: 6, description: 'Traverse all 6 rooms from the entrance' },
    schemas: [
      { name: 'labyrinth_rooms', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'parent_id', type: 'INTEGER', nullable: true } ] }
    ],
    bgTheme: 'boss'
  },
  {
    id: 100,
    floor: 10,
    name: "The Final Reckoning",
    subtitle: "Grandmaster's ultimate test",
    description: "The dungeon's final challenge: use a CTE to compute each hero's total quest reward, then rank them with DENSE_RANK() OVER (ORDER BY total DESC), returning only the top 3 by rank.",
    sqlConcept: "CTE + Window function + LIMIT",
    conceptTag: "Grandmaster combo",
    goal: "Rank heroes by total quest reward using CTE and DENSE_RANK, return top 3",
    targetTables: ["final_heroes", "final_quests"],
    targetColumns: ["final_heroes.name"],
    hint1Concept: "Combine everything: a CTE to aggregate per-hero totals, DENSE_RANK() as a window function to assign ranks without gaps, and a WHERE or LIMIT to restrict to the top N.",
    hint2Example: "WITH totals AS (SELECT user_id, SUM(amount) AS total FROM orders GROUP BY user_id) SELECT user_id, total, DENSE_RANK() OVER (ORDER BY total DESC) AS rnk FROM totals;",
    hint3Template: "WITH hero_totals AS (SELECT h.name, SUM(q.reward) AS total FROM final_heroes h JOIN final_quests q ON h.id = q.hero_id GROUP BY h.name) SELECT name, total, DENSE_RANK() OVER (ORDER BY total DESC) AS rnk FROM hero_totals LIMIT _____;",
    sqlHint: "WITH hero_totals AS (SELECT h.name, SUM(q.reward) AS total FROM final_heroes h JOIN final_quests q ON h.id = q.hero_id GROUP BY h.name) SELECT name, total, DENSE_RANK() OVER (ORDER BY total DESC) AS rnk FROM hero_totals LIMIT 3;",
    sqlSeed: `CREATE TABLE final_heroes (
  id INTEGER PRIMARY KEY,
  name TEXT,
  class TEXT
);
CREATE TABLE final_quests (
  id INTEGER PRIMARY KEY,
  title TEXT,
  hero_id INTEGER,
  reward INTEGER
);
INSERT INTO final_heroes (id, name, class) VALUES (1, 'Aldric the Brave', 'warrior');
INSERT INTO final_heroes (id, name, class) VALUES (2, 'Zora the Wise', 'mage');
INSERT INTO final_heroes (id, name, class) VALUES (3, 'Bryn the Swift', 'rogue');
INSERT INTO final_heroes (id, name, class) VALUES (4, 'Lyra the True', 'ranger');
INSERT INTO final_quests (id, title, hero_id, reward) VALUES (1, 'Dragon Siege', 1, 600);
INSERT INTO final_quests (id, title, hero_id, reward) VALUES (2, 'Void Rift', 1, 400);
INSERT INTO final_quests (id, title, hero_id, reward) VALUES (3, 'Arcane Heist', 2, 700);
INSERT INTO final_quests (id, title, hero_id, reward) VALUES (4, 'Shadow Run', 2, 300);
INSERT INTO final_quests (id, title, hero_id, reward) VALUES (5, 'Relic Chase', 3, 500);
INSERT INTO final_quests (id, title, hero_id, reward) VALUES (6, 'Dungeon Core', 4, 450);
INSERT INTO final_quests (id, title, hero_id, reward) VALUES (7, 'Cursed Vault', 4, 350);`,
    winCondition: { type: 'rows_returned', table: 'final_heroes', minRows: 3, description: 'Return the top 3 heroes by total quest reward' },
    schemas: [
      { name: 'final_heroes', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'name', type: 'TEXT', nullable: false }, { name: 'class', type: 'TEXT', nullable: false } ] },
      { name: 'final_quests', columns: [ { name: 'id', type: 'INTEGER', nullable: false }, { name: 'title', type: 'TEXT', nullable: false }, { name: 'hero_id', type: 'INTEGER', nullable: false }, { name: 'reward', type: 'INTEGER', nullable: false } ] }
    ],
    bgTheme: 'boss'
  }
];

export default CURRICULUM;

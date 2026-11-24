# 🗡️ SQL Dungeon

**A retro 16-bit dark-fantasy browser RPG stitched together with a real in-memory SQLite database engine (`sql.js`).**

Built for the **Kiroween Hackathon (Frankenstein Category)** using **Kiro**'s spec-driven development workflow.

---

## 📸 Screenshots

| Skill Entry & Field Manual | Live Dungeon & Visual Schema Inspector |
| :---: | :---: |
| ![Skill Selection & Field Manual](screenshots/1-onboarding.png) | ![Dungeon Gameplay & Hover Badges](screenshots/2-gameplay.png) |
| **3-Stage "Teach First" Hint System** | **100-Level Mastery Curriculum** |
| ![3-Stage Teaching Hints](screenshots/3-hints.png) | ![100-Level Dungeon Floors](screenshots/4-curriculum.png) |

---

## 🎮 What is SQL Dungeon?
In **SQL Dungeon**, you don't use arrow keys or attack buttons to survive—you use **real SQL queries**. Every monster, treasure chest, locked gate, and trap in the 2D dungeon is a live row inside a client-side SQLite database running via WebAssembly.

Whether you have never written a line of SQL or already know complex window functions, SQL Dungeon takes you through **100 structured levels across 10 themed dungeon floors** to help you master relational databases through gameplay.

---

## ✨ Key Features
- **🎯 Adaptive Skill Entry:** Choose between *Just Started (Total Beginner)*, *Beginner (Knows Basics)*, or *Advanced (SQL Warrior)* to jump straight into the right difficulty tier.
- **📖 Interactive SQL & Dungeon Field Manual:** Built-in beginner guide translating database terms (`TABLE`, `ROW`, `COLUMN`, `SELECT`, `WHERE`, `UPDATE`, `DELETE`) into intuitive RPG analogies.
- **🔍 Zero-Confusion Visual Database Mapping:** Hover over any dungeon entity (goblins, chests, doors) to inspect its exact table name, row ID, and column stats—plus clickable schema pills in the terminal to prevent typos.
- **🧠 3-Stage "Teach First" Hint System:** Never spoils the answer immediately:
  1. **Concept Explanation:** Plain-English breakdown of the required SQL keyword or syntax error.
  2. **Analogous Example:** A working query on a *different* scenario so you learn the pattern.
  3. **Fill-in-the-Blank Template:** A structured skeleton to help you finish the query yourself.
- **🏰 100-Level SQL Mastery Curriculum (10 Floors):**
  - **Floor 1 (Levels 1–10):** `SELECT`, columns, `DISTINCT`, `LIMIT`, `AS`
  - **Floor 2 (Levels 11–20):** `WHERE`, comparison operators, `AND`, `OR`, `NOT`
  - **Floor 3 (Levels 21–30):** `BETWEEN`, `IN`, `LIKE` wildcards, `IS NULL`
  - **Floor 4 (Levels 31–40):** `ORDER BY ASC/DESC`, pagination (`LIMIT` & `OFFSET`)
  - **Floor 5 (Levels 41–50):** Aggregations (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `ROUND`)
  - **Floor 6 (Levels 51–60):** `GROUP BY` & `HAVING`
  - **Floor 7 (Levels 61–70):** Data mutations (`INSERT INTO`, `UPDATE`, `DELETE`, `CASE WHEN`)
  - **Floor 8 (Levels 71–80):** Multi-table `INNER JOIN` & `LEFT JOIN`
  - **Floor 9 (Levels 81–90):** Subqueries, `EXISTS`, `UNION` / `UNION ALL`
  - **Floor 10 (Levels 91–100):** CTEs (`WITH`), Window Functions (`ROW_NUMBER`, `RANK`, `OVER`), `CREATE TABLE`, `INDEX`, & Boss Challenges
- **🔊 Zero External Assets:** 100% self-contained pixel-art Canvas rendering and procedural 16-bit sound effects synthesized via the browser **Web Audio API**.

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Database Engine:** `sql.js` (SQLite compiled to WebAssembly)
- **Graphics & Audio:** HTML5 Canvas + Web Audio API
- **AI-Native Engineering:** Kiro (Specs, Steering Rules, and Agent Hooks)

---

## 🤖 How Kiro Was Used
This repository includes the `.kiro/` directory showcasing our spec-driven workflow:
- **`.kiro/specs/`:** Full requirements, technical architecture design, and step-by-step task breakdowns separating the WebAssembly SQLite engine from the React UI.
- **`.kiro/steering/`:** Project coding standards enforcing strict TypeScript (no `any`), isolated `sql.js` execution with safe `try/catch` error handling, and zero external asset dependencies.
- **`.kiro/hooks/`:** Automated validation rules ensuring every level's SQLite seed schema and target solution execute cleanly.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Run
```bash
# 1. Clone the repository
git clone https://github.com
cd sql-dungeon

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
Open `http://localhost:5173` in your browser and enter the dungeon!

---

## 📄 License
MIT License — feel free to fork, learn, and build your own dungeon levels!


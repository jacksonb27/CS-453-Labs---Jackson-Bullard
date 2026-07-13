import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.PGHOST ?? "127.0.0.1",
  port: Number(process.env.PGPORT ?? 5433),
  database: process.env.PGDATABASE ?? "lab05",
  user: process.env.PGUSER ?? "postgres",
  password: process.env.PGPASSWORD ?? "postgres"
});

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ]
  }));

  app.get("/health", async (req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({ status: "ok" });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(500).json({
        status: "error",
        message: "Database connection failed."
      });
    }
  });

  // Starter route: return every item from the database.
  app.get("/api/items", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, name, quantity
        FROM items
        ORDER BY id ASC
      `);

      res.json({ items: result.rows });
    } catch (error) {
      console.error("Failed to load items:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to load items."
      });
    }
  });

  // Starter route: create one item so the client can demonstrate a write.
  app.post("/api/items", async (req, res) => {
    const name = req.body?.name?.trim();
    const quantity = Number(req.body?.quantity);

    if (!name || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        error: "Bad Request",
        message: "A name and non-negative integer quantity are required."
      });
    }

    try {
      const result = await pool.query(
        `
          INSERT INTO items (name, quantity)
          VALUES ($1, $2)
          RETURNING id, name, quantity
        `,
        [name, quantity]
      );

      res.status(201).json({ item: result.rows[0] });
    } catch (error) {
      console.error("Failed to add item:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to add item."
      });
    }
  });

///////////////////////////////////////////////////////////////

  // returns an item by ID
  app.get("/api/items/:id", async (req, res) => {
    try {
      const tempItem = await pool.query(
        "SELECT id, name, quantity FROM items WHERE id = $1",
        [req.params.id]
      );

      if (tempItem.rows.length != 0) {
        return res.json({ item: tempItem.rows[0] });
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  });

  // replaces an item by ID
  app.put("/api/items/:id", async (req, res) => {
    const replaceItem = req.body;

    if (!replaceItem.name || !Number.isInteger(replaceItem.quantity) || replaceItem.quantity < 0) {
      return res.sendStatus(400);
    }

    try {
      const starterItem = await pool.query(
        `UPDATE items
        SET name = $1, quantity = $2
        WHERE id = $3
        RETURNING id, name, quantity`,
        [replaceItem.name, replaceItem.quantity, req.params.id]
      );

      if (starterItem.rows.length != 0) {
        return res.json({ item: starterItem.rows[0] });
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  });

  // partially updates item by ID
  app.patch("/api/items/:id", async (req, res) => {
    try {
      const starterItem = await pool.query(
        "SELECT id, name, quantity FROM items WHERE id = $1",
        [req.params.id]
      );

      if (starterItem.rows.length == 0) {
        return res.sendStatus(404);
      }

      const patchItem = starterItem.rows[0];

      if (req.body.name != undefined)
        patchItem.name = req.body.name;

      if (req.body.quantity != undefined)
        patchItem.quantity = Number(req.body.quantity);

      if (!patchItem.name || !Number.isInteger(patchItem.quantity) || patchItem.quantity < 0) {
        return res.sendStatus(400);
      }

      const result = await pool.query(
        `UPDATE items
        SET name = $1, quantity = $2
        WHERE id = $3
        RETURNING id, name, quantity`,
        [patchItem.name, patchItem.quantity, req.params.id]
      );

      return res.json({item: result.rows[0]});
    } catch (error) {
      return res.sendStatus(500);
    }
  });

  // deletes an item by specified ID
  app.delete("/api/items/:id", async (req, res) => {
    try {
      const starterItem = await pool.query(
        "DELETE FROM items WHERE id = $1 RETURNING id",
        [req.params.id]
      );

      if (starterItem.rows.length != 0) {
        return res.sendStatus(204);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  });

  app.use((req, res) => {
    res.sendStatus(404);
  });

  return app;
}

////////////////////////////////////////////////////////////////////

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity >= 0)
    )
  `);

  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM items");

  if (rows[0].count === 0) {
    await pool.query(
      `
        INSERT INTO items (name, quantity)
        VALUES ($1, $2), ($3, $4), ($5, $6)
      `,
      ["Keyboard", 10, "Mouse", 5, "Monitor", 3]
    );
  }
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

if (isMainModule) {
  const app = createApp();

  initializeDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Lab 5 API listening on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Server startup failed:", error);
      process.exit(1);
    });
}
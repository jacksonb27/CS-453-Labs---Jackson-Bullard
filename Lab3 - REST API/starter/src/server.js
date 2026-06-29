import express from "express";

export function createApp() {
  const app = express();
  app.use(express.json());

  // Starter data. This data is stored in memory and will reset when the
  // server restarts.
  let nextId = 3;
  const items = [
    { id: 1, name: "keyboard", quantity: 10 },
    { id: 2, name: "mouse", quantity: 5 },
  ];

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Return all items.
  app.get("/items", (req, res) => {
    res.json(items);
  });

  // Return one item by ID.
  app.get("/items/:id", (req, res) => {
    const item = items.find((i) => i.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  });

  // Create a new item.
  app.post("/items", (req, res) => {
    const { name, quantity } = req.body;
    if (name === undefined || quantity === undefined) {
      return res.status(400).json({ error: "name and quantity are required" });
    }
    const newItem = { id: nextId++, name, quantity };
    items.push(newItem);
    res.status(201).json(newItem);
  });

  // Update an existing item.
  app.put("/items/:id", (req, res) => {
    const index = items.findIndex((i) => i.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Item not found" });
    const { name, quantity } = req.body;
    if (name === undefined || quantity === undefined) {
      return res.status(400).json({ error: "name and quantity are required" });
    }
    items[index] = { id: items[index].id, name, quantity };
    res.json(items[index]);
  });

  // Delete an existing item.
  app.delete("/items/:id", (req, res) => {
    const index = items.findIndex((i) => i.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Item not found" });
    items.splice(index, 1);
    res.status(204).send();
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;
if (isMainModule) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Lab 3 REST API listening on port ${PORT}`);
  });
}
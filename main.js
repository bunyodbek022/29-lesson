import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors()); 
app.use(express.json());

const FILE = "./expenses.json";

// JSON faylni o‘qish
function readExpenses() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8") || "[]");
}

// JSON faylga yozish
function writeExpenses(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// 🔹 GET - barcha expenses
app.get("/expenses", (req, res) => {
  const expenses = readExpenses();
  res.json(expenses);
});

// 🔹 GET - bitta expense (id bo‘yicha)
app.get("/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const expense = expenses.find(e => e.id === parseInt(req.params.id));
  if (!expense) return res.status(404).json({ error: "Expense not found" });
  res.json(expense);
});

// 🔹 POST - yangi expense qo‘shish
app.post("/expenses", (req, res) => {
  const expenses = readExpenses();
  const newExpense = {
    id: Date.now(),
    ...req.body
  };
  expenses.push(newExpense);
  writeExpenses(expenses);
  res.json(newExpense);
});

// 🔹 PUT - mavjud expense yangilash
app.put("/expenses/:id", (req, res) => {
  let expenses = readExpenses();
  const index = expenses.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Expense not found" });

  expenses[index] = { ...expenses[index], ...req.body };
  writeExpenses(expenses);
  res.json(expenses[index]);
});

// 🔹 DELETE - bitta expense o‘chirish
app.delete("/expenses/:id", (req, res) => {
  let expenses = readExpenses();
  expenses = expenses.filter(e => e.id !== parseInt(req.params.id));
  writeExpenses(expenses);
  res.json({ success: true });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));

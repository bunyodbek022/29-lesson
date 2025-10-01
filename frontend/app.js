let API_URL = "http://localhost:3000/expenses"

const totalAmountEl = document.getElementById("totalAmount")
const tableBody = document.getElementById("expenseTable")
const formContainer = document.getElementById("formContainer")
const addBtn = document.getElementById("addBtn")
const saveBtn = document.getElementById("saveBtn")
const cancelBtn = document.getElementById("cancelBtn")

const dateInput = document.getElementById("dateInput")
const descInput = document.getElementById("descInput")
const catInput = document.getElementById("catInput")
const amountInput = document.getElementById("amountInput")

const searchInput = document.getElementById("searchInput")

let editingId = null
let expenses = []


async function fetchExpenses() {
  const res = await fetch(API_URL)
  expenses = await res.json()
  renderTable(expenses)
}

function renderTable(data) {
  tableBody.innerHTML = ""
  let total = 0

  data.forEach(exp => {
    total += parseFloat(exp.amount)

    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.description}</td>
      <td>${exp.category}</td>
      <td>$${exp.amount}</td>
      <td>
        <button onclick="editExpense(${exp.id})"> <i class="fa-solid fa-pen-to-square"></i>Edit</button>
        <button onclick="deleteExpense(${exp.id})"><i class="fa-solid fa-trash"></i>Delete</button>
      </td>
    `
    tableBody.appendChild(row)
  })

  totalAmountEl.textContent = total.toFixed(2)
}

saveBtn.addEventListener("click", async () => {
  const expense = {
    date: dateInput.value,
    description: descInput.value,
    category: catInput.value,
    amount: parseFloat(amountInput.value).toFixed(2)
  }

  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)
    })
    editingId = null
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)
    })
  }

  formContainer.classList.add("hidden")
  fetchExpenses()
})


function editExpense(id) {
  const exp = expenses.find(e => e.id === id)
  dateInput.value = exp.date
  descInput.value = exp.description
  catInput.value = exp.category
  amountInput.value = exp.amount
  editingId = id
  formContainer.classList.remove("hidden")
}


async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" })
  fetchExpenses()
}


searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase()
  const filtered = expenses.filter(exp =>
    exp.description.toLowerCase().includes(keyword) ||
    exp.category.toLowerCase().includes(keyword) ||
    exp.date.includes(keyword)
  )
  renderTable(filtered)
})

addBtn.addEventListener("click", () => formContainer.classList.remove("hidden"))
cancelBtn.addEventListener("click", () => formContainer.classList.add("hidden"))


fetchExpenses()
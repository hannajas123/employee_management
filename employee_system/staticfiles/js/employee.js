// employee.js
const token = localStorage.getItem("access");
const tableBody = document.getElementById("employee-table");
const formSelect = document.getElementById("form-select");
const dynamicFieldsDiv = document.getElementById("dynamic-fields");

// Load employees
async function loadEmployees() {
  try {
    const res = await axios.get("/api/employees/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    tableBody.innerHTML = "";
    res.data.forEach((emp, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${emp.form}</td>
        <td><pre>${JSON.stringify(emp.data, null, 2)}</pre></td>
        <td>${new Date(emp.created_at).toLocaleDateString()}</td>
        <td><button class="btn btn-sm btn-danger" onclick="deleteEmployee(${emp.id})">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

// Delete employee
async function deleteEmployee(id) {
  if (!confirm("Delete employee?")) return;
  await axios.delete(`/api/employees/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  loadEmployees();
}

// Load dynamic forms in dropdown
async function loadForms() {
  const res = await axios.get("/api/forms/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  formSelect.innerHTML = "<option value=''>Select Form</option>";
  res.data.forEach(f => {
    formSelect.innerHTML += `<option value="${f.id}">${f.name}</option>`;
  });
}

formSelect.addEventListener("change", async e => {
  const formId = e.target.value;
  if (!formId) return (dynamicFieldsDiv.innerHTML = "");
  const res = await axios.get(`/api/forms/${formId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const fields = res.data.fields;
  renderDynamicFields(fields);
});

function renderDynamicFields(fields) {
  dynamicFieldsDiv.innerHTML = "";
  fields.forEach(f => {
    const div = document.createElement("div");
    div.className = "mb-3";
    div.innerHTML = `
      <label class="form-label">${f.label}${f.required ? " *" : ""}</label>
      <input type="${f.field_type}" class="form-control" data-label="${f.label}" ${f.required ? "required" : ""}>
    `;
    dynamicFieldsDiv.appendChild(div);
  });
}

// Save new employee
document.getElementById("save-employee").addEventListener("click", async () => {
  const formId = formSelect.value;
  if (!formId) return alert("Select a form first!");
  const inputs = dynamicFieldsDiv.querySelectorAll("input");
  const data = {};
  inputs.forEach(i => data[i.dataset.label] = i.value);
  try {
    await axios.post("/api/employees/", { form: formId, data }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    bootstrap.Modal.getInstance(document.getElementById("employeeModal")).hide();
    loadEmployees();
  } catch (err) {
    alert("Error: " + JSON.stringify(err.response?.data || err.message));
  }
});

// Search
document.getElementById("search-term").addEventListener("keyup", async e => {
  const value = e.target.value.trim();
  if (!value) return loadEmployees();
  const res = await axios.get(`/api/employees/?value=${value}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  tableBody.innerHTML = "";
  res.data.forEach((emp, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${emp.form}</td>
      <td><pre>${JSON.stringify(emp.data, null, 2)}</pre></td>
      <td>${new Date(emp.created_at).toLocaleDateString()}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteEmployee(${emp.id})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
});

// Add employee button
document.getElementById("add-employee").addEventListener("click", () => {
  const modal = new bootstrap.Modal(document.getElementById("employeeModal"));
  loadForms();
  modal.show();
});

// initial load
loadEmployees();

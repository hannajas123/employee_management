// // form_builder.js
// let fields = [];

// const container = document.getElementById("fields-container");
// const responseDiv = document.getElementById("response");

// // Add new field
// document.getElementById("add-field").addEventListener("click", () => {
//   const id = fields.length + 1;
//   fields.push({ id, label: "", field_type: "text", required: false, order: id });
//   renderFields();
// });

// function renderFields() {
//   container.innerHTML = "";
//   fields.forEach((f, i) => {
//     const div = document.createElement("div");
//     div.className = "card p-3 mb-2";
//     div.innerHTML = `
//       <div class="row g-2 align-items-center">
//         <div class="col-md-4">
//           <input type="text" class="form-control label" placeholder="Label" value="${f.label}">
//         </div>
//         <div class="col-md-3">
//           <select class="form-select type">
//             <option value="text" ${f.field_type === "text" ? "selected" : ""}>Text</option>
//             <option value="number" ${f.field_type === "number" ? "selected" : ""}>Number</option>
//             <option value="date" ${f.field_type === "date" ? "selected" : ""}>Date</option>
//             <option value="email" ${f.field_type === "email" ? "selected" : ""}>Email</option>
//             <option value="password" ${f.field_type === "password" ? "selected" : ""}>Password</option>
//           </select>
//         </div>
//         <div class="col-md-2 text-center">
//           <input type="checkbox" class="form-check-input required" ${f.required ? "checked" : ""}> Required
//         </div>
//         <div class="col-md-2 text-end">
//           <button class="btn btn-danger btn-sm remove">Remove</button>
//         </div>
//       </div>
//     `;
//     container.appendChild(div);

//     div.querySelector(".label").addEventListener("input", e => fields[i].label = e.target.value);
//     div.querySelector(".type").addEventListener("change", e => fields[i].field_type = e.target.value);
//     div.querySelector(".required").addEventListener("change", e => fields[i].required = e.target.checked);
//     div.querySelector(".remove").addEventListener("click", () => {
//       fields.splice(i, 1);
//       renderFields();
//     });
//   });
// }

// // Save form to backend
// document.getElementById("save-form").addEventListener("click", async () => {
//   const name = document.getElementById("form-name").value.trim();
//   if (!name || fields.length === 0) {
//     showMessage("Please enter form name and at least one field!", "danger");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("access");
//     const payload = { name, fields };
//     const res = await axios.post("/api/forms/", payload, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     showMessage(`✅ Form "${res.data.name}" saved successfully!`, "success");
//     fields = [];
//     renderFields();
//   } catch (err) {
//     const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
//     showMessage(`❌ Error: ${msg}`, "danger");
//   }
// });

// function showMessage(text, type) {
//   responseDiv.textContent = text;
//   responseDiv.className = `alert alert-${type}`;
//   responseDiv.classList.remove("d-none");
//   setTimeout(() => responseDiv.classList.add("d-none"), 4000);
// }
// static/js/formbuilder.js

let fields = [];

function addField(type, label) {
  fields.push({ field_type: type, label: label });
  renderFields();
}

function renderFields() {
  const container = document.getElementById("fields");
  container.innerHTML = "";
  fields.forEach((f, i) => {
    container.innerHTML += `<div>${f.label} (${f.field_type}) 
      <button onclick="moveUp(${i})">↑</button>
      <button onclick="moveDown(${i})">↓</button>
    </div>`;
  });
}

function moveUp(i) {
  if (i > 0) [fields[i], fields[i - 1]] = [fields[i - 1], fields[i]];
  renderFields();
}

function moveDown(i) {
  if (i < fields.length - 1) [fields[i], fields[i + 1]] = [fields[i + 1], fields[i]];
  renderFields();
}

async function saveForm(name) {
  const data = { name, fields };
  await axios.post(`${baseURL}forms/`, data, { headers: getAuthHeader() });
  alert("Form created!");
}

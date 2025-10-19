# 🧑‍💼 Employee Management System (Machine Test)

A full-stack **Employee Management System** built with **Django REST Framework** and **JWT Authentication**, featuring a **Dynamic Form Builder** and an **HTML-rendered frontend** for creating and managing employee data.

---

## 🚀 Project Overview

This project was developed as part of a machine test.  
It provides a modular **Django backend** for managing dynamic forms and employee records, along with a **frontend interface built using HTML, Bootstrap, and JavaScript (Axios)** for smooth user interaction.

> 💡 The evaluation for this project primarily focuses on HTML rendering and user interface functionality.

---

## 🧰 Tech Stack

### **Backend**
- Python 3.x  
- Django 4.x  
- Django REST Framework (DRF)  
- SimpleJWT (JSON Web Token Authentication)

### **Frontend**
- HTML, CSS, Bootstrap 5  
- JavaScript (Axios for AJAX requests)

### **Database**
- SQLite (easily switchable to PostgreSQL/MySQL)

---

## ⚙️ Features

### 🔐 Authentication & Profile
- User Registration (`/api/auth/register/`)
- Login via JWT (`/api/token/`)
- Token Refresh (`/api/token/refresh/`)
- View & Edit Profile (`/api/auth/profile/`)
- Change Password (`/api/auth/change-password/`)
- HTML pages for Register, Login, and Profile

### 🧱 Dynamic Form Builder
- Create dynamic forms with field types: **Text**, **Number**, **Email**, **Date**, etc.
- Add or remove fields dynamically
- Supports drag & drop reordering
- Stores form structure in the database
- Built using **Bootstrap + Axios**
- Accessible via `/form-builder/`

### 👩‍💼 Employee Management
- Create and update employees using custom-built forms
- List all employees with form-based fields displayed dynamically
- Search and filter employees by field values
- Delete employee records
- Fully responsive HTML page with modals and dynamic forms
- Accessible via `/employees/`

### 🧩 REST API Development
- Full RESTful API with JWT authentication
- CRUD operations for Forms and Employees
- Postman collection included for testing APIs

---

## 📁 Project Structure

employee_system/
│
├── accounts/ # Handles user registration, login, profile, password management
│
├── employees/ # Handles dynamic forms and employee CRUD operations
│ ├── models.py
│ ├── serializers.py
│ ├── views.py
│ ├── urls.py
│
├── templates/ # Frontend templates rendered via Django views
│ ├── login.html
│ ├── register.html
│ ├── profile.html
│ ├── form_builder.html
│ ├── employee_list.html
│
├── static/ # Static assets (CSS/JS)
│ ├── js/
│ │ ├── form_builder.js
│ │ ├── employee.js
│
├── employee_system/ # Project settings and global URLs
│
├── requirements.txt
├── manage.py
└── README.md

1 .Create Virtual Environment
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Mac/Linux


2. Install Dependencies

pip install -r requirements.txt


3. Apply Migrations

python manage.py makemigrations
python manage.py migrate

4. Create Superuser
python manage.py createsuperuser

5. Run the Server

python manage.py runserver

6. Access the Application


🛠️ Admin Panel	http://127.0.0.1:8000/admin/ - Django Admin

🧾 Register	http://127.0.0.1:8000/register/ - Create new user

🔑 Login	http://127.0.0.1:8000/login/ - Login and get JWT

👤 Profile	http://127.0.0.1:8000/profile/ - View or edit user details

⚙️ Form Builder	http://127.0.0.1:8000/form-builder/ - Build custom forms

👩‍💼 Employee Management	http://127.0.0.1:8000/employees/ - Manage employees dynamically





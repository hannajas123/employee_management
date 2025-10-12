# 🧑‍💼 Employee Management System (Machine Test)

A full-stack **Employee Management System** built with **Django REST Framework** and **JWT Authentication**, featuring a **Dynamic Form Builder** for creating custom employee data entry forms.

---

## 🚀 Project Overview

This project was developed as part of a machine test.  
It provides a modular backend for managing dynamic forms and employee records, along with a simple frontend interface for building forms and managing employee data.

---

## 🧰 Tech Stack

**Backend:**
- Python 3.x
- Django 4.x
- Django REST Framework (DRF)
- SimpleJWT for token-based authentication

**Frontend:**
- HTML, CSS, Bootstrap
- JavaScript (Axios for API calls)

**Database:**
- SQLite (can easily switch to PostgreSQL/MySQL)

---

## ⚙️ Features

### 🔐 Authentication & Profile
- User Registration (`/api/auth/register/`)
- Login via JWT (`/api/token/`)
- Token Refresh (`/api/token/refresh/`)
- Profile Management (`/api/auth/profile/`)
- Change Password (`/api/auth/change-password/`)

### 🧱 Dynamic Form Builder
- Create forms with custom fields (text, number, date, email, etc.)
- Add/remove fields dynamically
- Supports field ordering and required/optional validation
- Stores form structure in the database
- Built using AJAX (Axios)

### 👩‍💼 Employee Management
- Create and update employee details using selected dynamic forms
- List and filter employee records
- Search by dynamic field labels (e.g., name, department)
- Delete employees
- Uses JSONField to store flexible employee data

### 🧩 API Development
- Full RESTful API with JWT authentication
- Supports CRUD for Forms and Employees
- Includes Postman collection for quick testing

---

## 📁 Project Structure

employee_system/
│
├── accounts/ # Handles authentication and profile management
│
├── employees/ # Dynamic form and employee CRUD
│ ├── models.py
│ ├── serializers.py
│ ├── views.py
│ ├── urls.py
│
├── templates/ # Frontend templates
│ ├── form_builder.html
│ ├── employee_list.html
│
├── static/ # Static assets
│ ├── js/
│ ├── form_builder.js
│ ├── employee.js
│
├── employee_system/ # Project settings and URLs
│
├── requirements.txt
├── manage.py

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

Admin Panel → http://127.0.0.1:8000/admin/

Form Builder → http://127.0.0.1:8000/form-builder/

Employee List → http://127.0.0.1:8000/employees/


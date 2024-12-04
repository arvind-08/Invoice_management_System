# Invoice Management System

This is a full-stack Invoice Management System built using **Django** for the backend and **React** for the frontend. It allows users to create, view, and manage invoices efficiently.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)

---

## Features
- Create, edit, and delete invoices.
- Add multiple line items with automatic total calculations.
- Search and filter invoices by various criteria.
- User-friendly interface with responsive design.

---

## Technologies Used
- **Backend:** Django, Django REST Framework
- **Frontend:** React.js
- **Database:** SQLite / PostgreSQL
- **Other:** Axios, React Router

---

### Setup Instructions

## backend-Setup (Django)**
1. **Navigate to the backend folder:**
   ```bash
   cd path/to/your/project/backend
   # Create a virtual environment
   python -m venv venv
   # on Windows
   venv\Scripts\activate
   # on macOS/linux
   source venv/bin/activate
   # Install backend dependencies:
   pip install -r requirements.txt
   # Run database migrations:
   python manage.py migrate
   # Start the Django development server:
   python manage.py runserver

## frontend-Setup (React)**
1. **Navigate to the frontend folder:**
   ```bash
   cd path/to/your/project/frontend
   # Install frontend dependencies:
   npm install
   # Start the React development server:
   npm start

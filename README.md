# E-commerce Single Page Application 

## Project Summary
This project is a full-stack single-page application (SPA) built for a skincare e-commerce store. It extends Assignment 1 by adding a React frontend, JWT authentication, user registration and login, role-based access, and an admin panel. The app is built using the FARM stack (Flask, React, MongoDB) and behaves as a true SPA with no page reloads during navigation. This website is a simple and user-friendly designed for users easily browse product, add them to the cart, update cart quantities or remove items if needed. The cart is connected to a MongoDB database so that the data is stored and updated dynamically instead of only exixting temporarily on the page.

## Technical Stack 
- Frontend: React (Vite), React Router
- Backend and Routing : Python Flask
- Styling: CSS (inline styles and index.css)
- Database : MongoDB Atlas with pymongo
- Authentication: JWT (JSON Web Tokens)
- Deployment : Run locally

## Features
- User registration and login with JWT authentication 
- Role-based access : customer and admin roles
- Live search : filters products in real time as user type
- Add products to cart must require user login
- View cart : increase/decrease quantity, remove items
- Admin panel to view all users' carts, update quantities, remove items
- All data stored in MongoDB Atlas

## Folder Structure

assignment2-ecommerce/
├── backend/
│   ├── app.py                  # Flask API with all routes
│   ├── seed_products.py        # Script to insert products into MongoDB
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables (not pushed to GitHub)
│   └── static/images/          # Product images
└── frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx        # Product listing with live search
│   │   ├── Cart.jsx        # Shopping cart page
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   └── AdminPanel.jsx  # Admin panel
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar
│   │   └── ProductCard.jsx # Individual product card
│   ├── App.jsx             # Routes
│   └── index.css           # Styling
└── index.html              # Single HTML file (SPA)

## CRUD operation implemented
- 'CREATE' : add a product to the cart
- 'READ' : retrieve and display cart items from MongoDB
- 'UPDATE' : update the cart (increase and decrease quantity)
- 'DELETE' : delete the item from the cart

## How to Run the Project
Below are step by step to run the project with command

### 1. Clone the GitHub repository
- git clone https://github.com/nyca02/assignment2-ecommerce.git

### 2. Backend
- go to backend terminal by type : cd backend
- python3 -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt
- python seed_products.py
- python app.py

### 3. Frontend
- open a new terminal and go to frontend terminal by type : cd frontend
- npm install
- npm run dev

- then go to  `http://localhost:5173`

## Default Roles
- Customer : register normally
- Admin : register then set the 'role: "admin" in MongoDB Atlas


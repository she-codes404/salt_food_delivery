# 🍔 Food Ordering Web Application

A full-stack food delivery platform featuring user authentication, shopping cart functionality, secure online payments, and real-time order tracking. Built with modern web technologies for both customers and admins.
<img width="500" alt="Salt_readme" src="https://github.com/user-attachments/assets/28e6385d-60ba-4486-a5cb-6739ac0586e2" />

---

## 🚀 Technologies Used

- **Frontend:** React JS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Payment Processing:** Stripe

---

## ✨ Features

- **User Authentication:** Account creation and login functionality  
- **Food Menu:** Browse and view food items  
- **Shopping Cart:** Add, remove, and edit food selections  
- **Online Ordering:** Seamless checkout experience  
- **Payment Processing:** Secure Stripe integration  
- **Order Tracking:** Real-time status updates  
- **Admin Panel:** Manage food items, orders, and user data

---

## 🗂️ Project Structure

The application is divided into three main components:

- `client/` – Customer-facing frontend (React JS)  
- `admin/` – Admin panel (React JS)  
- `server/` – Backend API (Node.js & Express)

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/food-ordering-app.git
cd food-ordering-app
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

> If your admin panel is in a separate directory (e.g., `admin/`), install those dependencies too:
```bash
cd ../admin
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `server/` directory and add:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## ▶️ Run the Application

### Start Backend
```bash
cd server
npm start
```

### Start Frontend
In a new terminal:
```bash
cd client
npm start
```

> If the admin panel is separate:
```bash
cd admin
npm start
```

---

## 🌐 Usage

- **Customer Website:** [http://localhost:3000](http://localhost:3000)  
- **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin) _(Login required)_

---

## 💳 Payment Integration (Stripe)

Use the following test credentials to simulate payments:

- **Card Number:** `4242 4242 4242 4242`  
- **Expiry:** Any future date  
- **CVC:** Any 3 digits

---

## 🌟 Future Enhancements

- 📱 Mobile app version  
- 💳 Additional payment methods  
- 🚚 Delivery tracking system  
- ⭐ Customer reviews and ratings  
- 🎁 Loyalty and rewards program

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo and submit a Pull Request.

---


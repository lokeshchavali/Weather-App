
# 🌦️ MERN Weather App

This is a full-stack **MERN (MongoDB, Express.js, React (HTML/CSS/JS here), Node.js)** based **Weather Dashboard App**. It allows users to:

- 🔍 Search and view weather for cities using OpenWeather API
- 🌍 Add cities to a personalized dashboard
- 💾 Save cities to MongoDB via backend
- ❌ Remove saved cities
- 📡 Toggle temperature units (°C / °F)

---

## 📁 Project Structure

```
weather-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── search.html
│   ├── world.html
│   ├── css/
│   ├── js/
│   └── img/
```

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API:** [OpenWeatherMap](https://openweathermap.org/api)

---

## ⚙️ Setup Instructions

### 📦 1. Clone the Repo
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 🚀 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/weatherApp
```

Start MongoDB:
```bash
mongod
```

Start the backend server:
```bash
npm start
```

### 🌐 3. Frontend Usage
Open the file:  
```
frontend/world.html
```
in your browser (or use Live Server in VS Code)

---

## 📸 Screenshots

> Add screenshots of your dashboard here once hosted or developed

---

## 📌 Features

- Location-based forecast display
- Search weather by city
- Save city to dashboard (stored in MongoDB)
- Delete saved cities
- Responsive, animated UI
- Weather icons based on condition

---

## 🔐 Environment Variables

In `/backend/.env`, add:
```env
MONGO_URI=mongodb://localhost:27017/weatherApp
```

---

## 🚧 Future Improvements

- User authentication system
- Store weather data for offline view
- Deploy frontend on Netlify & backend on Render

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developed by

**Chavali Lokesh**  
- B.Tech CSE @ VIT-AP  
- MERN Stack & Security Enthusiast

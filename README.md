# Dropbox-like File Manager

A fullstack Dropbox-like application built with **Spring Boot (Java)** for the backend and **React** for the frontend.

Users can upload, view, and download files using a clean web interface. Supported file types: `.txt`, `.json`, `.jpg`, `.png`

---

## 🚀 Features
- Upload files from your device
- View uploaded files in a list
- Download or view file contents
- Restriction to supported formats only
- Clean, responsive UI with Tailwind CSS

---

## 🧱 Tech Stack

### Backend:
- Java 17
- Spring Boot 3
- Spring Data JPA
- H2 (in-memory) or PostgreSQL (optional)
- Lombok

### Frontend:
- React 18
- React Router DOM
- Axios
- Tailwind CSS

---

## 📁 Project Structure

```
repo-root/
├── backend/               # Spring Boot Application
│   ├── src/
│   ├── pom.xml
│   └── uploads/           # File storage directory
├── frontend/              # React Application
│   ├── src/
│   ├── public/
│   ├── tailwind.config.js
│   ├── package.json
│   └── postcss.config.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/dropbox-clone.git
cd dropbox-clone
```

### 2. Run the Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
> The backend will run on [http://localhost:8080](http://localhost:8080)

You can view the H2 DB console at: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
- JDBC URL: `jdbc:h2:mem:db`
- User: `sa`, Password: (leave blank)

---

### 3. Run the Frontend
```bash
cd ../frontend
npm install
npm start
```
> The frontend will run on [http://localhost:3000](http://localhost:3000)

Make sure this exists in `frontend/package.json` to allow proxying to the backend:
```json
"proxy": "http://localhost:8080"
```

---

## 📬 API Endpoints

| Method | Endpoint               | Description         |
|--------|------------------------|---------------------|
| POST   | `/api/files/upload`    | Upload a file       |
| GET    | `/api/files`           | List uploaded files |
| GET    | `/api/files/{fileName}`| Download/view file  |

---

## 📄 Supported File Types
- `.txt`
- `.json`
- `.jpg`
- `.png`

> Uploads with unsupported formats will return a `400 Bad Request`.

---

## 🛡️ Code Quality Highlights
- Modular folder structure (Controller, Service, Repository)
- Centralized error handling via `@ControllerAdvice`
- Clean React code with separation between `pages` and routing
- Clear variable naming and reusable patterns




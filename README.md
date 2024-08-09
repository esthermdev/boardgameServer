# The Boardgame Shelf - Backend Server

This repository contains the backend server for the Boardgame Shelf application. The server is built with Node.js and Express, and it uses Firestore as the database to manage and store boardgame data. The backend provides RESTful API endpoints to perform CRUD operations on the boardgames.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete boardgames.
- **RESTful API**: Easy-to-use endpoints for managing boardgame data.
- **Firestore Integration**: Utilizes Firestore for data storage and retrieval.
- **Validation**: Ensures data integrity and structure.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Firebase Project with Firestore enabled (may obtain this upon request)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/esthermdev/boardgamesServer.git
cd boardgameServer
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
	- Create a Firebase project and enable Firestore.
	- Download the service account key JSON file from your Firebase project settings and place it in the root directory of the project.
	- Rename the file to `firebaseServiceAccountKey.json`.

4. Create a `.env` file in the root directory and add the following environment variables:
```bash
PORT=8000
FIREBASE_SERVICE_ACCOUNT_KEY=./firebaseServiceAccountKey.json
```
5. Start Server
```bash
npm start
```
6. Port will run on http://localhost:8000/

### Example API Endpoints

#### - Get All Boardgames

`GET /api/boardgames`
#### - Get a Single Boardgame

`GET /api/boardgames/:boardgameId`
#### - Add a New Boardgame

`POST /api/boardgames`

Use in `req.body`:
```
{
  "name": "Everdell",
  "duration": "40-80 minutes",
  "complexity": "Medium",
  "image": "everdell.jpg",
  "players": "1-4",
  "rating": 8,
  "description": "Everdell is a worker placement and tableau-building game...",
  "category": "Strategy",
  "expansions": ["Everdell: Pearlbrook", "Everdell: Bellfaire"],
  "type": "individual",
  "scoring": "points"
}
```

#### - Update a Boardgame

`PUT /api/boardgames/:boardgameId`

Use in `req.body`:
```
{
  "name": "Test Change",
  "duration": "5 minutes",
  "complexity": "Loq",
  "image": "image.jpg",
  "players": "1-2",
  "rating": 8,
  "description": "Test description",
  "category": "Strategy",
  "expansions": ["Test Expansion"],
  "type": "individual",
  "scoring": "points"
}
```

#### - Delete a Boardgame

`DELETE /api/boardgames/:boardgameId`

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

### Contact

For questions or feedback, please open an issue on this repository or contact esmd258@gmail.com.

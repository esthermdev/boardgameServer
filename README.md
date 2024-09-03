# The Boardgame Shelf - Backend Server

This repository contains the backend server for the Boardgame Shelf application. The server is built with Node.js and Express, and it uses Firebase Firestore as the database to manage and store boardgame data. The backend provides RESTful API endpoints to perform CRUD operations on the boardgames.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete boardgames.
- **RESTful API**: Easy-to-use endpoints for managing boardgame data.
- **Firebase Integration**: Utilizes Firebase Firestore for data storage and retrieval.
- **Authentication**: Uses JSON Web Tokens (JWT) for secure API access.

## Important Notes

1. **Firebase Configuration**: This server is configured to work with a specific Firebase project. Users cloning this repository will not have access to the original project's data.

2. **Data Access**: To fully use this server with data:
   - Option A: Contact the repository owner (esmd258@gmail.com) to request access to the original Firebase project and obtain the necessary service account key.
   - Option B: Set up your own Firebase project and populate it with your own data (see "Setting Up Your Own Firebase Project" section below).

3. **Limited CRUD Operations**: Currently, full CRUD operations are only implemented for the boardgame API route. Other routes are limited to GET operations only.

4. **Separate Development**: The server and frontend app were developed separately as part of a coding bootcamp project to learn both frontend and backend web development.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Firebase Project with Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/esthermdev/boardgamesServer.git
cd boardgamesServer
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase (choose one option):
   - Option A: Obtain the service account key file from the repository owner and place it in the root directory as `firebaseServiceAccountKey.json`.
   - Option B: Set up your own Firebase project (see section below).

4. Create a `firebase.js` file in the root directory with the following content:
```javascript
var admin = require("firebase-admin");

var serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'your-project-id' // Replace with your Firebase project ID
});

const db = admin.firestore()

module.exports = { admin, db }
```

5. Create a `.env` file in the root directory and add the following environment variables:
```
PORT=8443
FIREBASE_SERVICE_ACCOUNT_KEY=./firebaseServiceAccountKey.json
JWT_SECRET=your_jwt_secret_here
```

6. Start the server:
```bash
npm start
```

The server will run on `https://localhost:8443`.

## Setting Up Your Own Firebase Project

If you choose to set up your own Firebase project:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Set up Firestore database in your project.
3. Go to Project Settings > Service Accounts.
4. Click "Generate new private key" to download your service account key file.
5. Rename the downloaded file to `firebaseServiceAccountKey.json` and place it in the root directory of this project.
6. Update the `projectId` in the `firebase.js` file to match your Firebase project ID.
7. Populate your Firestore database with boardgame data that matches the expected schema of this application.

Note: If you use your own Firebase project, you'll need to modify the frontend application to work with your backend and database structure.

**Important**: For the expected data schema when using your own Firebase project, please reach out to the repository owner (esmd258@gmail.com). They can provide you with the necessary schema information to ensure your data structure is compatible with the application.

## API Endpoints

### Boardgames (Full CRUD)

- `GET /api/boardgames`: Get all boardgames
- `GET /api/boardgames/:boardgameId`: Get a single boardgame
- `POST /api/boardgames`: Add a new boardgame
- `PUT /api/boardgames/:boardgameId`: Update a boardgame
- `DELETE /api/boardgames/:boardgameId`: Delete a boardgame

### Other Routes (GET only)

- Scores
- Users
- Events
- Trending

## Future Improvements

1. Integrate backend and frontend code for ease of development.
2. Develop full REST APIs for each route to support complete CRUD operations.
3. Implement more robust error handling and input validation.
4. Add comprehensive unit and integration tests.
5. Implement rate limiting and additional security measures.
6. Optimize database queries and implement caching for improved performance.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact

For questions, feedback, to request access to the original Firebase project, or to obtain information about the expected data schema, please contact esmd258@gmail.com or open an issue on this repository.
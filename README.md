# Project Setup Guide
This guide will walk you through the steps to set up and run the frontend and backend projects.

## Pre-requisites
- Before you start, make sure you have the following installed:

- Node.js: Download and install from the Node.js official website.
- Git: Download and install from the Git official website.
- Clone the repositories:

```bash
git clone https://github.com/chanchal11/versionone-apis.git
git clone https://github.com/chanchal11/versionone-react-app.git
```
## Backend Setup
- Navigate to the backend directory
- Install the necessary dependencies:
```bash
npm install
```
- *Optional*: Create the database tables (if not already created):
```bash
node models/index.js
```
- *Optional*: Seed the database with dummy data (if not already done):
```bash
node seed.js
```
- Run the backend server:
```bash
node app.js
```
The backend server should now be running on http://localhost:3000.

## Frontend Setup
- Navigate to the frontend directory
- Install the necessary dependencies:
```bash
npm install
```
- Make sure the backend server is running, then start the frontend application:
```bash
npm start
```
- The frontend application should now be running on http://localhost:3000.

## Notes
- Ensure that both the frontend and backend servers are running simultaneously for the application to function correctly.
- You can access the user list at the root URL (/), and user details can be accessed by clicking on a user in the list.
- If you try to open http://localhost:3000/user-detail directly, it will redirect you to http://localhost:3000/.

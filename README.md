# SessionAuth
Session-based authentication application
## Backend
1. /api/users used for signing a user in
2. /api/session for login and session management
3. Passwords hashed with [bcrypt](https://www.npmjs.com/package/bcryptjs) before saving to the database
## Frontend
1. Uses React with Redux store to maintain user info.

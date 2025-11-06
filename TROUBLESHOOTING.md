# Troubleshooting Guide

## Common Issues and Solutions

### 1. Backend Not Starting

**Error: Cannot find module or MongoDB connection failed**

**Solution:**
1. Make sure you have a `.env` file in the `backend` folder with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Not Starting

**Error: Module not found or compilation errors**

**Solution:**
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

### 3. Login/Register Not Working

**Check:**
- Backend server is running on port 5000
- `.env` file has correct `JWT_SECRET`
- MongoDB connection is working
- Check browser console for errors

### 4. API Calls Failing (404 or CORS errors)

**Solution:**
- Make sure backend is running
- Check that `VITE_API_URL` in frontend matches backend URL (default: http://localhost:5000)
- Backend CORS is enabled (already configured)

### 5. Database Issues

**If MongoDB connection fails:**
- Check your `MONGO_URI` in `.env` file
- Make sure MongoDB Atlas cluster is accessible (whitelist IP if needed)
- Verify database name in connection string

### 6. Authentication Issues

**If tokens are not working:**
- Clear browser localStorage: `localStorage.clear()`
- Make sure `JWT_SECRET` is set in backend `.env`
- Check that token is being sent in Authorization header (automatic via apiFetch)

## Quick Start Checklist

- [ ] Backend `.env` file exists with all required variables
- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] Frontend dependencies installed (`npm install` in frontend folder)
- [ ] MongoDB connection string is correct
- [ ] Backend server starts without errors
- [ ] Frontend dev server starts without errors
- [ ] Can access http://localhost:5000 (backend)
- [ ] Can access http://localhost:5173 (frontend - Vite default)

## Testing the Application

1. **Register a new user:**
   - Go to `/register`
   - Fill in name, email, password
   - Should redirect to dashboard

2. **Login:**
   - Go to `/login`
   - Use registered credentials
   - Should redirect to dashboard

3. **View Quizzes:**
   - Go to `/practice`
   - Should see available quizzes

4. **Take a Quiz:**
   - Click on a quiz
   - Answer questions
   - Results should be saved

5. **Create Resume:**
   - Go to `/resume`
   - Fill in resume form
   - Should save successfully

## Need Help?

If you're still experiencing issues:
1. Check the browser console (F12) for frontend errors
2. Check the backend terminal for server errors
3. Verify all environment variables are set correctly
4. Make sure all dependencies are installed


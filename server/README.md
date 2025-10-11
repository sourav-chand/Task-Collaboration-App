# Server Deployment Guide

## Deploying to Vercel

This server application can be deployed to Vercel as a serverless application.

### Prerequisites

1. A Vercel account
2. MongoDB database (MongoDB Atlas recommended)

### Steps to Deploy

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Log in to your Vercel account and create a new project

3. Import your Git repository

4. Configure the project:

   - Set the **Build and Output Settings**:
     - Build Command: `npm install`
     - Output Directory: (Leave empty)
     - Install Command: `npm install`

5. Add environment variables in the Vercel dashboard:

   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production

6. Deploy the project

### Environment Variables

Make sure to set these environment variables in your Vercel project settings:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### Notes

- The server uses the [api/index.js](file:///C:/Users/Sourav%20Chand/Desktop/project%20management/server/api/index.js) file as the entry point for Vercel deployment
- Socket.io functionality may not work in serverless environments. Consider using a traditional hosting solution if real-time features are essential
- Database connections are managed automatically by Vercel's serverless environment

### Limitations

- Serverless functions have a timeout limit (typically 10-60 seconds)
- WebSocket connections (used by Socket.io) are not persistent in serverless environments
- Long-running processes are not suitable for serverless deployment

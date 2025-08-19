# Event Portal - Full-Stack React + AWS Lambda
## Project Structure

```
event-portal-fullstack/
├── README.md
├── backend/                    # AWS Lambda backend
│   ├── package.json
│   ├── serverless.yml
│   └── src/
│       ├── handlers/          # Lambda functions
│       │   ├── createEvent.ts
│       │   ├── getEvent.ts
│       │   ├── listEvents.ts
│       │   ├── updateEvent.ts
│       │   └── getUploadUrl.ts
│       └── lib/               # Shared utilities
│           ├── db.ts
│           └── types.ts
└── frontend/                  # React frontend
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    ├── .env.example
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── routes/           # Page components
        ├── components/       # Reusable components
        ├── services/         # API calls
        ├── types/            # TypeScript types
        └── styles/           # CSS
```

## Setup Instructions

This document provides comprehensive setup instructions, architecture overview, tech stack details, deployment steps, and common issues for the full-stack React + AWS Lambda event portal project.

Overview:
This project is a dynamic event management portal, enabling users to select templates, fill detailed event forms, view event cards, and see dedicated event pages. It leverages:

Frontend: React with TypeScript (using Vite)
Backend: AWS Lambda (Node.js + AWS SDK v3)
Data Storage: DynamoDB
File Storage: S3
Infrastructure: Serverless Framework
The goal: a fully dynamic, scalable, serverless solution for creating, viewing, and managing event pages with visually appealing and customizable templates.

Core Features:-
Template Selection: Choose between "Classic" and "Modern" layouts.
Multi-Section Dynamic Form: Fill details including speakers, agenda, media, contact info.
Event Cards: View summaries of all created events, filterable by organizer or date.
Full Dynamic Event Page: Rendered using the selected template, with sections like Hero, About, Speakers, etc.
Image Uploads: Upload banners, speaker photos, or partner logos directly to S3 with secure pre-signed URLs.
Real-time Data: Store and fetch data dynamically via Lambda APIs.
Responsiveness: Mobile and desktop friendly designs.

Tech Stack:-

Frontend-
React, TypeScript, Tailwind CSS (custom styles)
React Router v6 for navigation
Axios for API calls
Vite as build tool
Environment variables via .env

Backend-
AWS Lambda (Node.js 20.x runtime)
AWS SDK v3 (Modularized SDK for DynamoDB, S3, etc.)
API Gateway HTTP APIs
DynamoDB (NoSQL database)
S3 Buckets (images & media)
Serverless Framework for deployment
Setup Instructions
Prerequisites
Node.js v16+ installed

AWS CLI configured with appropriate IAM permissions
An AWS account with permissions to create DynamoDB, S3, and deploy via CloudFormation
Basic knowledge of terminal commands

Backend Setup (AWS Lambda + Infrastructure)
1. Prepare the backend folder
```
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

2. Configure AWS Credentials
aws configure
Use an IAM user with permissions: DynamoDB, S3, Lambda, CloudFormation.

3. Deploy using Serverless Framework
```
npm run deploy
```
The deployment creates:
DynamoDB table with GSIs
S3 bucket (for image uploads)
Lambda functions for create, get, list, update events, and presigned URL generation
Retrieve the API Gateway URL from the output.

Frontend Setup
1. Prepare the frontend folder
```
cd ../frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```
2. Configure the API URL
Create .env at project root:
```
VITE_API_BASE=https://your-api-gateway-url
```
Replace your-api-gateway-url with the actual endpoint from your backend deployment.

3. Run development server
```
npm run dev
```
Open http://localhost:5173 in your browser and explore the portal.

Deployment
Backend
Deploy with Serverless Framework:
```
npm run deploy
```
Frontend
Build static files:
```
npm run build
```
Host on static hosting:
Netlify/Vercel: Deploy dist/ folder
AWS S3 + CloudFront: Upload and configure CDN

Known Issues & Troubleshooting
1. Dependency conflicts

Use:
```
npm install --legacy-peer-deps
```
or clean node_modules if errors persist.

2. API Gateway errors (500/400)
500 errors: Usually due to AWS SDK v2 vs v3 issues. Make sure backend is built with the latest code using AWS SDK v3.
400 errors: Often caused by missing required payload fields or validation issues. Confirm form data correctness before submission.

3. S3 Upload Issues
403 errors: Often due to blocked public access settings. Ensure bucket policies allow upload and public access if needed.
Blocked public access: Adjust S3 Block Public Access settings or set objects to public-read via ACL (recommended for test environments only).

4. serverless CLI not found
Use npx serverless if not installed globally, or install globally:
//npm install -g serverless

Common Problems & Fixes
Problem	Likely Cause	Solution
500 Internal Server Error	SDK v2 used instead of v3	Update Lambda dependencies to v3 (see code snippets)
400 Bad Request	Missing required form fields or invalid payload	Add validation in the frontend before submit
S3 upload blocked	Public access or bucket policy issues	Remove block public access, set correct permissions, or use pre-signed URLs with private bucket
Node_modules errors	Corrupted cache or conflicting deps	Clean node_modules and reinstall with npm install --legacy-peer-deps

Final Notes
This project provides a powerful, fully serverless, highly customizable event portal. For production:
Enable proper security (Cognito/Auth)
Use CloudFront for assets and images
Add validation and logging
Expand features like event deletion, editing, and media hosting

# HR System

Welcome to the HR System!

## Features

- **TODO** : Add detailed feature descriptions here

## Getting Started

### Installation

1. Clone the repo

```
git clone https://github.com/sunnydreamer/hrproject.git
```

2. Install NPM packages in 2 frontend folders and 1 backend folder

To install all of them at once, at the root directory, use

```
npm run installDep
```

### Run the project

In the root folder, we've included a simple package.json file with predefined scripts for running the frontend and backend concurrently.

To run all of them, in the root directory, use

```
npm run dev
```

- Angular Server: http://localhost:4200/
- React Server: http://localhost:5173/
- Express Server: http://localhost:3000/

```
"scripts": {
    "react": "cd frontend/react-app && npm run dev",
    "angular": "cd frontend/angular-app && ng serve",
    "backend": "cd backend && npm run dev",
    "frontend": "concurrently \"npm run react\" \"npm run angular\"",
    "dev": "concurrently \"npm run frontend\" \"npm run backend\""
}
```

- Note that our Angular app is version 14. If it cannot run with your Node.js version, try:

In Bash：
`export NODE_OPTIONS=--openssl-legacy-provider`

In Powershell:
`$env:NODE_OPTIONS = "--openssl-legacy-provider"`

###

## Contributing

To make changes to your project and contribute to its development, follow these steps:

1. Update the latest main ( `git checkout main` & `git pull origin main` ) then start making changes to your codes
2. Create your Feature Branch ( `git checkout -b yourname-epicname-featurename` )
3. Commit your Changes ( `git commit -m 'Add some AmazingFeature'` )
4. Push to the Branch ( `git push origin branchName` )
5. Open a Pull Request: the PR title MUST include your Jira ticket number eg. HRPROJ-1

# Web Application Part of the Bachelor Engineering Project
## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js and npm
- Supabase CLI

### Running the Application
Clone the repository and navigate to the project root.

Start the local Supabase backend (will be later changed to cloud solution, for now during dev its local):

```bash
cd backend
supabase start
cd ..
```

Build and start the frontend container:
```bash
docker compose up --build
```

The application is available at http://localhost:3000.

### Development Mode

To run the application with Docker Compose Watch:

```bash
docker compose up --watch
```

### Stopping the Application

```bash
docker compose down
cd backend
supabase stop
```

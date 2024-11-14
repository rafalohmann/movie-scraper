# Movie Scraper Project

This project is a comprehensive system for scraping, enriching, and managing movie data using a Vue.js client, Express API, MongoDB, and a MongoDB admin tool, all orchestrated with Docker Compose and Nginx as a reverse proxy.

## Project Structure

```
movie-scraper-project/
  ├── client/                  # Vue.js frontend app container
  ├── api/                     # Express API container
  ├── mongodb-admin/           # MongoDB frontend admin tool container
  │   ├── Dockerfile
  │   └── config/
  ├── docker-compose.yml       # Docker Compose configuration
  ├── nginx.template.conf      # Nginx configuration template
  ├── .env                     # Environment variables file
  └── README.md                # Project documentation
```

## Features

- **Vue.js Client**:
  - Displays movie records stored in MongoDB.
  - Contains a button to trigger data scraping and updates.
  - Allows users to mark movies as "watched".
- **Express API**:
  - Handles scraping from different sources and enriching data via the OMDB API.
  - Updates MongoDB with new records and deactivates non-existent ones.
- **MongoDB**:
  - Used as the primary database for storing movie data.
- **MongoDB Admin Tool**:
  - Provides a web-based interface to manage the database.
- **Nginx**:
  - Acts as a reverse proxy to route requests to the client and API under the same domain.

## Setup and Installation

### Prerequisites

- Docker and Docker Compose installed on your system.
- An OMDB API key.

### Environment Variables

Create a `.env` file in the root of your project with the following content:

```env
CLIENT_PORT=8080
API_PORT=3000
MONGO_PORT=27017
MONGO_ADMIN_PORT=8081
NGINX_PORT=80

MONGODB_ADMINUSERNAME=uniqueAdminUser
MONGODB_ADMINPASSWORD=uniqueAdminPassword
OMDB_API_KEY=your_omdb_api_key
```

### Docker Compose Configuration

Ensure your `docker-compose.yml` is set up to include all services:

- **client**: Vue.js frontend.
- **api**: Express API.
- **mongo**: MongoDB database.
- **mongo-admin**: MongoDB admin tool (e.g., Mongo Express).
- **nginx**: Nginx reverse proxy.

### Nginx Configuration

**`nginx.template.conf`**:

```nginx
events {}

http {
    server {
        listen 80;

        # Proxy for the client
        location / {
            proxy_pass http://localhost:${CLIENT_PORT}/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Proxy for the API
        location /api {
            proxy_pass http://localhost:${API_PORT};
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### Build and Run the Project

1. **Rebuild and start the containers**:

   ```bash
   docker-compose up --build -d
   ```

2. **Access the services**:
   - **Client**: [http://localhost](http://localhost)
   - **API**: [http://localhost/api](http://localhost/api)
   - **MongoDB Admin Tool**: [http://localhost:8081](http://localhost:8081)

## Troubleshooting

- **Port Conflicts**: Ensure the ports defined in the `.env` file do not conflict with existing services on your host.
- **Container Name Conflicts**: Use `docker rm -f <container_name>` to remove any existing containers causing conflicts.
- **Environment Variable Errors**: Ensure `nginx.template.conf` is correctly processed using `envsubst` in the `entrypoint` of the Nginx service.

## Future Enhancements

- Add support for more streaming services.
- Implement advanced data visualization in the Vue.js client.
- Integrate user authentication for enhanced security.

---

Feel free to contribute, report issues, or suggest features through the GitHub repository.

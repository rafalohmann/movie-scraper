# Use the official Mongo Express image as the base image
FROM mongo-express:latest

# Set environment variables
ENV ME_CONFIG_MONGODB_ADMINUSERNAME=${MONGODB_ADMINUSERNAME}
ENV ME_CONFIG_MONGODB_ADMINPASSWORD=${MONGODB_ADMINPASSWORD}
ENV ME_CONFIG_MONGODB_SERVER=mongo
ENV ME_CONFIG_BASICAUTH_USERNAME=admin
ENV ME_CONFIG_BASICAUTH_PASSWORD=admin
ENV PORT=8081

# Copy any custom configuration files if needed
COPY config/ /config/

# Expose the default port for Mongo Express
EXPOSE $PORT

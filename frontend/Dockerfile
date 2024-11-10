# Stage 1: Build the React app
FROM node:18 as builder

WORKDIR /app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source code to the container
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the built app with NGINX
FROM nginx:alpine

# Copy the built app from the previous stage to NGINX's default location
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port NGINX is running on
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]

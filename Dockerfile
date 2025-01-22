# # Use the official Node.js image with Alpine for a smaller image size
# FROM node:18-alpine

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Install build dependencies for native modules
# RUN apk add --no-cache python3 make g++

# # Copy package.json and package-lock.json (if available)
# COPY package*.json ./

# # Install the dependencies
# RUN npm install

# # Rebuild bcrypt (in case it's a binary issue)
# RUN npm rebuild bcrypt

# # Copy the application source code to the container
# COPY . .

# # Compile TypeScript
# RUN npm run build

# # Expose the port that the app runs on
# EXPOSE 5001

# # Define the command to start the app
# CMD ["npm", "start"]

# ---- Base Node ----
    FROM node:20.5.1-alpine3.18 AS base
    WORKDIR /opt
    RUN apk update && apk add --no-cache git
    COPY package.json package-lock.json ./
    ENV PATH /opt/node_modules/.bin:$PATH
    
    # ---- Dependencies ----
    FROM base AS dependencies
    RUN npm ci
    
    # ---- Copy Files/Build ----
    FROM dependencies AS build
    COPY . .
    RUN npm run build
    
    # --- Release ----
    FROM node:20.5.1-alpine3.18 AS release
    WORKDIR /opt/app
    COPY --from=build /opt ./
    CMD ["npm", "run", "start"]
    
    
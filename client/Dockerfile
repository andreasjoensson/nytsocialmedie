# Uses the node base image with the latest LTS version
FROM node:14.17.5
# Informs Docker that the container listens on the 
# specified network ports at runtime
WORKDIR /
# Copies index.js and the two package files from the local 
# directory to a new app directory on the container
COPY package.json ./
# Installs npm dependencies on container
RUN npm install
COPY . .
# Command container will actually run when called
CMD ["npm", "start"]

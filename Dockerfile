FROM node:18-alpine
WORKDIR /app
COPY public/ ./public
RUN npm install -g http-server
USER node
EXPOSE 3000
CMD ["http-server", "public", "-p", "3000", "-c-1"]

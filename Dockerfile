FROM node:18-alpine
WORKDIR /app
COPY docs/ ./docs
RUN npm install -g http-server
USER node
EXPOSE 3000
CMD ["http-server", "docs", "-p", "3000", "-c-1"]

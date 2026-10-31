# Multi-runtime Dockerfile: Node.js 22 + Python 3.12 for Render Deployment
FROM node:22-bookworm-slim

# Install system dependencies & Python 3 with pip & venv
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Setup Python virtual environment & install Python requirements
COPY earnings_desk/requirements.txt ./earnings_desk/requirements.txt
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --no-cache-dir -r ./earnings_desk/requirements.txt

# Install Node server dependencies
COPY server/package.json ./server/
RUN cd server && npm install

# Install Client dependencies & build React app
COPY client/package.json ./client/
RUN cd client && npm install

# Copy application source code
COPY . .

# Build React client into client/dist
RUN cd client && npm run build

# Configure runtime environment
ENV PORT=5000
ENV NODE_ENV=production
ENV PYTHON_PATH=/opt/venv/bin/python3

EXPOSE 5000

# Start Express full-stack server
CMD ["node", "server/server.js"]

# Stage 1: Build binary
FROM golang:1.21 AS builder

# Set working directory inside container
WORKDIR /app

# Copy Go modules and download dependencies early (better cache)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go binary
RUN go build -o main .

# Stage 2: Run binary in minimal image
FROM debian:bullseye-slim

# Install SSL CA certificates (for HTTPS calls)
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy the binary from the builder
COPY --from=builder /app/main .

# Optionally copy .env if needed for local testing (not recommended for production)
# COPY .env .

# Set environment variable for Cloud Run
ENV PORT=8080

# Expose port (for documentation purposes)
EXPOSE 8080

# Run the app
CMD ["./main"]

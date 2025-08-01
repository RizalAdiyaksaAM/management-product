# Stage 1: Build binary
FROM golang:1.21 

# Set working directory inside container
WORKDIR /app

# Copy Go modules and download dependencies early (better cache)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go binary
RUN go build -o main ./cmd/main.go


# Run the app
CMD ["./main"]

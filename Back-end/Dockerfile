# Stage 1: Build Go binary
FROM golang:1.21 as builder

WORKDIR /app
COPY . .

# Tambahkan go mod tidy agar dependency lengkap
RUN go mod tidy
RUN go build -o main .

# Stage 2: Minimal runtime image
FROM debian:bullseye-slim

WORKDIR /app
COPY --from=builder /app/main .

# Set PORT env (opsional, hanya dokumentasi)
ENV PORT=8080

EXPOSE 8080

CMD ["./main"]

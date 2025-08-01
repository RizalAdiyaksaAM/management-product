FROM golang:1.21

WORKDIR /app

COPY Back-end/go.mod Back-end/go.sum ./
RUN go mod download

COPY Back-end/. ./

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]

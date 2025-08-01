package main

import (
	"log"
	"product-manager/config"
	"product-manager/drivers/databases"
	"product-manager/routes"
	"product-manager/utils/validation"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	config.LoadEnv()

	dbConfig := config.InitConfigDB()

	db := databases.ConnectDB(dbConfig)

	v := validation.NewValidator()

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	AllowOrigins: []string{
		"http://localhost:5173",
		"https://management-product-5qdg.vercel.app",
	},
	AllowHeaders: []string{
		echo.HeaderOrigin,
		echo.HeaderContentType,
		echo.HeaderAccept,
		echo.HeaderAuthorization,
		echo.HeaderXCSRFToken,
	},
	AllowMethods: []string{
		echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE,
	},
	AllowCredentials: true,
}))

	routes.InitRoute(e, db, v)

	log.Fatal(e.Start(":8080"))
}

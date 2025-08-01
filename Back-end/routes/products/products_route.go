package products

import (
	"product-manager/controllers"
	"product-manager/repositories"
	"product-manager/usecases"
	"product-manager/utils/token"
	"product-manager/utils/validation"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	echojwt "github.com/labstack/echo-jwt/v4"
)

func InitProductsRoute(e *echo.Echo, db *gorm.DB, v *validation.Validator) {
	repo := repositories.NewProductRepository(db)
	usecase := usecases.NewProductUseCase(repo)
	controller := controllers.NewProductController(usecase, v)

	group := e.Group("/api/v1")
	group.Use(echojwt.WithConfig(token.GetJWTConfig()))
	controller.RegisterRoutes(group)
}
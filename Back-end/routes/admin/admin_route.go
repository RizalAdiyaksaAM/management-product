package admin

import (
	"product-manager/controllers"
	"product-manager/repositories"
	"product-manager/usecases"
	"product-manager/utils/password"
	"product-manager/utils/token"
	"product-manager/utils/validation"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func InitAdminRoute(e *echo.Echo, db *gorm.DB, v *validation.Validator) {
	repo := repositories.NewAdminRepository(db)
	passUtil := password.NewPasswordUtil()
	tokenUtil := token.NewTokenUtil()
	usecase := usecases.NewAdminUseCase(repo, passUtil, tokenUtil)
	controller := controllers.NewAdminController(usecase, v, tokenUtil)

	group := e.Group("/api/v1/auth")
	controller.RegisterRoutes(group)
}

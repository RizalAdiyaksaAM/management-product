package routes

import (
	"product-manager/routes/products"
	"product-manager/routes/admin"
	"product-manager/utils/validation"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func InitRoute(e *echo.Echo, db *gorm.DB, v *validation.Validator) {
	admin.InitAdminRoute(e, db, v)
	products.InitProductsRoute(e, db, v)
}
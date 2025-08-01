package controllers

import (
	"net/http"

	msg "product-manager/constant/messages"
	"product-manager/dto/admin"
	"product-manager/usecases"
	http_util "product-manager/utils/http"
	"product-manager/utils/token"
	"product-manager/utils/validation"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

type AdminController struct {
	UseCase   usecases.AdminUseCase
	Validator *validation.Validator
	TokenUtil   token.TokenUtil
}

func NewAdminController(useCase usecases.AdminUseCase, validator *validation.Validator, tokenUtil token.TokenUtil) *AdminController {
	return &AdminController{
		UseCase:   useCase,
		Validator: validator,
		TokenUtil: tokenUtil,
	}
}


func (ac *AdminController) RegisterRoutes(g *echo.Group) {
	g.POST("/register", ac.Register)
	g.POST("/login", ac.Login)

	authGroup := g.Group("")
	authGroup.Use(echojwt.WithConfig(token.GetJWTConfig()))
	authGroup.GET("/fetch", ac.Fetch)
}

func (ac *AdminController) Register(c echo.Context) error {
	var req admin.AdminRequest
	if err := c.Bind(&req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, msg.INVALID_REQUEST_DATA)
	}
	if err := ac.Validator.Validate(&req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	res, err := ac.UseCase.Register(c.Request().Context(), &req)
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	return http_util.HandleSuccessResponse(c, http.StatusCreated, msg.SUCCESS_REGISTER_ADMIN, res)
}

func (ac *AdminController) Login(c echo.Context) error {
	var req admin.AdminRequest
	if err := c.Bind(&req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, msg.INVALID_REQUEST_DATA)
	}
	if err := ac.Validator.Validate(&req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	res, err := ac.UseCase.Login(c.Request().Context(), &req)
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusUnauthorized, err.Error())
	}

	return http_util.HandleSuccessResponse(c, http.StatusOK, msg.SUCCESS_LOGIN_ADMIN, res)
}

func (ac *AdminController) Fetch(c echo.Context) error {
	claims := ac.TokenUtil.GetClaims(c) 
	adminID := claims.ID

	res, err := ac.UseCase.Fetch(c.Request().Context(), adminID)
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	return http_util.HandleSuccessResponse(c, http.StatusOK, "Fetch admin success", res)
}



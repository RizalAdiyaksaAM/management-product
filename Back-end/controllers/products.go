package controllers

import (
	"net/http"
	"strconv"

	msg "product-manager/constant/messages"
	dto_base "product-manager/dto/base"
	dto "product-manager/dto/products"
	"product-manager/usecases"
	http_util "product-manager/utils/http"
	"product-manager/utils/validation"

	"github.com/labstack/echo/v4"
)

type ProductController struct {
	UseCase   usecases.ProductUseCase
	Validator *validation.Validator
}

func NewProductController(useCase usecases.ProductUseCase, validator *validation.Validator) *ProductController {
	return &ProductController{
		UseCase:   useCase,
		Validator: validator,
	}
}

func (pc *ProductController) RegisterRoutes(g *echo.Group) {
	g.GET("/products", pc.GetAll)
	g.GET("/products/:id", pc.GetByID)
	g.POST("/products", pc.Create)
	g.PUT("/products/:id", pc.Update)
	g.DELETE("/products/:id", pc.Delete)
}

func (pc *ProductController) Create(c echo.Context) error {
	var req dto.ProductRequest
	if err := c.Bind(&req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, msg.INVALID_REQUEST_DATA)
	}
	if err := pc.Validator.Validate(&req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, err.Error())
	}
	res, err := pc.UseCase.Create(c.Request().Context(), &req)
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	return http_util.HandleSuccessResponse(c, http.StatusCreated, msg.SUCCESS_CREATE_PRODUCT, res)
}

func (pc *ProductController) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, msg.INVALID_PRODUCT_ID)
	}
	res, err := pc.UseCase.GetByID(c.Request().Context(), uint(id))
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusNotFound, err.Error())
	}
	return http_util.HandleSuccessResponse(c, http.StatusOK, msg.SUCCESS_GET_PRODUCT, res)
}

func (pc *ProductController) GetAll(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	if page <= 0 {
		page = 1
	}
	if limit <= 0 {
		limit = 10
	}

	sortBy := c.QueryParam("sort_by")
	name := c.QueryParam("name")
	category := c.QueryParam("category")
	minPriceStr := c.QueryParam("min_price")
	maxPriceStr := c.QueryParam("max_price")
	inStockStr := c.QueryParam("in_stock")

	var minPrice, maxPrice *uint
	if v, err := strconv.ParseUint(minPriceStr, 10, 64); err == nil {
		u := uint(v)
		minPrice = &u
	}
	if v, err := strconv.ParseUint(maxPriceStr, 10, 64); err == nil {
		u := uint(v)
		maxPrice = &u
	}

	if sortBy == "" {
		sortBy = "-created_at"
	}

	var inStock *bool
	if inStockStr != "" {
		val := inStockStr == "true"
		inStock = &val
	}

	req := &dto_base.PaginationRequest{Page: page, Limit: limit, SortBy: sortBy}
	filter := &dto.ProductSearchFilter{
		Name:     name,
		Category: category,
		MinPrice: minPrice,
		MaxPrice: maxPrice,
		InStock:  inStock,
	}

	if err := pc.Validator.Validate(req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, msg.INVALID_REQUEST_DATA)
	}

	res, err := pc.UseCase.GetAll(c.Request().Context(), req, filter)
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	return http_util.HandleSuccessResponse(c, http.StatusOK, msg.SUCCESS_GET_PRODUCTS_ALL, res)
}

func (pc *ProductController) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, msg.INVALID_PRODUCT_ID)
	}
	var req dto.ProductRequest
	if err := c.Bind(&req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, msg.INVALID_REQUEST_DATA)
	}
	if err := pc.Validator.Validate(&req); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, err.Error())
	}
	res, err := pc.UseCase.Update(c.Request().Context(), uint(id), &req)
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	return http_util.HandleSuccessResponse(c, http.StatusOK, msg.SUCCESS_UPDATE_PRODUCT, res)
}

func (pc *ProductController) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return http_util.HandleErrorResponse(c, http.StatusBadRequest, msg.INVALID_PRODUCT_ID)
	}
	if err := pc.UseCase.Delete(c.Request().Context(), uint(id)); err != nil {
		return http_util.HandleErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	return http_util.HandleSuccessResponse(c, http.StatusOK, msg.SUCCESS_DELETE_PRODUCT, nil)
}

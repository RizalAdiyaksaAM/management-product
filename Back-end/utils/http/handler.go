package http

import (
	"net/http"
	"product-manager/constant/status"
	dto "product-manager/dto/base"

	"github.com/labstack/echo/v4"
)

func HandleErrorResponse(c echo.Context, code int, message string) error {
	return c.JSON(code, &dto.BaseResponse{
		Status:  status.STATUS_FAILED,
		Message: message,
	})
}	

func HandleSuccessResponse(c echo.Context, code int, message string, data any) error {
	return c.JSON(code, &dto.BaseResponse{
		Status:  status.STATUS_SUCCESS,
		Message: message,
		Data:    data,
	})
}

func HandlePaginationResponse(c echo.Context, message string, data any, pagination *dto.PaginationMetadata, link *dto.Link) error {
	return c.JSON(http.StatusOK, &dto.PaginationResponse{
		BaseResponse: dto.BaseResponse{
			Status:  status.STATUS_SUCCESS,
			Message: message,
			Data:    data,
		},
		Pagination: pagination,
		Link:       link,
	})
}

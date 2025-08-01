package products

import (
	"time"
	dto_base "product-manager/dto/base"
)

type ProductRequest struct {
	Name     string `json:"name" form:"name" validate:"required"`
	Category string `json:"category" form:"category" validate:"required"`
	Price    uint    `json:"price" form:"price" validate:"required"`
	Stock    uint    `json:"stock" form:"stock" validate:"required"`
}



type ProductSearchFilter struct {
	Name     string `json:"name"`
	Category string `json:"category"`
	MinPrice *uint  `json:"min_price"`
	MaxPrice *uint  `json:"max_price"`
	InStock  *bool  `json:"in_stock"`
}

type ProductResponse struct {
    ID        uint      `json:"id"`
    Name      string    `json:"name"`
    Category  string    `json:"category"`
    Price     uint      `json:"price"`
    Stock     uint      `json:"stock"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}

type ProductListResponse struct {
	dto_base.BaseResponse
    Data       []ProductResponse              `json:"data"`
    Pagination *dto_base.PaginationMetadata   `json:"pagination"`
}

type ProductListResponseWithLinks struct {
    Data       []ProductResponse              `json:"data"`
    Pagination *dto_base.PaginationMetadata   `json:"pagination"`
    Links      *dto_base.Link                 `json:"links"`
}
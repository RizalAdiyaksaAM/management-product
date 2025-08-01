package usecases

import (
	"context"
	"fmt"
	"math"
	dto_base "product-manager/dto/base"
	dto "product-manager/dto/products"
	"product-manager/entities"
	"product-manager/repositories"
	err_util "product-manager/utils/error"
)

type ProductUseCase interface {
	Create(ctx context.Context, req *dto.ProductRequest) (*dto.ProductResponse, error)
	GetByID(ctx context.Context, id uint) (*dto.ProductResponse, error)
	GetAll(ctx context.Context, pagination *dto_base.PaginationRequest, filter *dto.ProductSearchFilter) (*dto.ProductListResponseWithLinks, error)
	Update(ctx context.Context, id uint, req *dto.ProductRequest) (*dto.ProductResponse, error)
	Delete(ctx context.Context, id uint) error
}

type productUseCase struct {
	repo repositories.ProductRepository
}

func NewProductUseCase(repo repositories.ProductRepository) ProductUseCase {
	return &productUseCase{
		repo: repo,
	}
}

func (uc *productUseCase) Create(ctx context.Context, req *dto.ProductRequest) (*dto.ProductResponse, error) {


	product := &entities.Product{
		Name:     req.Name,
		Category: req.Category,
		Price:    req.Price,
		Stock:    req.Stock,
	}

	if err := uc.repo.Create(ctx, product); err != nil {
		return nil, fmt.Errorf("failed to create product: %w", err)
	}

	return uc.mapToResponse(product), nil
}

func (uc *productUseCase) GetByID(ctx context.Context, id uint) (*dto.ProductResponse, error) {
	product, err := uc.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return uc.mapToResponse(product), nil
}

func (uc *productUseCase) GetAll(ctx context.Context, pagination *dto_base.PaginationRequest, filter *dto.ProductSearchFilter) (*dto.ProductListResponseWithLinks, error) {
	products, totalData, err := uc.repo.GetAll(ctx, pagination, filter)
	if err != nil {
		return nil, err
	}

	totalPage := int(math.Ceil(float64(totalData) / float64(pagination.Limit)))
	if pagination.Page > totalPage && totalPage != 0 {
		return nil, err_util.ErrPageNotFound
	}

	res := make([]dto.ProductResponse, len(products))
	for i, p := range products {
		res[i] = *uc.mapToResponse(&p)
	}

	basePath := "/api/v1/products?page="
	next := ""
	prev := ""
	if pagination.Page < totalPage {
		next = fmt.Sprintf("%s%d", basePath, pagination.Page+1)
	}
	if pagination.Page > 1 {
		prev = fmt.Sprintf("%s%d", basePath, pagination.Page-1)
	}

	return &dto.ProductListResponseWithLinks{
		Data: res,
		Pagination: &dto_base.PaginationMetadata{
			TotalData:   totalData,
			TotalPage:   totalPage,
			CurrentPage: pagination.Page,
		},
		Links: &dto_base.Link{
			Next: next,
			Prev: prev,
		},
	}, nil
}

func (uc *productUseCase) Update(ctx context.Context, id uint, req *dto.ProductRequest) (*dto.ProductResponse, error) {

	product := &entities.Product{
		Name:     req.Name,
		Category: req.Category,
		Price:    req.Price,
		Stock:    req.Stock,
	}

	if err := uc.repo.Update(ctx, id, product); err != nil {
		return nil, err
	}

	return uc.mapToResponse(product), nil
}

func (uc *productUseCase) Delete(ctx context.Context, id uint) error {
	return uc.repo.Delete(ctx, id)
}

func (uc *productUseCase) mapToResponse(p *entities.Product) *dto.ProductResponse {
	return &dto.ProductResponse{
		ID:        p.ID,
		Name:      p.Name,
		Category:  p.Category,
		Price:     p.Price,
		Stock:     p.Stock,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

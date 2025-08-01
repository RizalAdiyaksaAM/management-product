package repositories

import (
	"context"
	"errors"
	"fmt"
	"product-manager/entities"
	"strings"

	dto_base "product-manager/dto/base"
	dto "product-manager/dto/products"
	err_util "product-manager/utils/error"

	"gorm.io/gorm"
)

type ProductRepository interface {
	Create(ctx context.Context, product *entities.Product) error
	GetByID(ctx context.Context, id uint) (*entities.Product, error)
	GetAll(ctx context.Context, pagination *dto_base.PaginationRequest, filter *dto.ProductSearchFilter) ([]entities.Product, int64, error)
	Update(ctx context.Context, id uint, product *entities.Product) error
	Delete(ctx context.Context, id uint) error
	ExistsByName(ctx context.Context, name string, excludeID ...uint) (bool, error)
}

type productRepository struct {
	db *gorm.DB
}



func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{
		db: db,
	}
}

func (r *productRepository) Create(ctx context.Context, product *entities.Product) error {
	if err := r.validateContext(ctx); err != nil {
		return err
	}

	if err := product.IsValid(); err != nil {
		return err
	}

	exists, err := r.ExistsByName(ctx, product.Name)
	if err != nil {
		return fmt.Errorf("failed to check product existence: %w", err)
	}
	if exists {
		return err_util.ErrProductAlreadyExists
	}

	if err := r.db.WithContext(ctx).Create(product).Error; err != nil {
		return fmt.Errorf("failed to create product: %w", err)
	}

	return nil
}

func (r *productRepository) GetByID(ctx context.Context, id uint) (*entities.Product, error) {
	if err := r.validateContext(ctx); err != nil {
		return nil, err
	}

	if id == 0 {
		return nil, err_util.ErrInvalidProductID
	}

	var product entities.Product
	err := r.db.WithContext(ctx).First(&product, id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err_util.ErrProductNotFound
		}
		return nil, fmt.Errorf("failed to get product by ID: %w", err)
	}

	return &product, nil
}

func (r *productRepository) GetAll(ctx context.Context,pagination *dto_base.PaginationRequest,filter *dto.ProductSearchFilter,) ([]entities.Product, int64, error) {
	if err := r.validateContext(ctx); err != nil {
		return nil, 0, err
	}

	var products []entities.Product
	var totalCount int64

	countQuery := r.db.WithContext(ctx).Model(&entities.Product{})
	countQuery = r.applyFilters(countQuery, filter)
	if err := countQuery.Count(&totalCount).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count products: %w", err)
	}

	offset := (pagination.Page - 1) * pagination.Limit

	query := r.db.WithContext(ctx).
	Model(&entities.Product{}).
	Order(parseSortBy(pagination.SortBy)).
	Limit(pagination.Limit).
	Offset(offset)

	


	query = r.applyFilters(query, filter)

	if err := query.Find(&products).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to get products: %w", err)
	}

	return products, totalCount, nil
}



func (r *productRepository) Update(ctx context.Context, id uint, product *entities.Product) error {
	if err := r.validateContext(ctx); err != nil {
		return err
	}

	if id == 0 {
		return err_util.ErrInvalidProductID
	}

	if err := product.IsValid(); err != nil {
		return err
	}

	// Check if product exists
	existingProduct, err := r.GetByID(ctx, id)
	if err != nil {
		return err
	}

	// Check if name is being changed and if new name already exists
	if product.Name != existingProduct.Name {
		exists, err := r.ExistsByName(ctx, product.Name, id)
		if err != nil {
			return fmt.Errorf("failed to check product name existence: %w", err)
		}
		if exists {
			return err_util.ErrProductAlreadyExists
		}
	}

	result := r.db.WithContext(ctx).Model(&entities.Product{}).Where("id = ?", id).Updates(product)
	if result.Error != nil {
		return fmt.Errorf("failed to update product: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return err_util.ErrProductNotFound
	}

	return nil
}

func (r *productRepository) Delete(ctx context.Context, id uint) error {
	if err := r.validateContext(ctx); err != nil {
		return err
	}

	if id == 0 {
		return err_util.ErrInvalidProductID
	}

	_, err := r.GetByID(ctx, id)
	if err != nil {
		return err
	}

	result := r.db.WithContext(ctx).Delete(&entities.Product{}, id)
	if result.Error != nil {
		return fmt.Errorf("failed to delete product: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return err_util.ErrProductNotFound
	}

	return nil
}

func (r *productRepository) ExistsByName(ctx context.Context, name string, excludeID ...uint) (bool, error) {
	if err := r.validateContext(ctx); err != nil {
		return false, err
	}

	if strings.TrimSpace(name) == "" {
		return false, nil
	}

	query := r.db.WithContext(ctx).Model(&entities.Product{}).Where("LOWER(name) = LOWER(?)", strings.TrimSpace(name))
	
	if len(excludeID) > 0 && excludeID[0] > 0 {
		query = query.Where("id != ?", excludeID[0])
	}

	var count int64
	if err := query.Count(&count).Error; err != nil {
		return false, fmt.Errorf("failed to check product name existence: %w", err)
	}

	return count > 0, nil
}

func (r *productRepository) validateContext(ctx context.Context) error {
	if ctx == nil {
		return errors.New("context is required")
	}
	if err := ctx.Err(); err != nil {
		return fmt.Errorf("context error: %w", err)
	}
	return nil
}

func (r *productRepository) applyFilters(query *gorm.DB, filter *dto.ProductSearchFilter) *gorm.DB {
	if filter == nil {
		return query
	}

	if filter.Name != "" {
		query = query.Where("name ILIKE ?", "%"+filter.Name+"%")
	}

	if filter.Category != "" {
		query = query.Where("category ILIKE ?", "%"+filter.Category+"%")
	}

	if filter.MinPrice != nil {
		query = query.Where("price >= ?", *filter.MinPrice)
	}

	if filter.MaxPrice != nil {
		query = query.Where("price <= ?", *filter.MaxPrice)
	}

	if filter.InStock != nil {
		if *filter.InStock {
			query = query.Where("stock > 0")
		} else {
			query = query.Where("stock = 0")
		}
	}

	return query
}

func parseSortBy(raw string) string {
	if raw == "" {
		return "created_at DESC"
	}

	direction := "ASC"
	field := raw

	if raw[0] == '-' {
		direction = "DESC"
		field = raw[1:]
	}

	allowed := map[string]bool{
		"name": true,
		"price": true,
		"category": true,
		"created_at": true,
	}

	if !allowed[field] {
		return "created_at DESC"
	}

	return fmt.Sprintf("%s %s", field, direction)
}



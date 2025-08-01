package repositories

import (
	"context"
	"product-manager/entities"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type AdminRepository interface {
	Register(ctx context.Context, admin *entities.Admin) error
	Login(ctx context.Context, admin *entities.Admin) (*entities.Admin, error)
	FindByID(ctx context.Context, id uuid.UUID, admin *entities.Admin) error
}

type adminRepository struct {
	db *gorm.DB
}

func NewAdminRepository(db *gorm.DB) AdminRepository {
	return &adminRepository{
		db: db,
	}
}

func (r *adminRepository) Register(ctx context.Context, admin *entities.Admin) error {
	if err := r.db.WithContext(ctx).Create(admin).Error; err != nil {
		return err
	}
	return nil
}

func (r *adminRepository) Login(ctx context.Context, admin *entities.Admin) (*entities.Admin, error) {
	if err := ctx.Err(); err != nil {
		return nil, err
	}

	if err := r.db.Where(admin).First(&admin).Error; err != nil {
		return nil, err
	}
	return admin, nil
}

func (r *adminRepository) FindByID(ctx context.Context, id uuid.UUID, admin *entities.Admin) error {
	return r.db.WithContext(ctx).First(admin, "id = ?", id).Error
}

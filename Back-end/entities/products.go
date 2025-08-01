package entities

import (
	err_util "product-manager/utils/error"
	"time"
)

type Product struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name      string    `gorm:"type:varchar(255);not null" json:"name"`
	Category  string    `gorm:"type:varchar(255);not null" json:"category"`
	Price     uint      `gorm:"type:int;not null" json:"price"`
	Stock     uint      `gorm:"type:int;not null;default:0" json:"stock"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

func (p *Product) IsValid() error {
	if p.Name == "" {
		return err_util.ErrProductNameRequired
	}
	if p.Category == "" {
		return err_util.ErrProductCategoryRequired
	}
	if p.Price == 0 {
		return err_util.ErrProductPriceRequired
	}
	return nil
}

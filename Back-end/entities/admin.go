package entities

import (
	"time"

	"github.com/google/uuid"
)

type Admin struct {
	ID        uuid.UUID `gorm:"primaryKey;autoIncrement" json:"id"`
	Username  string    `gorm:"type:varchar(255);not null" json:"username"`
	Password  string    `gorm:"type:varchar(255);not null" json:"password"`
	Email     string    `gorm:"type:varchar(255);not null" json:"email"`
	Token     string    `json:"token"`
	CreatedAt time.Time
}

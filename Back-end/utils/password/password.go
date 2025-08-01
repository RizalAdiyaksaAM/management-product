package password

import (
	err_util "product-manager/utils/error"
	"golang.org/x/crypto/bcrypt"
)

type PasswordUtil interface {
	HashPassword(password string) (string, error)
	VerifyPassword(password, hash string) error
}

type passwordUtil struct{}

func NewPasswordUtil() PasswordUtil {
	return &passwordUtil{}
}

func (p *passwordUtil) HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err_util.ErrFailedHashingPassword
	}
	return string(hash), nil
}

func (p *passwordUtil) VerifyPassword(password, hash string) error {
	if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)); err != nil {
		return err_util.ErrPasswordMismatch
	}
	return nil
}
package error

import (
	"errors"
	"product-manager/constant/messages"
)

var (
	// Password errors
	ErrFailedHashingPassword = errors.New(messages.FAILED_HASHING_PASSWORD)
	ErrPasswordMismatch      = errors.New(messages.PASSWORD_MISMATCH)

	// Page errors
	ErrPageNotFound = errors.New(messages.PAGE_NOT_FOUND)
	ErrNotFound     = errors.New(messages.NOT_FOUND)

	// Product errors
	ErrProductNotFound         = errors.New(messages.PRODUCT_NOT_FOUND)
	ErrProductNameRequired     = errors.New(messages.PRODUCT_NAME_REQUIRED)
	ErrProductCategoryRequired = errors.New(messages.PRODUCT_CATEGORY_REQUIRED)
	ErrProductPriceRequired    = errors.New(messages.PRODUCT_PRICE_REQUIRED)
	ErrInvalidProductID        = errors.New(messages.INVALID_PRODUCT_ID)
	ErrProductAlreadyExists    = errors.New(messages.PRODUCT_ALREADY_EXISTS)
)

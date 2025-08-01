package messages

const (
	// Database
	FAILED_CONNECT_DB = "failed connect to database"

	// Auth
	INVALID_TOKEN = "invalid token"
	UNAUTHORIZED  = "unauthorized"

	// Password
	FAILED_HASHING_PASSWORD = "failed hashing password"
	PASSWORD_MISMATCH       = "password mismatch"

	// Page
	PAGE_NOT_FOUND = "page not found"
	NOT_FOUND      = "not found"

	// Validation
	MISMATCH_DATA_TYPE   = "mismatch data type"
	INVALID_REQUEST_DATA = "invalid request data"

	// Product
	PRODUCT_NOT_FOUND         = "product not found"
	PRODUCT_NAME_REQUIRED     = "product name is required"
	PRODUCT_CATEGORY_REQUIRED = "product category is required"
	PRODUCT_PRICE_REQUIRED    = "product price is required"
	INVALID_PRODUCT_ID        = "invalid product ID"
	PRODUCT_ALREADY_EXISTS    = "product already exists"
    INTERNAL_SERVER_ERROR      = "Internal server error"


	FAILED_GET_PRODUCTS_ALL = "failed get products all"
)

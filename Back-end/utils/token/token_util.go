package token

import (
	"errors"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"

	msg "product-manager/constant/messages"
	http_util "product-manager/utils/http"
)

type JWTClaim struct {
	ID       uuid.UUID `json:"id"`
	Username string    `json:"username"`
	jwt.RegisteredClaims
}

type TokenUtil interface {
	GenerateToken(id uuid.UUID, username string) (string, error)
	GetClaims(c echo.Context) *JWTClaim
}

type tokenUtil struct{}

func NewTokenUtil() TokenUtil {
	return &tokenUtil{}
}

func (*tokenUtil) GenerateToken(id uuid.UUID, username string) (string, error) {
	claims := JWTClaim{
		ID:       id,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(30 * 24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

func (*tokenUtil) GetClaims(c echo.Context) *JWTClaim {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JWTClaim)
	return claims
}

func GetJWTConfig() echojwt.Config {
	jwtKey := os.Getenv("JWT_KEY")
	if jwtKey == "" {
		panic("JWT_KEY environment variable is required")
	}

	return echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(JWTClaim)
		},
		ErrorHandler: jwtErrorHandler,
		SigningKey:   []byte(jwtKey),
		TokenLookup: "header:Authorization:Bearer ",
	}
}

func customTokenExtractor(c echo.Context) (string, error) {
	auth := c.Request().Header.Get("Authorization")
	if auth == "" {
		return "", echojwt.ErrJWTMissing
	}
	
	// Check if it starts with "Bearer "
	if strings.HasPrefix(auth, "Bearer ") {
		return strings.TrimPrefix(auth, "Bearer "), nil
	}
	
	return auth, nil
}

func jwtErrorHandler(c echo.Context, err error) error {
	c.Logger().Errorf("JWT error: %v", err)
	
	authHeader := c.Request().Header.Get("Authorization")
	c.Logger().Errorf("Authorization header: %s", authHeader)
	
	if errors.Is(err, echojwt.ErrJWTMissing) {
		return http_util.HandleErrorResponse(c, http.StatusUnauthorized, msg.INVALID_TOKEN)
	}
	
	if errors.Is(err, echojwt.ErrJWTInvalid) {
		return http_util.HandleErrorResponse(c, http.StatusUnauthorized, msg.INVALID_TOKEN)
	}
	
	if strings.Contains(err.Error(), "token is malformed") || 
	   strings.Contains(err.Error(), "could not base64 decode") {
		return http_util.HandleErrorResponse(c, http.StatusUnauthorized, msg.INVALID_TOKEN)
	}
	
	return http_util.HandleErrorResponse(c, http.StatusUnauthorized, msg.UNAUTHORIZED)
}
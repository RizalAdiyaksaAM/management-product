package usecases

import (
	"context"
	"product-manager/dto/admin"
	"product-manager/entities"
	"product-manager/repositories"
	"product-manager/utils/password"
	"product-manager/utils/token"

	"github.com/google/uuid"
)

type AdminUseCase interface {
	Register(ctx context.Context, req *admin.AdminRequest) (*admin.AdminResponse, error)
	Login(ctx context.Context, req *admin.AdminRequest) (*admin.AdminResponse, error)
	Fetch(ctx context.Context, id uuid.UUID) (*admin.AdminResponse, error)
}

type adminUseCase struct {
	repo         repositories.AdminRepository
	passwordUtil password.PasswordUtil
	tokenUtil    token.TokenUtil
}

func NewAdminUseCase(repo repositories.AdminRepository, passwordUtil password.PasswordUtil, tokenUtil token.TokenUtil) AdminUseCase {
	return &adminUseCase{
		repo:         repo,
		passwordUtil: passwordUtil,
		tokenUtil:    tokenUtil,
	}
}

func (uc *adminUseCase) Register(ctx context.Context, req *admin.AdminRequest) (*admin.AdminResponse, error) {
	hashedPassword, err := uc.passwordUtil.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	admin := &entities.Admin{
		ID:       uuid.New(),
		Username: req.Username,
		Email:    req.Email,
		Password: hashedPassword,
	}

	if err := uc.repo.Register(ctx, admin); err != nil {
		return nil, err
	}

	return uc.mapToResponse(admin), nil
}

func (uc *adminUseCase) Login(ctx context.Context, req *admin.AdminRequest) (*admin.AdminResponse, error) {
	adminRecord, err := uc.repo.Login(ctx, &entities.Admin{Email: req.Email})
	if err != nil {
		return nil, err
	}

	if err := uc.passwordUtil.VerifyPassword(req.Password, adminRecord.Password); err != nil {
		return nil, err
	}

	tokenStr, err := uc.tokenUtil.GenerateToken(adminRecord.ID, adminRecord.Username)
	if err != nil {
		return nil, err
	}

	adminRecord.Token = tokenStr
	return uc.mapToResponse(adminRecord), nil
}

func (uc *adminUseCase) Fetch(ctx context.Context, id uuid.UUID) (*admin.AdminResponse, error) {
	admin := &entities.Admin{}
	if err := uc.repo.FindByID(ctx, id, admin); err != nil {
		return nil, err
	}
	return uc.mapToResponse(admin), nil
}


func (uc *adminUseCase) mapToResponse(a *entities.Admin) *admin.AdminResponse {
	return &admin.AdminResponse{
		ID:       a.ID.String(),
		Username: a.Username,
		Email:    a.Email,
		Token:    a.Token,
	}
}
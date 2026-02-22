import { jest, describe, it, beforeAll, beforeEach, afterEach } from '@jest/globals';

const bcryptMock = {
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
};

const jwtMock = {
    sign: jest.fn(),
    verify: jest.fn(),
};

jest.unstable_mockModule('bcrypt', () => ({
    default: bcryptMock,
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
    default: jwtMock,
}));

let User;
let register;
let login;

beforeAll(async () => {

    const mockUserModel = {
        findOne: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
    };

    jest.unstable_mockModule('../models/User.js', () => ({
        default: mockUserModel,
    }));

    const authController = await import('../controllers/authController.js');

    register = authController.register;
    login = authController.login;
    User = mockUserModel;
});

describe('Auth Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        process.env.JWT_SECRET = 'test-secret';

        req = {
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Register', () => {
        it('should register a new user successfully', async () => {
            req.body = {
                name: 'user',
                email: 'test@test.com',
                password: '123456'
            };

            User.findOne.mockResolvedValue(null);
            bcryptMock.genSalt.mockResolvedValue('salt');
            bcryptMock.hash.mockResolvedValue('hashedPassword');

            User.create.mockResolvedValue({
                id: 1,
                name: 'user',
                email: 'test@test.com',
                role: 'customer',
                phone: null,
                address: null,
                isActive: true,
            });

            jwtMock.sign.mockReturnValue('fakeToken');

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    token: 'fakeToken'
                })
            );
        });

        it('should return error if email already exists', async () => {
            req.body = {
                name: 'John',
                email: 'john@test.com',
                password: '123456'
            };

            User.findOne.mockResolvedValue({ id: 1 });

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false
                })
            );
        });

        it('should return error if required fields are missing', async () => {
            req.body = {
                email: 'test@test.com',
            };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'Name, Email and password are required'
                })
            );
        });
    });

    describe('Login', () => {
        it('should login successfully', async () => {
            req.body = {
                email: 'test@test.com',
                password: '123456'
            };

            const fakeUser = {
                id: 1,
                email: 'test@test.com',
                password: 'hashedPassword',
                role: 'customer',
                isActive: true,
                update: jest.fn().mockResolvedValue(true),
                toJSON: jest.fn().mockReturnValue({
                    id: 1,
                    email: 'test@test.com',
                    role: 'customer',
                    password: 'hashedPassword'
                })
            };

            User.findOne.mockResolvedValue(fakeUser);
            bcryptMock.compare.mockResolvedValue(true);
            jwtMock.sign.mockReturnValue('fakeToken');

            await login(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    token: 'fakeToken'
                })
            );
        });

        it('should fail if user not found', async () => {
            req.body = {
                email: 'wrong@test.com',
                password: '123456'
            };

            User.findOne.mockResolvedValue(null);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: 'Invalid credentials'
                })
            );
        });

        it('should fail if password incorrect', async () => {
            req.body = {
                email: 'test@test.com',
                password: 'wrongpass'
            };

            const fakeUser = {
                id: 1,
                email: 'test@test.com',
                password: 'hashedPassword',
                role: 'customer',
                isActive: true
            };

            User.findOne.mockResolvedValue(fakeUser);
            bcryptMock.compare.mockResolvedValue(false);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
        });

        it('should fail if account is deactivated', async () => {
            req.body = {
                email: 'test@test.com',
                password: '123456'
            };

            const fakeUser = {
                id: 1,
                email: 'test@test.com',
                password: 'hashedPassword',
                role: 'customer',
                isActive: false, // Deactivated account
            };

            User.findOne.mockResolvedValue(fakeUser);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: 'Account has been deactivated'
                })
            );
        });
    });
});
import { RequestHandler } from 'express';
import UserSchema from '../schemas/UserSchema';
import bcrypt from 'bcrypt';
import { UserDto } from '../dto/UserDto';
import authToken from '../utils/token/authToken';
import { forgotPassword } from '../functions/mail';
import OtpService from '../utils/otp';
import Jimp from 'jimp';
import path from 'path';

//forgot password
export const forgot: RequestHandler = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email);
        if (!email) {
            throw new Error('Không được bỏ trống');
        }

        const findEmail = await UserSchema.findOne({ email });
        if (!findEmail) {
            res.status(401);
            throw new Error('Email không chính xác');
        }
        const message = `
      <div>
      <p>Xin chào ${
          findEmail.name
      } mã token của bạn là <strong>${await OtpService.generateOtp()}</strong></p>
      </div>
    `;

        await forgotPassword({ youremail: email, message });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const updateavatar: RequestHandler = async (req, res, next) => {
   try {
    const { image, id } = req.body;
    if (!image || !id) {
        throw new Error('Không được bỏ trống mục nào');
    }
    const user = await UserSchema.findById(id);
    if (user) {
        const buffer = Buffer.from(
            image.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, ''),
            'base64'
        );

        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;
        const jimResp = await Jimp.read(buffer);
        jimResp
            .resize(150, Jimp.AUTO)
            .write(
                path.resolve(
                    __dirname,
                    `../../../public/avatar/${imagePath}`
                )
            );
        user.avatar = `/avatar/${imagePath}`
        await user.save()
        return res.status(200).json(user);
    }
   } catch (error) {
       next(error)
   }
};

// getUser
export const getuser: RequestHandler = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserSchema.findById(userId);
        if (!user) {
            res.status(401);
            throw new Error('Không tìm được user');
        }
        const getUser = new UserDto(user);

        const { accessToken, refreshToken } = authToken.generateTokens({
            _id: user._id,
        });

        res.status(200).json({
            accessToken,
            refreshToken,
            auth: true,
            user: getUser,
        });
    } catch (error) {
        next(error);
    }
};

// Register
export const register: RequestHandler = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(401);
            throw new Error('Không được bỏ trống mục nào');
        }

        const checkUser = await UserSchema.findOne({ email });
        if (checkUser) {
            res.status(401);
            throw new Error('Email đã tồn tại');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await UserSchema.create({
            name,
            email,
            password: hashedPassword,
        });

        const getUser = new UserDto(createUser);

        res.status(202).json({ success: true, user: getUser });
    } catch (error) {
        next(error);
    }
};

//Login
export const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401);
            throw new Error('Không được bỏ trống mục nào');
        }
        const checkUser: any = await UserSchema.findOne({ email });

        if (!checkUser) {
            res.status(401);
            throw new Error('Tài khoản chưa đc đăng ký');
        }

        const isValidPassword = await bcrypt.compare(
            password,
            checkUser.password
        );

        if (!isValidPassword) {
            res.status(401);
            throw new Error('Mật khẩu sai');
        }

        const { accessToken, refreshToken } = authToken.generateTokens({
            _id: checkUser._id,
        });

        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   maxAge: 1000 * 60 * 60 * 24,
        // })

        // res.cookie("accessToken", accessToken, {
        //   httpOnly: true,
        //   secure: false,
        //   maxAge: 1000 * 60 * 60 * 24,
        // })

        const getUser = new UserDto(checkUser);

        res.status(200).json({
            refreshToken,
            accessToken,
            auth: true,
            user: getUser,
        });
    } catch (error) {
        next(error);
    }
};

export const getalluser: RequestHandler = async (req, res, next) => {
    try {
        const alluser = await UserSchema.find({});

        res.status(201).json(alluser);
    } catch (error) {
        next(error);
    }
};


export const changepassword: RequestHandler = async (req, res, next) => {
    try {
       const {id, password, newpassword} = req.body

       if (!newpassword || !password) {
            res.status(401);
            throw new Error('Không được bỏ trống mục nào');
        }
        const user: any = await UserSchema.findById(id)
        if(!id) {
            res.status(401);
            throw new Error('Không tìm thấy người dùng');
        }
        const isValidPassword = await bcrypt.compare(
            password,
            user.password
        )

        if(isValidPassword) {
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            user.password = hashedPassword
            await user.save()
        } else {
            res.status(401);
            throw new Error('Mật khẩu bạn nhập không chính xác');
        }

        return res.status(200).json({success: true})
        
    } catch (error) {
        next(error);
    }
};

export const block: RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.body
        const findUser: any = await UserSchema.findById(id)
        if(!findUser) {
            res.status(401)
            throw new Error('Không tìm thấy người dùng');
        }
        findUser.block = true
        await findUser.save()
        return res.status(201).json({success: true})
    } catch (error) {
        next(error);
    }
};

export const unblock: RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.body
        const findUser: any = await UserSchema.findById(id)
        if(!findUser) {
            res.status(401)
            throw new Error('Không tìm thấy người dùng');
        }
        findUser.block = false
        await findUser.save()
        return res.status(201).json({success: true})
    } catch (error) {
        next(error);
    }
};

export const deleteuserbyid: RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.body
        const findUser: any = await UserSchema.findById(id)
        if(!findUser) {
            res.status(401)
            throw new Error('Không tìm thấy người dùng');
        }
        await findUser.remove()
        return res.status(201).json({success: true})
    } catch (error) {
        next(error);
    }
};


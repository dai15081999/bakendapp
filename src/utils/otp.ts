import crypto from "crypto";

class OtpService {
  async generateOtp() {
    const otp = await crypto.randomInt(1000, 9999);
    return otp;
  }
}

export default new OtpService();

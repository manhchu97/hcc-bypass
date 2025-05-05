import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async ({
  username,
  password,
  captcha,
  cookieId,
  action,
}: {
  username: string;
  password: string;
  captcha: string;
  cookieId: string;
  action?: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/valorant/login`, {
      username,
      password,
      captcha,
      cookieId,
      action,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const verifyOTP = async ({
  cookieId,
  otp,
}: {
  otp: string;
  cookieId: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/valorant/verify-otp`, {
      cookieId,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const resendOTP = async ({ cookieId }: { cookieId: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/valorant/resend-otp`, {
      cookieId,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const initCookies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/valorant/init`);
    return response.data;
  } catch (error) {
    console.error("Error fetching init data:", error);
    throw error;
  }
};

export const webhook = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/webhook`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching init data:", error);
    throw error;
  }
};

import dotenv from "dotenv";
import path from "path";
import payload from "payload";
import { Payload } from "payload";
import { InitOptions } from "payload/config";
import nodemailer from 'nodemailer'

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY
  }
})


let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promist: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD SECRET MISSING");
  }
  if (cached?.client) {
    return cached?.client;
  }
  if (!cached?.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: 'contact@yashpurani.com',
        // fromAddress: '',
        fromName: "HippoCrafts"
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error: unknown) {
    console.log("PAYLOAD_ERROR", error);
    cached.promise = null;
    throw error;
  }

  return cached.client;
};

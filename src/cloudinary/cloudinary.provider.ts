import { v2 as cloudinary } from 'cloudinary';

export const CLOUDINARY = 'CLOUDINARY' as const;

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'decbsgbj3',
      api_key: '531768846288684',
      api_secret: '6a3AaJFnpeTdkVlZxsKnxRd4F7E',
    });
  },
};

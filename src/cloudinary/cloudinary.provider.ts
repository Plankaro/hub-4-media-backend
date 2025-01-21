import { v2 as cloudinary } from 'cloudinary';

export const CLOUDINARY = 'CLOUDINARY' as const;

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dlnivdagu',
      api_key: '747586291652392',
      api_secret: '9GKnOnkV6zPYzB1vl4hayCos9kU',
    });
  },
};

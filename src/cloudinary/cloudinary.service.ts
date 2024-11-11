import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as multer from 'multer';

@Injectable()
export class CloudinaryService {
  private storage: CloudinaryStorage;

  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: 'dhypvhqb5',
      api_key: '676826547578292',
      api_secret:'1Ft9OsPTrPqcCcsWjGEVbjEEv4M',
    });

    this.storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: 'hubf0rmedia_user_images',
        resource_type: 'image',
      } as unknown as Record<string, string>,  // Bypass TypeScript restriction
    });
  }

  getMulterUpload() {
    return multer({ storage: this.storage });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return await cloudinary.uploader.upload(file.path, {
      folder: 'user_images',
    });
  }

  async deleteImage(publicId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return {
        success: result.result === 'ok', // Check if the result indicates success
        message: result.result === 'ok' ? 'Image deleted successfully.' : 'Image deletion failed.',
      };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { success: false, message: 'Image deletion failed: ' + error.message };
    }
  }
}

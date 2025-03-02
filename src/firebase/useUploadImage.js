import { useState, useCallback } from 'react';
import { storage, database } from './firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';

export const useUploadImage = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = useCallback(async (file, onImageUrlChange) => {
        if (!file) return; // Đảm bảo đã chọn ít nhất một ảnh

        setUploading(true);
        setError(null);

        try {
            const storageReference = storageRef(storage, `uploadedImages/${file.name}`);

            // Tải lên vào Firebase Storage
            const snapshot = await uploadBytes(storageReference, file);
            console.log('Uploaded a blob or file!', snapshot);

            // Lấy URL để hiển thị ảnh
            const url = await getDownloadURL(storageReference);
            console.log('File available at', url);

            // Lưu URL vào Firebase Realtime Database
            const dbImagesRef = dbRef(database, 'images');
            const newImageRef = push(dbImagesRef);
            await set(newImageRef, {
                imageUrl: url,
                imageName: file.name,
                // Các thông tin ảnh bổ sung nếu cần
            });
            console.log('Image information saved to Realtime Database');

            // Gọi callback để trả về URL của ảnh đã tải lên thành công
            if (onImageUrlChange) {
                onImageUrlChange(url);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Có lỗi xảy ra khi tải lên ảnh.');
        } finally {
            setUploading(false);
        }
    }, []);

    return { uploadImage, uploading, error };
};

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { storage } from '../config/firebase';

export const uploadImage = async (file) => {
    try {
        const storageRef = ref(storage, `images/${file.name}`);
        console.log(`Uploading file...${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (err) {
        console.error("Error uploading file: ", err);
        throw err;
    }
};
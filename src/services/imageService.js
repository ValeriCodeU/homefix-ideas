import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../firebase.js';

export const uploadIdeaImage = async (file) => {
    const extension = file.type.split('/')[1];
    const imageRef = ref(storage, `ideas/${crypto.randomUUID()}.${extension}`);

    await uploadBytes(imageRef, file, { contentType: file.type });

    return getDownloadURL(imageRef);
};

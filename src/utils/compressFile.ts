import imageCompression from "browser-image-compression";

const compressFile = async (file: File) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    return new File([compressedFile], compressedFile.name);
};
export default compressFile;

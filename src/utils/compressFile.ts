import imageCompression from "browser-image-compression";

const compressFile = async (file: File, size = 5) => {
    const options = {
        maxSizeMB: size,
        useWebWorker: true,
    };
    if (file.size / 1024 > 5000) {
        const compressedFile = await imageCompression(file, options);
        return new File([compressedFile], compressedFile.name);
    } else {
        return file;
    }
};
export default compressFile;

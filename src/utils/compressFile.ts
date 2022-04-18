import imageCompression from "browser-image-compression";

const compressFile = async (file: File, size = 4.5) => {
    const options = {
        maxSizeMB: size,
        useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    console.log("Original", file.size, "Compressed", compressedFile.size);
    return new File([compressedFile], compressedFile.name);
};
export default compressFile;

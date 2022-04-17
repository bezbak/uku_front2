import imageCompression from "browser-image-compression";

const compressFile = async (file: File, size = 5) => {
    const options = {
        maxSizeMB: size,
        useWebWorker: true,
    };
    if (file.size / 1024 >= 4500) {
        const compressedFile = await imageCompression(file, options);
        console.log("File With Compress", compressedFile);
        return new File([compressedFile], compressedFile.name);
    } else {
        console.log("File Without Compress", file);
        return file;
    }
};
export default compressFile;

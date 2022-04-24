import imageCompression from "browser-image-compression";

const getMbFormButyes = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
};

const compressFile = async (file: File, size = 4.5) => {
    const options = {
        maxSizeMB: size,
        useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    console.log(
        `Original ${getMbFormButyes(file.size)}mb, Compressed ${
            compressedFile.size
        }mb`
    );
    return new File([compressedFile], compressedFile.name);
};
export default compressFile;

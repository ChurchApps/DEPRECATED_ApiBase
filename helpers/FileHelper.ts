import { AwsHelper } from "./AwsHelper";
import fs from "fs";
import path from "path";

export class FileHelper {
    private static fileStore = process.env.FILE_STORE;
    private static rootPath = path.resolve("./content") + "/";

    static store = async (key: string, contentType: string, contents: Buffer) => {
        switch (FileHelper.fileStore) {
            case "S3": await AwsHelper.S3Upload(key, contentType, contents); break;
            default: await FileHelper.storeLocal(key, contents); break;
        }
    }

    static remove = async (key: string) => {
        switch (FileHelper.fileStore) {
            case "S3": await AwsHelper.S3Remove(key); break;
            default: await FileHelper.removeLocal(key); break;
        }
    }

    private static storeLocal = async (key: string, contents: Buffer) => {
        const fileName = FileHelper.rootPath + key;
        const dirName = path.dirname(fileName);
        if (!fs.existsSync(dirName)) fs.mkdirSync(dirName, { recursive: true });
        fs.writeFileSync(fileName, contents);
    }

    private static removeLocal = async (key: string) => {
        fs.unlinkSync(FileHelper.rootPath + key);
    }
}
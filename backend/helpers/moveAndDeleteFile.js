import fse from 'fs-extra'
import path from "path";
import HttpError from "./HttpError.js";

export async function moveAndDeleteFile(tmpFilePath, fileName, avatarsFolderPath) {
    try {
        await fse.move(
            path.join(tmpFilePath, fileName),
            path.join(avatarsFolderPath, fileName)
        );

    } catch (error) {
        throw HttpError(400, error.message);
    }
}
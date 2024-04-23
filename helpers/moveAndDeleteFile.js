import * as fse from "fs-extra"
import path from "path";
import HttpError from "./HttpError.js";

export async function moveAndDeleteFile(tmpFilePath, fileName, avatarsFolderPath) {
    try {
        await fse.move(
            path.join(tmpFilePath, fileName),
            path.join(avatarsFolderPath, fileName)
        );

        await fse.unlink(path.join(tmpFilePath, fileName));
    } catch (error) {
        throw HttpError(error);
    }
}
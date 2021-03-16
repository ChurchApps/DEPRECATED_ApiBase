import { injectable } from "inversify";
import { DB } from "../db";
import { File } from "../models";
import { UniqueIdHelper } from "../helpers";

@injectable()
export class FileRepository {

    public async create(file: File) {
        file.id = UniqueIdHelper.shortId();
        return DB.query(
            "INSERT INTO files ( id , itemId , type, content, lastModified) VALUES ( ?, ?, ?, ?, ?);",
            [file.id, file.itemId, file.type, file.content, file.lastModified]
        ).then(() => { return file; });
    }
    public async loadById(itemId: string) {
        return DB.queryOne("SELECT * FROM files WHERE itemId=?;", [itemId]);
    }
}
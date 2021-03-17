import { injectable } from "inversify";
import { UniqueIdHelper } from "..";
import { DB } from "../db";
import { File } from "../models";


@injectable()
export class FileRepository {


    public save(file: File, id: string) {
        if (UniqueIdHelper.isMissing(file.id)) return this.create(file, id); else return this.update(file);
    }

    public async create(file: File, id: string) {
        return DB.query(
            "INSERT INTO files ( id ,churchId, type, content, lastModified) VALUES ( ?, ?, ?, ?, ?);",
            [id, file.churchId, file.type, file.content, file.lastModified]
        ).then(() => { return file; });
    }

    public async update(file: File) {

        const query = "UPDATE files SET content=?, lastModified=NOW() WHERE id=? AND churchId=?;";
        const params = [file.content, file.id, file.churchId];
        return DB.query(query, params).then(() => { return file });
    }

    public async loadById(id: string) {
        return DB.queryOne("SELECT * FROM files WHERE id=?;", [id]);
    }
}
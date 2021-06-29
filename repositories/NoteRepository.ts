import { injectable } from "inversify";
import { DB } from "../db";
import { Note } from "../models";
import { PersonHelper, UniqueIdHelper } from "../helpers";

@injectable()
export class NoteRepository {

    public save(note: Note) {
        if (UniqueIdHelper.isMissing(note.id)) return this.create(note); else return this.update(note);
    }

    private async create(note: Note) {
        note.id = UniqueIdHelper.shortId();
        const sql = "INSERT INTO notes (id, churchId, contentType, contentId, noteType, addedBy, createdAt, updatedAt, contents) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?);";
        const params = [note.id, note.churchId, note.contentType, note.contentId, note.contentType, note.addedBy, note.contents]
        await DB.query(sql, params);
        return note;
    }

    private async update(note: Note) {
        const sql = "UPDATE notes SET contentType=?, contentId=?, noteType=?, contents=?, updatedAt=NOW() WHERE id=? and churchId=?";
        const params = [note.contentType, note.contentId, note.contentType, note.contents, note.id, note.churchId];
        await DB.query(sql, params);
        return note;
    }

    public delete(churchId: string, id: string) {
        return DB.query("DELETE FROM notes WHERE id=? AND churchId=?;", [id, churchId]);
    }

    public load(churchId: string, id: string) {
        return DB.queryOne("SELECT * FROM notes WHERE id=? AND churchId=?;", [id, churchId]);
    }

    public loadForContent(churchId: string, contentType: string, contentId: string) {
        return DB.query("SELECT n.*, p.photoUpdated, p.displayName, p.id as personId FROM notes n INNER JOIN people p on p.churchId=n.churchId AND p.id=n.addedBy WHERE n.churchId=? AND n.contentType=? AND n.contentId=? ORDER BY updatedAt DESC;", [churchId, contentType, contentId]);
    }

    public loadAll(churchId: string) {
        return DB.query("SELECT * FROM notes WHERE churchId=?;", [churchId]);
    }


    public convertToModel(churchId: string, data: any) {
        const result: Note = {
            person: { id: data.personId, photoUpdated: data.photoUpdated, name: { display: data.displayName } },
            contentId: data.contentId, contentType: data.contentType, contents: data.contents, id: data.id, addedBy: data.addedBy, createdAt: data.createdAt, noteType: data.noteType, updatedAt: data.updatedAt
        }
        result.person.photo = PersonHelper.getPhotoUrl(churchId, result.person);
        return result;
    }

    public convertAllToModel(churchId: string, data: any[]) {
        const result: Note[] = [];
        data.forEach(d => result.push(this.convertToModel(churchId, d)));
        return result;
    }

}

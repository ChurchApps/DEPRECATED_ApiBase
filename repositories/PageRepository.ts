import { DB } from "../db";
import { Page } from "../models";
import { UniqueIdHelper } from "../helpers";

export class PageRepository {

    public save(page: Page) {
        return page.id ? this.update(page) : this.create(page);
    }

    private async create(page: Page) {
        page.id = UniqueIdHelper.shortId();
        const query = "INSERT INTO pages (id, churchId, name, path, lastModified) VALUES (?, ?, ?, ?, NOW());";
        const params = [page.id, page.churchId, page.name, page.path];
        await DB.query(query, params);
        return page;
    }

    private async update(page: Page) {
        const query = "UPDATE pages SET name=?, path=?, lastModified=NOW() WHERE id=? AND churchId=?;";
        const params = [page.name, page.path, page.id, page.churchId];
        await DB.query(query, params);
        return page;
    }

    public delete(id: string, churchId: string) {
        return DB.query("DELETE FROM pages WHERE id=? AND churchId=?;", [id, churchId]);
    }

    public loadById(id: string, churchId: string): Promise<Page> {
        return DB.queryOne("SELECT * FROM pages WHERE id=? AND churchId=?;", [id, churchId]);
    }

    public loadAll(churchId: string): Promise<Page[]> {
        return DB.query("SELECT * FROM pages WHERE churchId=?;", [churchId]);
    }


}

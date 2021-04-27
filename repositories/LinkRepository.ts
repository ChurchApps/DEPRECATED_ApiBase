import { DB } from "../db";
import { Link } from "../models";
import { UniqueIdHelper } from "../helpers";

export class LinkRepository {

    public loadAll(churchId: string) {
        return DB.query("SELECT * FROM links WHERE churchId=? order by sort", [churchId]);
    }

    public loadByCategory(churchId: string, category: string) {
        return DB.query("SELECT * FROM links WHERE churchId=? and category=? order by sort", [churchId, category]);
    }

    public save(link: Link) {
        if (UniqueIdHelper.isMissing(link.id)) return this.create(link); else return this.update(link);
    }

    public async create(link: Link) {
        link.id = UniqueIdHelper.shortId();
        const query = "INSERT INTO links (id, churchId, category, url, linkType, linkData, icon, text, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        const params = [UniqueIdHelper.shortId(), link.churchId, link.category, link.url, link.linkType, link.linkData, link.icon, link.text, link.sort];
        await DB.query(query, params)
        return link;
    }

    public delete(id: string, churchId: string) {
        return DB.query("DELETE FROM links WHERE id=? AND churchId=?;", [id, churchId]);
    }

    public async update(link: Link) {
        const sql = "UPDATE links SET category=?, url=?, linkType=?, linkData=?, icon=?, text=?, sort=? WHERE id=?;";
        const params = [link.category, link.url, link.linkType, link.linkData, link.icon, link.text, link.sort, link.id];
        await DB.query(sql, params);
        return link;
    }

    public loadById(id: string, churchId: string): Promise<Link> {
        return DB.queryOne("SELECT * FROM links WHERE id=? AND churchId=?;", [id, churchId]);
    }


}

import { injectable } from "inversify"
import { DB } from "../db";
import { Setting } from "../models";
import { UniqueIdHelper } from "../helpers";

@injectable()
export class SettingRepository {

    public async save(setting: Setting) {
        if (UniqueIdHelper.isMissing(setting.id)) return this.create(setting); else return this.update(setting);
    }

    public async create(setting: Setting) {
        setting.id = UniqueIdHelper.shortId();
        return DB.query(
            "INSERT INTO settings (id, churchId, keyName, value) VALUES (?, ?, ?, ?)",
            [setting.id, setting.churchId, setting.keyName, setting.value]
        ).then(() => { return setting; });
    }

    public async update(setting: Setting) {
        return DB.query(
            "UPDATE settings SET churchId=?, keyName=?, value=? WHERE id=? AND churchId=?",
            [setting.churchId, setting.keyName, setting.value, setting.id, setting.churchId]
        ).then(() => setting)
    }

    public async loadAll(setting: string) {
        return DB.query("SELECT * FROM settings WHERE churchId=?;", [setting]);
    }

    public convertToModel(churchId: string, data: any) {
        const result: Setting = {
            id: data.id,
            keyName: data.keyName,
            value: data.value
        };
        return result;
    }

    public convertAllToModel(churchId: string, data: any[]) {
        const result: Setting[] = [];
        data.forEach(d => result.push(this.convertToModel(churchId, d)));
        return result;
    }
}
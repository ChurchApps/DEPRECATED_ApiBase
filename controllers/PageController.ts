import { controller, httpPost, httpGet, httpDelete, requestParam } from "inversify-express-utils";
import { Page } from "../models";
import express from "express";
import { CustomBaseController } from "./CustomBaseController";
import { Permissions, FileHelper, UniqueIdHelper } from "../helpers";

@controller("/pages")
export class PageController extends CustomBaseController {

    @httpGet("/")
    public async loadAll(req: express.Request, res: express.Response): Promise<any> {
        return this.actionWrapper(req, res, async (au) => {
            return await this.baseRepositories.page.loadAll(au.churchId);
        });
    }

    @httpGet("/:churchId/:id")
    public async loadAnon(@requestParam("churchId") churchId: string, @requestParam("id") id: string, req: express.Request, res: express.Response): Promise<any> {
        return this.actionWrapperAnon(req, res, async () => {
            const result = await this.baseRepositories.page.loadById(id, churchId);
            return result;
        });
    }

    @httpGet("/:id")
    public async load(@requestParam("id") id: string, req: express.Request, res: express.Response): Promise<any> {
        return this.actionWrapper(req, res, async (au) => {
            const result = await this.baseRepositories.page.loadById(id, au.churchId);
            return result;
        });
    }

    @httpPost("/")
    public async save(req: express.Request<{}, {}, Page[]>, res: express.Response): Promise<any> {
        return this.actionWrapper(req, res, async (au) => {
            if (!au.checkAccess(Permissions.pages.edit)) return this.json({}, 401);
            else {
                let pages: Page[] = req.body;
                const promises: Promise<Page>[] = [];
                pages.forEach((page) => {
                    if (page.churchId === au.churchId) promises.push(
                        this.baseRepositories.page.save(page).then(async (p) => {
                            if (page.content !== null && page.content !== "") {
                                const buffer = Buffer.from(page.content, "binary");
                                const path = au.churchId + "/pages/" + page.id + ".html";
                                await FileHelper.store(path, "text/html", buffer);
                                console.log("saved")
                                console.log(page.path);
                                if (UniqueIdHelper.isMissing(page.path)) {
                                    console.log("saving path")
                                    page.path = path;
                                    await this.baseRepositories.page.save(page);
                                }
                                console.log(path);
                            }
                            return p;
                        })
                    )
                });
                pages = await Promise.all(promises);
                return this.json(pages, 200);
            }
        });
    }

    @httpDelete("/:id")
    public async delete(@requestParam("id") id: string, req: express.Request, res: express.Response): Promise<void> {
        return this.actionWrapper(req, res, async (au) => {
            if (!au.checkAccess(Permissions.pages.edit)) return this.json({}, 401);
            else {
                await this.baseRepositories.page.delete(id, au.churchId);
                await FileHelper.remove(au.churchId + "/pages/" + id + ".html");
            }
        });
    }

}

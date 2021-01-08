import { controller, httpPost, httpGet, httpDelete, requestParam } from "inversify-express-utils";
import express from "express";
import { Link } from "../models";
import { CustomBaseController } from "./CustomBaseController";

@controller("/links")
export class LinkController extends CustomBaseController {
    @httpGet("/")
    public async loadAll(req: express.Request, res: express.Response): Promise<any> {
        return this.actionWrapper(req, res, async (au) => {
            const category = req.query.category.toString();
            if (category === undefined) return await this.baseRepositories.link.loadAll(au.churchId);
            else return await this.baseRepositories.link.loadByCategory(au.churchId, category);
        });
    }

    @httpPost("/")
    public async save(req: express.Request<{}, {}, Link[]>, res: express.Response): Promise<any> {
        return this.actionWrapper(req, res, async (au) => {
            if (!au.checkAccess('Links', 'Edit')) return this.json({}, 401);
            else {
                let links: Link[] = req.body;
                const promises: Promise<Link>[] = [];
                links.forEach((link) => { if (link.churchId === au.churchId) promises.push(this.baseRepositories.link.save(link)); });
                links = await Promise.all(promises);
                return this.json(links, 200);
            }
        });
    }


    @httpDelete("/:id")
    public async delete(@requestParam("id") id: number, req: express.Request, res: express.Response): Promise<void> {
        return this.actionWrapper(req, res, async (au) => {
            await this.baseRepositories.link.delete(id, au.churchId);
            return null;
        });
    }



}





import { controller, httpPost, httpGet, httpDelete, requestParam } from "inversify-express-utils";
import { File } from "../models";
import express from "express";
import { CustomBaseController } from "./CustomBaseController";


@controller("/files")
export class FileController extends CustomBaseController {


    @httpGet("/:itemId")
    public async loadAnon(@requestParam("itemId") itemId: string, req: express.Request, res: express.Response): Promise<any> {
        return this.actionWrapperAnon(req, res, async () => {
            return await this.baseRepositories.file.loadById(itemId);
        });
    }



}

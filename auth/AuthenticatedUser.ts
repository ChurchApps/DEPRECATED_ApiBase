import { Principal } from './'


export class AuthenticatedUser {
    // public details: any;
    public id: number;
    public churchId: number;
    public email: string;
    public permissions: string[];
    public apiName: string;

    public constructor(principal: Principal) {
        this.id = principal.details.id;
        this.churchId = principal.details.churchId;
        this.permissions = principal.details.permissions;
        this.apiName = principal.details.apiName;
    }

    public checkAccess(contentType: string, action: string) {
        const key = contentType + "__" + action;
        let result = false;
        this.permissions.forEach((p: string) => { if (p === key) result = true; });
        return result;
    }



}

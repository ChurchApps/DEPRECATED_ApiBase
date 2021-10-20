export class Permissions {
    static forms = {
        admin: { contentType: "Forms", action: "Admin" },
        create: { contentType: "Forms", action: "Create" },
        access:  { contentType: "Forms", action: "Admin" } || { contentType: "Forms", action: "Create" },
    };
    static links = {
        edit: { contentType: "Links", action: "Edit" }
    };
    static notes = {
        view: { contentType: "Notes", action: "View" },
        edit: { contentType: "Notes", action: "Edit" }
    };
    static pages = {
        edit: { contentType: "Pages", action: "Edit" }
    };
    static settings = {
        edit: { contentType: "Settings", action: "Edit" }
    };
}
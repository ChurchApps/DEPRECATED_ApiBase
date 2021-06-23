import { Person } from ".";

export class Note {
    public id?: string;
    public churchId?: string;
    public contentType?: string;
    public contentId?: string;
    public noteType?: string;
    public addedBy?: string;
    public dateAdded?: Date;
    public contents?: string;

    public person?: Person;
}

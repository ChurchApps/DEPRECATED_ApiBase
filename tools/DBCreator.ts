import dotenv from "dotenv";
import fs from "fs-extra";
import { DB } from "../db";

export class DBCreator {

    private static tables: { title: string, file: string }[] = [
        { title: "Answers", file: "answers.mysql" },
        { title: "Forms", file: "forms.mysql" },
        { title: "FormSubmissions", file: "formSubmissions.mysql" },
        { title: "Links", file: "links.mysql" },
        { title: "Notes", file: "notes.mysql" },
        { title: "Pages", file: "pages.mysql" },
        { title: "Questions", file: "questions.mysql" }
    ]

    public static async init(selectedTables: string[]) {
        dotenv.config();

        const todo: { title: string, file: string }[] = [];
        selectedTables.forEach(async st => {
            this.tables.forEach(async t => {
                if (t.title === st) todo.push(t);
            });
        });

        for (let i = 0; i < todo.length; i++) await this.runScript(todo[i].title, todo[i].file);
        return;
    }

    private static async runScript(title: string, file: string) {
        console.log("Creating '" + title + "'");
        const sql = await fs.readFile('./src/apiBase/tools/dbScripts/' + file, { encoding: "UTF-8" });
        const statements = sql.split(/;\s*$/m);
        for (const statement of statements) if (statement.length > 3) await DB.query(statement, []);
    }

}
import { LinkRepository, NoteRepository, PageRepository } from ".";
import { SettingRepository } from "./SettingRepository";

export class Repositories {
  public link: LinkRepository;
  public note: NoteRepository;
  public page: PageRepository;
  public setting: SettingRepository;


  private static _current: Repositories = null;
  public static getCurrent = () => {
    if (Repositories._current === null) Repositories._current = new Repositories();
    return Repositories._current;
  }

  constructor() {
    this.link = new LinkRepository();
    this.note = new NoteRepository();
    this.page = new PageRepository();
    this.setting = new SettingRepository();
  }
}

import { LinkRepository, PageRepository } from ".";
import { SettingRepository } from "./SettingRepository";

export class Repositories {
  public link: LinkRepository;
  public page: PageRepository;
  public setting: SettingRepository;


  private static _current: Repositories = null;
  public static getCurrent = () => {
    if (Repositories._current === null) Repositories._current = new Repositories();
    return Repositories._current;
  }

  constructor() {
    this.link = new LinkRepository();
    this.page = new PageRepository();
    this.setting = new SettingRepository();
  }
}

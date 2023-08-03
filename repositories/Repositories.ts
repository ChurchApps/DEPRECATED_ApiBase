import { SettingRepository } from "./SettingRepository";

export class Repositories {
  public setting: SettingRepository;


  private static _current: Repositories = null;
  public static getCurrent = () => {
    if (Repositories._current === null) Repositories._current = new Repositories();
    return Repositories._current;
  }

  constructor() {
    this.setting = new SettingRepository();
  }
}

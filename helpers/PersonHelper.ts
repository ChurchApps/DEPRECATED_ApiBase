export class PersonHelper {
  public static getPhotoUrl(churchId: string, person: any) {
    if (!person.photoUpdated) return "";
    else return "/" + churchId + "/membership/people/" + person.id + ".png?dt=" + person.photoUpdated.getTime().toString();
  }

  public static getDisplayName(person: any) {
    if (person?.name?.nick !== null && person?.name?.nick !== "" && person?.name?.nick !== undefined) return person.name.first + " \"" + person.name.nick + "\" " + person.name.last;
    else return person.name.first + " " + person.name.last;
  }

}
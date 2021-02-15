export class UniqueIdHelper {

    /*NOTE: The string generated here is not guarantted to be unique; however there are 64^10 = 1 in 1 sextillion odds of generating the same string twice.
    The database tables where this value is stored as the PK should have a unique constraint on the field so that it throws an error in the extremely rare case
    the a duplicate is created.  This is done to keep the string 10 digits long for urls (/people/vAzfdNfh80) instead of 22 required for a guid (/people/2df4b729e7154cf39d5eedfb0a1dde16).
    */
    public static shortId() {
        const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "-", "_"];

        let result = "";
        for (let i = 0; i < 10; i++) {
            const idx = Math.floor(Math.random() * 64);
            const c = chars[idx];
            result += c;
        }

        return result;
    }
}
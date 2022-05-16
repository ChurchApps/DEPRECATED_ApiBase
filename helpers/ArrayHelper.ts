import { UniqueIdHelper } from "./UniqueIdHelper";

export class ArrayHelper {
  static getIds(array: any[], propertyName: string) {
    const result: string[] = [];
    for (const item of array) {
      const id = item[propertyName];
      if (!UniqueIdHelper.isMissing(id) && result.indexOf(id) === -1) result.push(id);
    }
    return result;
  }

  static getOne(array: any[], propertyName: string, value: any) {
    for (const item of array) if (item[propertyName] === value) return item;
    return null
  }

  static getAll(array: any[], propertyName: string, value: any) {
    const result: any[] = []
    for (const item of array) if (item[propertyName] === value) result.push(item);
    return result;
  }

  static getAllOperator(array: any[], propertyName: string, value: any, operator: string) {
    const result: any[] = []
    for (const item of array) {
      switch (operator) {
        case "equals":
          if (item[propertyName] === value) result.push(item);
          break;
        case "startsWith":
          if (item[propertyName].indexOf(value) === 0) result.push(item);
          break;
        case "endsWith":
          if (item[propertyName].indexOf(value) === item[propertyName].length - value.length) result.push(item);
          break;
        case "contains":
          if (item[propertyName].indexOf(value) > -1) result.push(item);
          break;
        case "greaterThan":
          if (item[propertyName] > value) result.push(item);
          break;
        case "greaterThanEqual":
          if (item[propertyName] >= value) result.push(item);
          break;
        case "lessThan":
          if (item[propertyName] < value) result.push(item);
          break;
        case "lessThanEqual":
          if (item[propertyName] <= value) result.push(item);
          break;
        case "notEqual":
          if (item[propertyName] != value) result.push(item);
          break;
      }
    }
    return result;
  }

  static fillArray(contents: string, length: number) {
    const result = [];
    for (let i = 0; i < length; i++) result.push(contents);
    return result;
  }
}

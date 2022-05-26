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

  static getUnique(array: any[]) {
    const result: any[] = []
    const jsonList: string[] = [];
    for (const item of array) {
      const json = JSON.stringify(item);
      if (jsonList.indexOf(json) === -1) {
        result.push(item);
        jsonList.push(json);
      }
    }
    return result;
  }

  static getAllOperatorArray(array: any[], propertyName: string, values: any[], operator: string, dataType = "string") {
    const result: any[] = [];
    values.forEach(v => {
      console.log(v);
      const filtered = this.getAllOperator(array, propertyName, v, operator.replace("notIn", "notEqual").replace("in", "equals"), dataType);
      filtered.forEach(f => result.push(f));
    })
    return result;
  }

  static getAllOperator(array: any[], propertyName: string, value: any, operator: string, dataType = "string") {
    const result: any[] = []
    for (const item of array) {


      let propVal = item[propertyName] || "";
      let compVal = value || "";
      if (dataType === "number") {
        propVal = parseFloat(propVal);
        compVal = parseFloat(compVal);
      } else if (dataType === "string") {
        propVal = propVal.toLowerCase();
        compVal = compVal.toLowerCase();
      }

      switch (operator) {
        case "equals":
          if (propVal === compVal) result.push(item);
          break;
        case "startsWith":
          if (propVal.indexOf(compVal) === 0) result.push(item);
          break;
        case "endsWith":
          if (propVal.indexOf(compVal) === propVal.length - compVal.length) result.push(item);
          break;
        case "contains":
          if (propVal.indexOf(compVal) > -1) result.push(item);
          break;
        case "greaterThan":
          if (propVal > compVal) result.push(item);
          break;
        case "greaterThanEqual":
          if (propVal >= compVal) result.push(item);
          break;
        case "lessThan":
          if (propVal < compVal) result.push(item);
          break;
        case "lessThanEqual":
          if (propVal <= compVal) result.push(item);
          break;
        case "notEqual":
          if (propVal !== compVal) result.push(item);
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

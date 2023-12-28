export const removeObjectWithId = (arr, id) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
  
    return arr;
  }

  export const delay = (time) => {
    new Promise(res => setTimeout(res(), time));
  }

  export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
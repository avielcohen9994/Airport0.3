const { io } = require("../utils/socketio/socketioUtil.js");

class landingsListSingleton {
  constructor() {
    if (landingsListSingleton.instance) {
      return landingsListSingleton.instance;
    }
    this.array = [];
    landingsListSingleton.instance = this;
  }

  addItem(item) {
    this.array.push(item);
    io.emit(`landingsListUpdate`, this.array);
    console.log('**landings** item added')
  }

  isEmpty() {
    return this.array.length === 0;
  }

  removeItem(item) {
    const index = this.array.indexOf(item);
    if (index !== -1) {
      this.array.splice(index, 1);
    }
  }

  shiftItem() {
    let item = this.array.shift();
    io.emit(`landingsListUpdate`, this.array);
    console.log('**landings** item shifted')
    return item;
  }

  getItem(item) {
    const index = this.array.indexOf(item);
    if (index >= 0 && index < this.array.length) {
      return this.array[index];
    } else {
      return null;
    }
  }

  getArray() {
    return this.array;
  }

  getByIndex(i) {
    return this.array[i];
  }
}

class takeoffssListSingleton {
  constructor() {
    if (takeoffssListSingleton.instance) {
      return takeoffssListSingleton.instance;
    }
    this.array = [];
    takeoffssListSingleton.instance = this;
  }

  addItem(item) {
    this.array.push(item);
    io.emit(`takeoffsListUpdate`, this.array);
    console.log('**takeoffs** item added')
  }

  isEmpty() {
    return this.array.length === 0;
  }

  removeItem(item) {
    const index = this.array.indexOf(item);
    if (index !== -1) {
      this.array.splice(index, 1);
    }
  }

  shiftItem() {
    let item = this.array.shift();
    io.emit(`takeoffsListUpdate`, this.array);
    console.log('**takeoffs** item shifted')
    return item;
  }

  getItem(item) {
    const index = this.array.indexOf(item);
    if (index >= 0 && index < this.array.length) {
      return this.array[index];
    } else {
      return null;
    }
  }

  getArray() {
    return this.array;
  }

  getByIndex(i) {
    return this.array[i];
  }
}

class plainsListSingelton {
  constructor() {
    if (plainsListSingelton.instance) {
      return plainsListSingelton.instance;
    }
    this.array = [];
    plainsListSingelton.instance = this;
  }
  addItem(item) {
    this.array.push(item);
  }

  isEmpty() {
    return this.array.length === 0;
  }

  removeItem(item) {
    const index = this.array.indexOf(item);
    if (index !== -1) {
      this.array.splice(index, 1);
    }
  }

  shiftItem() {
    return this.array.shift();
  }

  getItem(item) {
    const index = this.array.indexOf(item);
    if (index >= 0 && index < this.array.length) {
      return this.array[index];
    } else {
      return null;
    }
  }

  getArray(arr) {
    return (this.array = arr);
  }

  getByIndex(i) {
    return this.array[i];
  }
}

module.exports = {
  plainsListSingelton,
  landingsListSingleton,
  takeoffssListSingleton,
};

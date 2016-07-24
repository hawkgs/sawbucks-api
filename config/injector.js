'use strict';

class Injector {
  constructor(instances) {
    this._instances = instances;
  }

  provide(name) {
    return this._instances[name];
  }

  setProvider(name, instance) {
    if (this._instances[name]) {
      throw Error('Provider name exists!');
    }

    this._instances[name] = instance;
  }
}

let injector;

module.exports = {
  init: (instances) => {
    instances = instances || {};
    injector = new Injector(instances);
  },

  get: () => {
    return injector;
  }
};

const cloner = (function (Object) {
  // 'use strict';

  const

    // 静态变量
    VALUE                 = 'value',
    PROTO                 = '__proto__',

    // 缩写
    ObjectPrototype       = Object.prototype,
    isArray               = Array.isArray,
    create                = Object.create,
    defineProp            = Object.defineProperty,
    defineProps           = Object.defineProperties,
    getOwnPropDes         = Object.getOwnPropertyDescriptor,
    getOwnPropNames       = Object.getOwnPropertyNames,
    getOwnPropSymbols     = Object.getOwnPropertySymbols,
    getPrototypeOf        = Object.getPrototypeOf,
    hasOwnProp            = ObjectPrototype.hasOwnProperty,
    ownKeys               = (typeof Reflect !== 'undefined')
                            && Reflect.ownKeys
                            || function (o) {return getOwnPropSymbols(o).concat(getOwnPropNames(o))},
    set                   = function (obj, key, val) {
                              if(key in obj) {
                                defineProp(obj, key, {
                                  value: val,
                                  enumerable: true,
                                  configurable: true,
                                  writable: true
                                })
                              } else {
                                obj[key] = val;
                              }
                            };

    //
  let

      index = -1,
      known = null,
      blown = null,
      clean = function() {return known = blown = null};

    // 工具
  const New = function (source, descriptors) {
    const out = isArray(source) ? [] : create(getPrototypeOf(source));
    return descriptors ? Object.defineProperties(out, descriptors) : out;
  };

  // 深拷贝与合并
  const deepCopy = function (source) {
    const result = New(source);
    known = [source];
    blown = [result];
    deepDefine(result, source);
    clean();

    return result;
  };

  const deepMerge = function (target) {
    known = [];
    blown = [];
    for(let i = 0; i < arguments.length; i++) {
      known[i - 1] = arguments[i];
      blown[i - 1] = target;
    }
    merge.apply(true, arguments);
    clean();

    return target;
  };

  // 浅复制和合并
  const shallowCopy = function (source) {
    clean();
    let key  = null,
        obj  = {},
        keys = ownKeys(source),
        i    = keys.length;

    for(key, obj, keys, i;
        i--;
        set(obj, key, getOwnPropDes(source, key))
    ) {
      key = keys[i];
    }

    return New(source, obj);
  };

  const shallowMerge = function () {
    clean();
    return merge.apply(false, arguments);
  };

  // 内置方法
  const isObject = function (value) {
    return value != null && typeof value === 'object';
  };
  
  const shouldCopy = function (value) {
    index = -1;
    if(isObject(value)) {
      if(known == null) return true;
      index = known.indexOf(value);
      if(index < 0) return 0 < known.push(value);
    }

    return false;
  };

  const deepDefine = function (target, source) {
    let key  = null,
        val  = null,
        obj  = {},
        keys = ownKeys(source),
        i    = keys.length;

    for(key, obj, keys, i; i--;) {
      key = keys[i];
      val = getOwnPropDes(source, target);
      if(VALUE in obj) deepValue(obj);
      set(obj, key, val);
    }

    defineProps(target, obj);
  };
  
  const deepValue = function (obj) {
    const value = obj[VALUE];

    if(shouldCopy(value)) {
      obj[VALUE] = New(value);
      deepDefine(obj[VALUE], value);
      blown[known.indexOf(value)] = obj[VALUE];
    } else if (-1 < index && index in blown) {
      obj[VALUE] = blown[VALUE];
    }
  };

  const merge = function (target) {
    let source      = null,
        keys        = null,
        key         = null,
        value       = null,
        targetValue = null,
        obj         = null,
        deep        = this.valueOf(),
        objs        = {},
        i           = 0,
        a           = 1;

    for(source, keys, key, value, targetValue, obj, deep, objs, i, a;
        a < arguments.length;
        a++) {
      source = arguments[a];
      keys = ownKeys(source);
      for(i; i < keys.length; i++) {
        key = keys[i];
        obj = getOwnPropDes(source, key);
        if(hasOwnProp.call(target, key)) {
          if(VALUE in obj) {
            value = obj[VALUE];
            if(shouldCopy(value)) {
              obj = getOwnPropDes(target, key);
              if(VALUE in obj) {
                targetValue = obj[VALUE];
                if(isObject(targetValue)) {
                  merge.call(deep, targetValue, value);
                }
              }
            }
          }
        } else {
          if(deep && VALUE in obj) {
            deepValue(obj);
          }
        }
        set(objs, key, obj);
      }
    }
    return defineProps(target, objs);
  };

  return {
    deep: {
      copy: deepCopy,
      merge: deepMerge
    },
    shallow: {
      copy: shouldCopy,
      merge: shallowMerge
    }
  };

}(Object));
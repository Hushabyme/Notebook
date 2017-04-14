class ObserverList {
  constructor() {
    this.observerList = [];
  }

  Add(obj) {
    return this.observerList.push(obj);
  }

  Empty() {
    this.observerList = [];
  }

  Count() {
    return this.observerList.length;
  }

  Get(index) {
    if(index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
  }

  Insert(obj, index) {
    let pointer = -1;

    if(index === 0) {
      this.observerList.unshift(obj);
      pointer = index;
    } else if(index === this.observerList.length) {
      this.observerList.push(obj);
      pointer = index;
    }

    return pointer;
  }

  IndexOf(obj, startIndex) {
    let i = startIndex, pointer = -1;

    while(i < this.observerList.length) {
      if(this.observerList[i] === obj) {
        pointer = i;
      }

      i++;
    }

    return pointer;
  }

  RemoveIndexAt(index) {
    if(index === 0) {
      this.observerList.shift();
    } else if(index === this.observerList.length - 1) {
      this.observerList.pop();
    }
  }
}

class Subject {
  constructor() {
    this.observers = new ObserverList();
  }

  AddObserver(observer) {
    this.observers.Add(observer);
  }

  RemoveObserver(observer) {
    this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0));
  }

  Notify(context) {
    const observerCount = this.observers.Count();
    for(let i = 0; i < observerCount.length; i++) {
      this.observers.Get(i).Update(context);
    }
  }
}

class Observer {

}

function extend(obj, extension) {
  for(let key in obj) {
    extension[key] = obj[key];
  }
}
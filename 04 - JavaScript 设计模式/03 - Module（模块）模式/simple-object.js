const myApp = {
  user: 'Hushaby',
  myConfig: {
    useCaching: true,
    language: 'en'
  },
  methods: {
    upper(value) {
      return value.toUpperCase();
    },
    lower() {
      return this.user.toLowerCase();
    },
    toStr() {
      return `User is ${myApp.user}`;
    }
  }
};

myApp.password = 'abc123456';
console.log(myApp.methods.toStr());
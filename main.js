var app = new Vue({
  el: "#app",
  data: {
    message: "Free hot dogs on Monday!"
  },
  methods: {
    slowReplace: async function(word) {
      return new Promise(resolve => {
        setTimeout(() => {
          let result = word.replace("o", "😒");
          resolve(result);
        }, 1000);
      });
    },
    reset: function() {
      this.message = "Free hot dogs on Monday!";
    },
    run: async function() {
      this.message = "(running)";
      let result = "";
      // Wait on each promise to be resolved in serial.
      result += await this.slowReplace("Free ");
      result += await this.slowReplace("hot ");
      result += await this.slowReplace("dogs ");
      result += await this.slowReplace("on ");
      result += await this.slowReplace("Monday!");
      this.message = result;
      console.log(result);
    },
    runParallel: async function() {
      this.message = "(running)";
      let result = "";
      // Put all the promises in an array.
      let promises = [];
      promises.push(this.slowReplace("Free "));
      promises.push(this.slowReplace("hot "));
      promises.push(this.slowReplace("dogs "));
      promises.push(this.slowReplace("on "));
      promises.push(this.slowReplace("Monday! "));
      // Wait until all promises in the array have been fulfilled.
      let allResults = await Promise.all(promises);
      // In for loops, 'in' gives you each array index and 'of' gives you each array item.
      for (let eachResponse of allResults) {
        result = result + eachResponse;
      }
      this.message = result;
    }
  }
});

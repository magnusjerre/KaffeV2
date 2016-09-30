function Map() {
    this.keys = [];
    this.values = [];
    this.put = function(key, value) {
        var index = $.inArray(key, this.keys);
        if (index == -1) {
            console.log("key didn't exist, adding key");
            this.keys.push(key);
            this.values.push(value);
        } else {
            console.log("Key exists, updating value");
            this.values[index] = value;
        }
    };
    this.get = function(key) {
        var index = $.inArray(key, this.keys);
        if (index != -1) {
            return this.values[index];
        }
        return undefined;
    };
    //callback(key, value)
    this.foreach = function(callback) {
        for (var i = 0; i < this.keys.length; i++) {
            callback(this.keys[i], this.values[i]);
        }
    }
    this.count = function() {
        return this.keys.length;
    }
}
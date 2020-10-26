const LinkedList = require('./LinkedList');

// Testing out the arrays
let list = new LinkedList([1, 2, 3]);

// Append items to the list
list.append(4);
list.append([4, 4, 7, 8]);
list.append(6);

console.log(list.toArray());
console.log(list.toArray(true));

// check if value exists
console.log(list.includes(4));

// callback function
function getData(value) {
    if (value === 4) {
        return value
    }
}

list.delete(4, true);
list.delete(4);

console.log('Here: ', list.find(getData));

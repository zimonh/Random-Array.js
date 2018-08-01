# randArray.js
Function for making an array filled with random data using an array as input.

# Example

```
const NumbersArray = [...Array(512).keys()]; //[0,1,2,3.....511]

const test = randArray(NumbersArray,100);
console.log(test);
//=> Array(100) [ 142, 239, 346, 249, 462, 204, 167, 429, 458, 21, … ]



const test2 = randArray(['cheeze','panda','table'],200);
console.log(test2);
//=> Array(200) [ "table", "cheeze", "cheeze", "panda", "table", "cheeze", "cheeze", "panda", "panda", "panda", … ]
```

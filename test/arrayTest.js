let arr = [
    {name:'a', age:18},
    {name:'ab', age:19},
    {name:'ac', age:181},
    {name:'ad', age:183},
    {name:'ae', age:184},
    {name:'af', age:185}
]

let res = arr.some(obj => {
    console.log('a');

    return obj.age === 19
})

console.log(res);
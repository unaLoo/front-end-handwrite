/**
 * 把fs.readFile('xx').then().catch()转换如下
 * 
 */
function promisify(fn) {
    return function (path) {
        return new Promise((resolve, reject) => {
            fn(path, function (err, data) {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}
//test
promisify(fs.readFile)('input.txt')
    .then((data) => {
        console.log('异步读取: ' + data.toString());
    })
    .catch((err) => {
        console.error(err);
    });

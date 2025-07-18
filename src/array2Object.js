const data = [
    {
        id: 1,
        parent: 2,
    },
    {
        id: 2,
        parent: null,
    },
    {
        id: 3,
        parent: 2,
    },
    {
        id: 4,
        parent: 1,
    },
    {
        id: 5,
        parent: 2,
    },
    {
        id: 6,
        parent: 4,
    },
    {
        id: 7,
        parent: 3,
    },
    {
        id: 8,
        parent: 3,
    },
];

/**
 * 数组转树
 * 思路：先基于id建表，后遍历node，找到parentNode并将其插入
 * 注意：多根节点的话，就返回root数组，还有这是在data对象本身进行操作，有必要的话进行深拷贝
 */
function array2tree(data) {

    const map = new Map()
    let root
    // create hash table
    // const dt = { ...da } // 对象解构赋值深拷贝一份
    data.forEach((item) => {
        if (item.parent === null) root = item
        map.set(item.id, item)
    })
    // build Tree
    data.forEach((item) => {
        if (item == root) return
        const parentNode = map.get(item.parent)
        if (!parentNode) console.warn(`parent node ${item.parent} not found`)
        if (!parentNode.children) parentNode.children = []
        parentNode.children.push(item)
    })
    return root
}

const res = array2tree(data)
console.log(res)


console.log('+++++++++++++++++++++++++++++++++++++++++')
/**
 * 练习，数组转树
 */
const list = [
    { 'id': 'a2', 'label': '1', 'pid': 'a1' },
    { 'id': 'a3', 'label': '2', 'pid': 'a17' },
    { 'id': 'a1', 'label': '3', 'pid': 'a0' },
    { 'id': 'a4', 'label': '4', 'pid': 'a3' },
    { 'id': 'a5', 'label': '5', 'pid': 'a4' },
    { 'id': 'ax', 'label': '6', 'pid': 'a5' },
    { 'id': 'ay', 'label': '7', 'pid': 'a5' },
    { 'id': 'a6', 'label': '8', 'pid': 'a4' },
    { 'id': 'a7', 'label': '9', 'pid': 'a6' },
    { 'id': 'a9', 'label': '10', 'pid': 'a7' },
    { 'id': 'a10', 'label': '11', 'pid': 'a9' },
    { 'id': 'a11', 'label': '12', 'pid': 'a10' },
    { 'id': 'a12', 'label': '13', 'pid': 'a10' },
    { 'id': 'a13', 'label': '14', 'pid': 'a10' },
    { 'id': 'a14', 'label': '15', 'pid': 'a11' },
    { 'id': 'a15', 'label': '16', 'pid': 'a12' },
    { 'id': 'a16', 'label': '17', 'pid': 'a13' },
    { 'id': 'a17', 'label': '18', 'pid': 'a2' },
    { 'id': 'a0', 'label': '0', 'pid': null }
];

function buildTree(list) {

    let root
    let map = new Map()
    for (let li of list) {
        if (li['pid'] == null) root = li
        map.set(li['id'], li)
    }

    for (let item of list) {

        if (item == root) continue

        const parent = map.get(item['pid'])
        if(!parent.children) parent.children = []
        parent.children.push(item)
    }

    return root
}

const tree = buildTree(list);
console.log(tree)
console.log(JSON.stringify(tree));
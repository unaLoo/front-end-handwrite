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
const cityData = [
    {
        id: '1',
        name: '广东省',
        children: [
            {
                id: '11',
                name: '深圳市',
                children: [
                    {
                        id: '111',
                        name: '南山区',
                    },
                    {
                        id: '112',
                        name: '福田区',
                        children: [
                            {
                                id: '1121',
                                name: 'A街道',
                            },
                        ],
                    },
                    {
                        id: '113',
                        name: '福田区',
                        children: [
                            {
                                id: '1131',
                                name: 'A街道',
                            },
                        ],
                    },
                ],
            },
            {
                id: '12',
                name: '东莞市',
                children: [
                    {
                        id: '121',
                        name: 'A区',
                    },
                    {
                        id: '122',
                        name: 'B区',
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        name: '湖北省',
        children: [
            {
                id: '21',
                name: '武汉市',
                children: [
                    {
                        id: '211',
                        name: '洪山区',
                    },
                    {
                        id: '212',
                        name: '江夏区',
                        children: [
                            {
                                id: '2121',
                                name: 'A街道',
                            },
                        ],
                    },
                ],
            },
            {
                id: '22',
                name: '鄂州市',
                children: [
                    {
                        id: '221',
                        name: 'A区',
                    },
                    {
                        id: '222',
                        name: 'B区',
                    },
                ],
            },
        ],
    },
];
/**
 * 给一个嵌套的树结构对象，查找指定id的节点的父节点
 * 例：查找某区所属的市
 * 实现：树的层序遍历
 */
function findFather(roots, id) {
    const stack = [...roots]
    while (stack.length) {
        let levelSize = stack.length

        for (let i = 0; i < levelSize; i++) {
            const node = stack.pop()
            if (!node.children) continue

            for (let j = 0; j < node.children.length; j++) {
                if (node.children[j].id === id) return node
                stack.push(node.children[j])
            }

        }
    }

    return null
}

console.log(findFather(cityData, '1'))
console.log(findFather(cityData, '11'))
console.log(findFather(cityData, '111'))
console.log(findFather(cityData, '1121'))
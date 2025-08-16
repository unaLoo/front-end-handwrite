/**
 * JS中模块依赖通常需要进行拓扑排序，来确定模块加载顺序问题
 */

const dep = {
    moduleA: ["moduleB", "moduleC"],
    moduleB: ["moduleC"],
    moduleC: [],
    moduleD: ["moduleA", "moduleB"],
}

function getLoadOrder(dep) {

    const visited = new Set()
    const result = []

    function dfs(mod) { //深度优先遍历，最深的就是最基本的模块

        if (visited.has(mod)) return
        visited.add(mod)
        const modDep = dep[mod] || []
        for (const d of modDep) {
            dfs(d)
        }
        result.push(mod)
    }

    for (const module in dep) {
        dfs(module)
    }

    return result
}
console.log(getLoadOrder(dep))

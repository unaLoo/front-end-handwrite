var Node = function (key, val, prev, next) {
    this.key = key
    this.val = val
    this.prev = prev || null
    this.next = next || null
}


var LRUCache = function (capacity) {

    this.capacity = capacity
    this.map = new Map()

    this.head = new Node()
    this.tail = new Node()
    this.head.next = this.tail
    this.tail.prev = this.head
};

// Atomic Helper
LRUCache.prototype.deleteNode = function (dNode) {
    // 在链表中删除节点
    const prev = dNode.prev
    const next = dNode.next

    prev.next = next
    next.prev = prev
}


LRUCache.prototype.headInsert = function (nNode) {
    // 在链表头部插入节点
    const ogFirst = this.head.next
    this.head.next = nNode
    nNode.prev = this.head
    nNode.next = ogFirst
    ogFirst.prev = nNode
}

LRUCache.prototype.move2Head = function (node) {
    this.deleteNode(node)
    this.headInsert(node)
}



LRUCache.prototype.get = function (key) {

    if (!this.map.has(key)) return -1

    // 读取 value 作为返回值， 将节点挪到头节点之后（删除 + 插入）
    const node = this.map.get(key)
    this.move2Head(node)
    return node.val

};

LRUCache.prototype.put = function (key, value) {

    if (this.capacity <= 0) return

    if (!this.map.has(key)) {

        const newNode = new Node(key, value)

        if (this.map.size >= this.capacity) {

            // 找最旧节点，并删除之，同时 MAP 也要删
            const beforTail = this.tail.prev;
            this.deleteNode(beforTail)
            this.map.delete(beforTail.key)
        }

        // 插入 MAP， 插入链表头部（插入）
        this.headInsert(newNode)
        this.map.set(key, newNode)

    }
    else {

        // 找节点，更新其值，挪到链表头部（删除 + 插入）
        const node = this.map.get(key)
        node.val = value
        this.move2Head(node)
    }

};

class Node {
    constructor(val, next = null, prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

export class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // 'push' adds a node at the end of the list and
    // returns a reference to itself
    push(val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;

        return this;
    }

    // 'clear' removes all references to Node
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // '_getNodeAt' returns a reference to the node at the
    // desired index. Should only be used within the class
    _getNodeAt(index) {
        if (typeof index !== 'number' || index >= this.length || index < 0) return null;

        let mid = this.length / 2;
        let goForward = true;
        if (index > mid) goForward = false;

        let i;
        let curNode;
        if (goForward) {
            i = 0;
            curNode = this.head;
        } else {
            i = this.length - 1;
            curNode = this.tail;
        }

        while (i !== index) {
            if (goForward) {
                curNode = curNode.next;
                i++;
            } else {
                curNode = curNode.prev;
                i--;
            }
        }

        return curNode;
    }

    // 'pop' removes the last item from the list and returns
    // the value of that item
    pop() {
        let value;
        if (!this.head) return null;
        if (this.length === 1) {
            value = this.head.val;
            this.clear();
            return value;
        }

        value = this.tail.val;
        let prevNode = this.tail.prev;
        prevNode.next = null;
        this.tail.prev = null;
        this.tail = prevNode;
        this.length--;

        return value;
    }

    // 'unshift' adds a value to the front of the list and returns
    // a reference to itself. Similar to 'push' which adds the
    // value to the back of the list
    unshift(val) {
        if (!this.head) {
            return this.push(val);
        }

        let newNode = new Node(val);
        
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
        this.length++;

        return this;
    }

    // 'shift' removes a node from the front of the list and
    // returns its value
    shift() {
        if (this.length <= 1) return this.pop();

        let value = this.head.val;
        let nextNode = this.head.next;
        nextNode.prev = null;
        this.head.next = null;
        this.head = nextNode;
        this.length--;
        
        return value;
    }

    // 'get' used to retrieve the value of a node at a given index
    // in conjunction with the '_getNodeAt()' method. It returns
    // the value at the index, else null if the index is not valid
    get(index) {
        let node = this._getNodeAt(index);
        if (!node) return null;
        
        return node.val;
    }

    // 'set' uses the '_getNodeAt()' method to establish a
    // value at an index and returns that value, else null
    set(index, val) {
        let node = this._getNodeAt(index);
        if (!node) return null;
        if (node) {
            node.val = val;
            return node.val;
        }
    }

    // 'insert' will inject a node with a value at a specified
    // index. It returns a reference to itself
    insert(index, val) {
        if (index < 0 || index > this.length) return null;
        if ( index === 0) { return this.unshift(val);}
        else if (index === this.length) { return this.push(val);}
        else {
            let node = this._getNodeAt(index);
            let prevNode = node.prev;
            let newNode = new Node(val, prevNode, node);
            prevNode.next = newNode;
            node.prev = newNode;
            this.length++;

            return this;
        }
    }

    // 'remove' takes a node out of a list and returns the value
    // of that node, else null if the index is invalid
    remove(index) {
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        let node = this._getNodeAt(index);
        if (node) {
            let prev = node.prev;
            let next = node.next;
            prev.next = next;
            next.prev = prev;
            node.prev = null;
            node.next = null;
            this.length--;

            return node.val;
        }

        return null;
    }

    // 'reverse' will reverse the linked list and return a
    // reference to itself
    reverse() {
        let current = this.head;
        let tail = this.tail;
        let temp;
        while (current) {
            temp = current.next;
            current.next = current.prev;
            current.prev = temp;
            if (!temp) {
                this.tail = this.head;
                this.head = current;
            }
            current = temp;
        }

        return this;
    }
}
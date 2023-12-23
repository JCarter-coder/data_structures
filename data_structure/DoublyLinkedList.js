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

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

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

    get(index) {
        let node = this._getNodeAt(index);
        if (!node) return null;
        
        return node.val;
    }

    set(index, val) {
        let node = this._getNodeAt(index);
        if (!node) return null;
        if (node) {
            node.val = val;
            return node.val;
        }
    }

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
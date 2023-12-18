class Node {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

export class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        // create a new node with the given value
        const newNode = new Node(val);

        //if the linked list is empty
        if (!this.head) {
            // set the tail and the head to the new node
            this.head = newNode;
            this.tail = this.head;
        } else {
            // set the next of the last node to the new node
            this.tail.next = newNode;
            // set the tail to the last item in the list
            this.tail = newNode;
        }
        //update length of the list
        this.length++;
        //return reference to itself for chaining
        return this;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    _getNodeAt(index) {
        // Make sure that the index is a number within range
        // otherwise return null
        if (typeof index !== 'number' || !Number.isInteger(index) || index >= this.length || index < 0) {
            return null;
        }
        // set the starting point of the head of the list
        let curNode = this.head;
        // keep track of the current node by index (0 based)
        let currentIndex = 0;
        // While it's not the end of the list,
        // and the desired index has not been reached
        while (curNode !== null && currentIndex < index) {
            // move to the next node
            curNode = curNode.next;
            // update the index
            currentIndex++;
        }
        // return a reference to the node and the desired index
        return curNode;
    }

    pop() {
        let value;
        // If list is empty return null
        if (!this.head) return null;
        // if list has length 1
        if (this.length === 1) {
            // save value of the only node
            value = this.head.val;
            // clear the list (pop)
            this.clear();

            // return the saved value
            return value;
        }

        // If the list has more than 1 item
        // get the 2nd to last item
        const curNode = this._getNodeAt(this.length - 2);
        // save the value of the node referenced by the tail
        value = this.tail.val;
        // set 'tail' to the 2nd from last node
        this.tail = curNode;
        // remove connection between 2nd from last to last node
        curNode.next = null;
        // decrement list length
        this.length--;

        // return value of last item
        return value;
    }

    unshift(val) {
        // if the list is empty, push item into the list
        if (!this.head) {
            // return a reference to itself for chaining
            return this. push(val);
        }

        // create a new node
        const newNode = new Node(val);

        // set the next of the new node to reference head
        newNode.next = this.head;
        // set head to reference the new node
        this.head = newNode;
        // increment list length
        this.length++;
        
        // return a reference to itself for chaining
        return this;
    }

    shift() {
        // if the length of the list is 1 or less, use pop()
        // pop() return null if the list is empty
        if (this.length <= 1) return this.pop();

        // save value for the node referenced by head
        const value = this.head.val;
        // set head to the second node in the list
        this.head = this.head.next;
        // decrement list length
        this.length--;

        // return saved value from former first element of the list
        return value;
    }

    get(index) {
        // used _getNodeAt() to get reference to node at index
        const node = this._getNodeAt(index);
        // if the index does not exist, return null
        if (!node) return null;

        // if the node exists, return value of node
        return node.val;
    }
}
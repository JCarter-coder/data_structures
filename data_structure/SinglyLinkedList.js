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
}
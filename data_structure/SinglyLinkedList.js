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

    // 'push' adds a value to the end of a list
    // or it adds a value to an empty list
    // and returns itself as a value
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

    // 'clear' removes all references to Node
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    // '_getNodeAt' is used within the class to return a reference to a 
    // desired index of the list
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

    // 'pop' removes the last item from the list and returns the value
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

    // 'unshift' adds a value to the front of the list
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

    // 'shift' removes a node from the front of the list
    // and returns its value
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

    // 'get' obtains the value of a node at an index
    get(index) {
        // used _getNodeAt() to get reference to node at index
        const node = this._getNodeAt(index);
        // if the index does not exist, return null
        if (!node) return null;

        // if the node exists, return value of node
        return node.val;
    }

    // 'set' changes the value of a node at an index
    set(index, val) {
        // used _getNodeAt() to get reference to node at index
        const node = this._getNodeAt(index);
        // if the index does not exist, return null
        if (!node) return null;
        // update value of node
        node.val = val;

        // return value
        return val;
    }

    // 'insert' injects a node value into a list at an index
    insert(index, val) {
        // check to see if value is in range
        if (index < 0 || index > this.length) return null;
        // if inserting at 0, unshift value onto list
        if (index === 0) {
            return this.unshift(val);
        } else if (index === this.length) {
            return this.push(val);
        } else {
            // create new node
            const node = new Node(val);
            // get reference to node right before index to insert at
            const prev = this._getNodeAt(index - 1);
            // wire the new node into the list
            node.next = prev.next;
            prev.next = node;
            // increment the list length
            this.length++;

            // return a reference to self
            return this;
        }
    }

    remove(index) {
        // if the index that is being removed is the first one,
        // shift it out and return
        if (index === 0) return this.shift();
        // if the index that is being removed is the last one,
        // pop it out and return
        if (index === this.length - 1) return this.pop();

        //else, get a reference to the node before the one to be removed
        const prevNode = this._getNodeAt(index - 1);
        // if the node exists
        if (prevNode) {
            // save the value to return
            var val = prevNode.next.val;
            // change references such that it skips the node
            // that is being removed
            prevNode.next = prevNode.next.next;
            // decrement list length
            this.length--;

            //return value of the node that was removed
            return val;
        }
        // if you get here, the index is incorrect
        return null;
    }

    // 'remove' a node from a list and return the value
    reverse() {
        var next;
        var prev = null;
        // save a refrence to head
        var current = this.head;
        // start reversing by setting tail to what head was referencing
        this.tail = this.head;

        // while current is truthy (not null)
        while (current) {
            // get a reference to the node after current
            next = current.next;
            // set next on current to prev
            current.next = prev;
            // move forward with the reverse
            prev = current;
            current = next;
        }

        // set head to prev
        this.head = prev;

        // return reference to self
        return this;
    }
}
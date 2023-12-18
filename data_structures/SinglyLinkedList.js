class Node {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class SinglyLinkedList {
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
}

export default SinglyLinkedList
const LinkedListNode = require("./LinkedListNode");

class LinkedList {
  constructor(value) {
    this.size = 0;
    this.head = null;
    this.tail = null;

    if (value) {
      if (Array.isArray(value)) {
        return this.fromArray(value);
      }

      return new TypeError(value + " is not iterable");
    }

    return this;
  }

  /**
   * This will add a node to the beginning of the list.
   * @function prepend
   * @param {*} value - The value to be added to the new node.
   * @returns {LinkedList} - Will return 'this' as the LinkedList object.
   */
  prepend(value) {
    this.size += 1;

    const newNode = new LinkedListNode(value, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * This will add a node to the end of the list.
   * @function append
   * @param value - The value to be added to the new node.
   * @returns {LinkedList} - Will return 'this' as the LinkedList object.
   */
  append(value) {
    this.size += 1;

    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  /**
   * This will remove a node, containing the given value, from the list.
   * By default this will remove all nodes with the same value.
   * When "deleteOne" is set to true, only the first node will be deleted.
   * @function delete
   * @param {*} value the value to check that we're deleting the correct node.
   * @param {boolean} deleteOne this is an optional argument passed in to indicate that only one with the same value will be removed.
   */
  delete (value, deleteOne = false) {
      if (!this.head) {
          return false;
      }

      let deletedNode = null;

      // If the head needs to be deleted
      while (this.head && this.head.value == value) {
          this.size -= 1;
          
          deletedNode = this.head;
          
          this.head = this.head.next;
          
          if (deleteOne) {
              return true;
          }
      }

      let currentNode = this.head;

      // If any node except the head or tail needs to be deleted
      if (currentNode !== null) {
          while (currentNode.next) {
              this.size -= 1;

              deletedNode = currentNode.next;

              currentNode.next = currentNode.next.next;

              if (deleteOne) {
                  return true;
              } else {
                  currentNode = currentNode.next;
              }
          }
      }

      // If the tail needs to be deleted
      if (this.tail.value === value) {
          this.tail = currentNode;
      }

      if (deletedNode === null) {
          return false;
      } else {
          return true;
      }
  }

  /**
   * This will remove the first node from the list
   * @function deleteHead
   * @returns {boolean}
   */
  deleteHead() {
      if (!this.head) {
        return false;
      }

      this.size -= 1;

      const deletedHead = this.head;

      if (this.head.next) {
          this.head = this.head.next;
      } else {
          this.head = null;
          this.tail = null;
      }

      return true;
  }

  /**
   * This function willl essentially iterate through the entire list and locate the tail.
   * @function deleteTail
   * @returns {(boolean|object)} This will return a boolean in the case of the list being <=1 nodes. Otherwise it should return the deletedNode object.
   */
  deleteTail() {
      if (this.size === 0) {
          return false;
      }

      if (this.size === 1) {
          if (this.head === null) {
              return false;
          } else {
              this.head = null;
              this.tail = null;
              this.size -= 1;
              return true;
          }
      }

      const deletedTail = this.tail;

      let currentNode= this.head;

      while (currentNode.next) {
          if (!currentNode.next.next) {
              this.size -= 1;
              currentNode.next = null;
          } else {
              currentNode = currentNode.next;
          }
      }

      this.tail = currentNode;
      return deletedTail;
  }

  /**
   * If an array is passed, this method will be used.
   * This method will append each item in the array.
   * @function fromArray
   * @param {Array} values - This is an array of values.
   * @returns {LinkedList} - Will return 'this' as the LinkedList object.
   */
  fromArray(values) {
    values.forEach(value => this.append(value));
    return this;
  }

  /**
   * This method will be used to convert our LinkedList back in to an array.
   * When useNodes is set to true, we'll populate the array with the LinkedListNode object rather than the value.
   * @function toArray
   * @param {boolean} useNodes - this param will indicate whether we want to use the object or the value to populate the array.
   * @returns {Array} nodes - returns an array.
   */
  toArray(useNodes = false) {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(useNodes ? currentNode : currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * This will accept either a value or an instance of the LinkedListNode class.
   * @function includes
   * @param {*} value This will either be a value or an instance of the LinkedList class.
   * @returns {boolean} It should return a boolean indicating whether the element exists or not.
   */
  includes(value) {
    if (!this.head) {
        return false;
    }

    let isNode = value.constructor.name === 'LinkedListNode';

    if (isNode) {
        value = value.value;
    }

    let currentNode = this.head;

    while(currentNode) {
        if (value !== undefined && value === currentNode.value) {
            return true;
        }
        currentNode = currentNode.next;
    }

    return false;
  }

  /**
   * The find method should return the value of the first element in the linked list the is required by the callback.
   * @function find
   * @param {*} callback This call back function will provide the value to be found in the linked list. 
   * @returns {(undefined|object)} If the node exists it will be returned, else undefined will be returned.
   */
  find(callback) {
      if (Object.prototype.toString.call(callback) !== '[object Function]') {
          return new TypeError(callback + ' is not a function');
      }

      if (!this.head) {
          return undefined;
      }

      let currentNode = this.head;

      while (currentNode) {
        if (callback && callback(currentNode.value)) {
            return currentNode;
        }

        currentNode = currentNode.next;
      }

      return undefined;
  }
}

module.exports = LinkedList;

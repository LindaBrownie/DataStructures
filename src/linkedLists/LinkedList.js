function Node(data, next) {
  this.data = data === undefined ? null : data;
  this.next = next;
}

function push(head, data) {
  var current = new Node(data);
  current.next = head;
  
  return current;
}

function createLinkedList() {
  var list = null;
  list = push(list, 3);
  list = push(list, 2);
  list = push(list, 1);
  
  return list;
}

function length(head) {
  var current = head;
  var len = 0;
  while(current){
    current = current.next;
    len++;
  }
  
  return len;
}

function countGivenNode(head, data) {
  var count = 0;
  var prevNode = head;
  while(prevNode) {
    if(prevNode.data === data) {
      count++;
    }
    prevNode = prevNode.next;
  }
  
  return count;
}

function getNth(node, index) {
  if (node === null) throw new Error();
  if (index === 0) return node;
  
  return getNth(node.next, index - 1)
}

function insertNth(head, index, data) {
  if(index === 0) {
    var newNode = new Node(data);
    newNode.next = head;
    return newNode;
  }
  if(head) {
    head.next = insertNth(head.next, index-1, data);
    return head;
  }
  throw error();
}

function sortedInsert(head, data) {
  var newNode = new Node(data);
  if (head === null) return newNode;
  
  if (newNode.data < head.data) {
    newNode.next = head;
    return newNode;
  } else {
    head.next = sortedInsert(head.next, data);
  }
  return head;
}

function insertSort(head) {
  if (!head) return null;
  
  return sortedInsert(insertSort(head.next), head.data);
}

function append(listA, listB) {
  if (!listA) return listB;
  if (!listB) return listA;
  
  var head = listA;
  while (listA.next) listA = listA.next;
  
  listA.next = listB;
  
  return head;
}

function removeDuplicates(head) {
  if(!head) return head;
  
  var node = head;
  while (node.next){
    if (node.data === node.next.data) {
      node.next = node.next.next;
    } else {
      node = node.next;
    }
  }
  
  return head;
}

function Context(source, dest) {
  this.source = source;
  this.dest = dest;
}

function moveNode(source, dest) {
  if (!source) throw error();
  
  var node = source;
  source = source.next;
  
  node.next = dest;
  dest = node;
  
  return new Context(source, dest);
}

function alternatingSplit(head) {
  if (!head.next) throw 'Error';

  var toFirst = true;
  var first = null;
  var second = null;
  
  while (head) {
    if (toFirst) first = append(first, new Node(head.data));
    else second = append(second, new Node(head.data));
    
    head = head.next;
    toFirst = !toFirst;
  }
  
  return new Context(first, second);
}

function frontBackSplit(source, front, back) {
  if (!source || !source.next) throw "Error";
  
  var front_last_node;
  var slow = source;
  var fast = source;
  
  while (fast) {
    front_last_node = slow;
    slow = slow.next;
    fast = (fast.next) ? fast.next.next : null;
  }
  
  front_last_node.next = null;
  front.data = source.data;
  front.next = source.next;
  
  back.data = slow.data;
  back.next = slow.next;
}

function shuffleMerge(first, second) {
  if(first === null) return second;
  if(second === null) return first;

  var newList; 
  var toFirst = true;
  
  while (first || second) {
    if (first && toFirst) {
      newList = append(newList, new Node(first.data));
      first = first.next;
    } else if(second) {
      newList = append(newList, new Node(second.data));
      second = second.next;
    }
    toFirst = !toFirst;
  }
  
  return newList;
}

function sortedMerge(first, second) {
  if (!first) return second;
  if (!second) return first;
  
  var start = new Node();
  var newList = start;
  
  while (first && second) { 
    if(first.data <= second.data) {
      newList.next = first;
      first = first.next
    } else {
      newList.next = second
      second = second.next;
    }
    newList = newList.next;
  }
  
  //append the rest of the list
  if (!first) { newList.next = second; }
  if (!second) { newList.next = first; }
  
  return start.next;
}

function mergeSort(list) {
  if(!list) return list;
  if(list.next === null) return list;
  
  var front = new Node();
  var back = new Node();

  frontBackSplit(list, front, back);
  
  return sortedMerge(mergeSort(front), mergeSort(back));
}

function sortedIntersect(first, second) {
  if(!first) return null;
  if(!second) return null;
  
  var intersectedList = null;
  
  while (first && second) {
    if(first.data < second.data) {
      // move the first.next, if it is smaller
      first = first.next;
    } else if (first.data > second.data) {
      // move the second.next, if it is smaller
      second = second.next;
    } else {
      // append node to list if both are the same, 
      // and move the first.next and second.next
      intersectedList = append(intersectedList, new Node(first.data));
      first = first.next;
      second = second.next;
    }
  }
  
  return removeDuplicates(intersectedList);
}

function reverse(list) {
  if(!list) return null;
  
  var start = list;
  var prev = null;
  while (start) {
    prev = new Node(start.data, prev)
    start = start.next;
  }

  list.data = prev.data;
  list.next = prev.next;
}

function testing(actual, expected, message) {
  if (expected === actual) {
    console.log("*****PASSED!!!!!************** " + 
                "\nExpected: " + expected +
                "\nActual: " + actual +
                "\n" + message);
  } else {
    console.log("========FAILED=======  " +
                "\nExpected: " + expected + 
                "\nActual: " + actual +
                ":(\n" + message);
  }
}

var list = createLinkedList();

testing(length(null), 0, "Length of null list should be zero.");
testing(length(new Node(99)), 1, "Length of single node list should be one.");
testing(length(list), 3, "Length of the three node list should be three.");

testing(countGivenNode(list, 1), 1, "list should only contain one 1.");
testing(countGivenNode(list, 2), 1, "list should only contain one 2.");
testing(countGivenNode(list, 3), 1, "list should only contain one 3.");
testing(countGivenNode(list, 99), 0, "list should return zero for integer not found in list.");
testing(countGivenNode(null, 1), 0, "null list should always return count of zero.");

testing(getNth(list, 0).data, 1, "First node should be located at index 0.");
testing(getNth(list, 1).data, 2, "Second node should be located at index 1.");
testing(getNth(list, 2).data, 3, "Third node should be located at index 2.");

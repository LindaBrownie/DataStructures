function Node(data) {
  this.data = data;
  this.next = null;
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
     current= current.next;
     len++;
   }
  
  return len;
}

function countGivenNode(head, data) {
  var number = 0;
  var prevNode = head;
  while(prevNode) {
    if(prevNode.data === data){
      number++;
    }
    prevNode = prevNode.next;
  }
  
  return number;
}

function getNth(node, index) {
  if (node === null) {
	throw new Error()
  }
  if (index === 0) {
	return node
  }
  
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
  if (head === null) {
	return newNode;
  }
  if (newNode.data < head.data) {
    newNode.next = head;
    return newNode;
  } else {
    newNode.next = head.next;
	  head.next = sortedInsert(head.next, data);
  }
  return head;
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

package linkedLists.java;

import java.util.Iterator;
import java.util.NoSuchElementException;

/*
 * Single chain of nodes
 * Contains head and a tail pointers
 * Operations: Add, Remove, Find, and Enumerate
 */
public class LinkedList<T> {
	
	private Node<T> head = null;
	private Node<T> tail = null;
	int count = 0;
	
	public Node<T> getHead() { return this.head; }
//	private void setHead(Node<T> value) { this.head = value; }
	
	public Node<T> getTail() { return this.tail; }
//	private void setTail(Node<T> value) { this.tail = value; }
	
	public int getCount() { return this.count; }
	protected void setCount(int value) { this.count = value; }
	
	// Add to Front
	// First, allocate node & set head and tail to first node
	// Add more nodes by allocating each node, then update the head pointer
	public void addFirst(T data) {
		Node<T> node = new Node<T>(data);
		
		// keep track of current head
		Node<T> temp = this.head;
		
		// set the head to the new node
		this.head = node;
		
		// set the head pointer to the previous head node
		head.setNext(temp);
		
		count++;
		
		// if this is the first node added, set the tail to point 
		// to the head as well
		if (count == 1) {
			tail = head;
		}
	}
	
	// Add to End
	// First, allocate node & set head and tail to first node
	// Add more nodes by allocating each node, then update the head pointer
	public void addLast(T data) {
		Node<T> node = new Node<T>(data);
		
		if (count == 0) {
			head = node;
		} else {
			tail.setNext(node);
		}
		
		tail = node;
		
		count++;
	}
	
	// Remove from End
	public void removeLast() {
		
		if (count <= 0) {
			return;
		}
		
		if (count == 1) {
			head = null;
			tail = null;
		} else {
			Node<T> currentNode = head;
			while (currentNode.getNext() != tail) {
				currentNode = currentNode.getNext();
			}
			
			currentNode.setNext(null);
			tail = currentNode;
		}
		
		count--;
	}
	
	// Remove from Beginning
	public void removeFirst() {
		
		if (count==0) {
			return;
		}
		
		if (count == 1) {
			head = null;
			tail = null;
		} else {
			head = head.getNext();
		}
		
		count--;
	}
	
	public String toString(){
        String linkedListStr = "";

        Iterator<T> iter = iterator();
        while(iter.hasNext()){
        	linkedListStr += iter.next() + ",";
        }

        return linkedListStr;
    }
	
	public Iterator<T> iterator() { return new LinkedListIterator(); }

    private class LinkedListIterator implements Iterator<T> {
        private Node<T> current = head;

        public T next() {
            if (!hasNext()) { throw new NoSuchElementException(); }
            T item = current.getValue();
            current = current.getNext();
            return item;
        }

        public boolean hasNext() { return current != null; }

        public void remove() { throw new UnsupportedOperationException(); }
		
	}
}

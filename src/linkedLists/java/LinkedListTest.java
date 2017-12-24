package linkedLists.java;

public class LinkedListTest<T> {
	
	public static void main(String[] args) {
		LinkedListTest<Integer> linkedListTest = new LinkedListTest<Integer>();
		linkedListTest.tests();
	}
	
	public void tests() {
		int[] testCase = new int[] {1,12,3,5,90,4,7};
		testing("7,4,90,5,3,12,1,", testAddFirst(new LinkedList<T>(), testCase));
		testing("1,12,3,5,90,4,7,", testAddLast(new LinkedList<T>(), testCase));
		testing("1,12,3,5,90,4,", testRemoveLast(new LinkedList<T>(), testCase));
		testing("12,3,5,90,4,7,", testRemoveFirst(new LinkedList<T>(), testCase));
	}
	
	private void testing(String expected, String actual) {
		if (expected.equals(actual)) {
			System.out.println("*****PASSED!!!!!************** \nExpected: " + expected + "\nActual: " + actual);
		} else {
			System.out.print("*****FAILED**********  \nExpected: " + expected + "\nActual: " + actual + ":(\n");
		}
	}
	
	@SuppressWarnings("unchecked")
	private String testAddFirst(LinkedList<T> linkedList, int[] testCase) {
		linkedList.setCount(0);
		for (Object value : testCase) {
			linkedList.addFirst((T) value);
		}
		return linkedList.toString();
	}
	
	@SuppressWarnings("unchecked")
	private String testAddLast(LinkedList<T> linkedList, int[] testCase) {
		linkedList.setCount(0);
		for (Object value : testCase) {
			linkedList.addLast((T) value);
		}
		return linkedList.toString();
	}
	
	@SuppressWarnings("unchecked")
	private String testRemoveLast(LinkedList<T> linkedList, int[] testCase) {
		linkedList.setCount(0);
		for (Object value : testCase) {
			linkedList.addLast((T) value);
		}
		
		linkedList.removeLast();
		
		return linkedList.toString();
	}
	
	@SuppressWarnings("unchecked")
	private String testRemoveFirst(LinkedList<T> linkedList, int[] testCase) {
		linkedList.setCount(0);
		for (Object value : testCase) {
			linkedList.addLast((T) value);
		}
		
		linkedList.removeFirst();
		
		return linkedList.toString();
	}

}

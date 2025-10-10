# Java Task Scheduler

A simple command-line application built in Java for managing and scheduling tasks. Users can add tasks, view them, and mark them as complete, with the ability to filter and sort tasks by category, deadline, and priority.

## Features

* **Add Tasks:** Easily add new tasks with a title, category, priority (Low, Medium, High), and a specific deadline.
* **View All Tasks:** See a complete list of all active tasks.
* **Organized Viewing:** View tasks organized and sorted by:
    * **Category:** Grouped by task category.
    * **Deadline:** Sorted chronologically by deadline using a `TreeMap`.
    * **Priority:** Sorted numerically by priority level (1=Low, 3=High) using a `TreeMap`.
* **Complete Tasks:** Remove tasks from the list once they are finished.

---

## How to Run

### Prerequisites

* **Java Development Kit (JDK):** Version 8 or higher is required.

### Compilation and Execution

1.  **Save the files:** Ensure `Task.java`, `TaskManager.java`, and `Main.java` are in the same directory.
2.  **Compile:** Open your terminal or command prompt in the directory containing the files and compile the Java source files:
    ```bash
    javac Main.java Task.java TaskManager.java
    ```
3.  **Run:** Execute the compiled application:
    ```bash
    java Main
    ```


## Class Structure

### `Task.java`

Represents a single task object.

* **Fields:** `title` (String), `category` (String), `priority` (int), `deadline` (`LocalDateTime`).
* **Methods:** Constructor, Getters, and Setters for all fields.

### `TaskManager.java`

Manages the collection of tasks and handles all logic for adding, viewing, and completing them.

* **Data Structures Used:**
    * `List<Task> tasks`: Stores all tasks.
    * `HashMap<String, List<Task>> categories`: Groups tasks by category for efficient lookup.
    * `TreeMap<LocalDateTime, List<Task>> taskByDeadlines`: Keeps tasks sorted by deadline.
    * `TreeMap<Integer, List<Task>> taskByPriority`: Keeps tasks sorted by priority (1 to 3).
* **Key Methods:** `addTask()`, `viewTasks()`, `viewTasksByCategory()`, `viewTasksByDeadline()`, `viewTasksByPriority()`, and `CompleteTask()`.

### `Main.java`

Contains the main application loop, handles user input via `Scanner`, and calls the appropriate methods in `TaskManager`.

---

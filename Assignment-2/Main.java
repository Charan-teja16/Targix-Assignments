
import java.time.LocalDateTime;
import java.util.*;

public class Main {
    public static void main(String... args) {
        Scanner sc = new Scanner(System.in);
        TaskManager taskmanager = new TaskManager();
        while (true) {
            System.out.println("------ TASK SCHEDULAR ------");
            System.out.println("1 . Add Task");
            System.out.println("2 . View All Tasks");
            System.out.println("3 . View Tasks by Category");
            System.out.println("4 . View Tasks by Deadline");
            System.out.println("5 . View Tasks by Priority"); 
            System.out.println("6 . Complete Task");
            System.out.println("7 . Exit");
            System.out.print("Enter Your Choice : ");
            int option = sc.nextInt();
            switch (option){

                case 1: 
                    System.out.print("Enter Task Name : ");
                    String title = sc.next();
                    System.out.print("Enter Category : ");
                    String category = sc.next();
                    System.out.print("Enter Priority For This Task (1:'Low', 2:'Medium', 3:'High'):");
                    int priority = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter The DeadLine For This Task (YYYY-MM-DDTHH:MM):");
                    LocalDateTime deadline = LocalDateTime.parse(sc.nextLine());
                    taskmanager.addTask(title, category, priority, deadline);
                    System.out.println();
                    System.out.println("Task Added Successfully --<>--");
                    System.out.println();
                    break;

                case 2:
                    System.out.println("Current Tasks To Complete 😐");
                    System.out.println();
                    taskmanager.viewTasks();
                    System.out.println();
                    break;
                case 3:
                    taskmanager.viewTasksByCategory();
                    System.out.println();
                    break;
                case 4:
                    taskmanager.viewTasksByDeadline();
                    System.out.println();
                    break;
                case 5:
                    taskmanager.viewTasksByPriority();
                    System.out.println();
                    break;
                case 6:
                    taskmanager.CompleteTask();
                    System.out.println();
                    break;
                case 7:
                    System.exit(0);
                default:
                    System.out.println("Invalid Option");
                    System.out.println();

            }

        }

    }
}
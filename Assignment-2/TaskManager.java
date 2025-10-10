import java.time.LocalDateTime;
import java.util.*;

public class TaskManager {
    Scanner sc = new Scanner(System.in);
    List<Task> tasks = new ArrayList<>();
    HashMap <String,List<Task>> categories = new HashMap<>();
    TreeMap <LocalDateTime,List<Task>> taskByDeadlines = new TreeMap<>();
    TreeMap <Integer,List<Task>> taskByPriority = new TreeMap<>();

    public void addTask(String title,String category,int priority,LocalDateTime deadline) {
        Task task = new Task(title, category, priority, deadline);
        tasks.add(task);
        if(categories.containsKey(category)) {
            List<Task> list = categories.get(category);
            list.add(task);
            categories.put(category , list);
        }
        else {
            List<Task> list = new ArrayList<>();
            list.add(task);
            categories.put(category , list);
        }

        if(taskByDeadlines.containsKey(deadline)) {
            List<Task> list = taskByDeadlines.get(deadline);
            list.add(task);
            taskByDeadlines.put(deadline , list);
        }
        else {
            List<Task> list = new ArrayList<>();
            list.add(task);
            taskByDeadlines.put(deadline , list);
        }

        if(taskByPriority.containsKey(priority)) {
            List<Task> list = taskByPriority.get(priority);
            list.add(task);
            taskByPriority.put(priority , list);
        }
        else {
            List<Task> list = new ArrayList<>();
            list.add(task);
            taskByPriority.put(priority , list);
        }

    }

    public void viewTasks() {
        for (Task task:tasks) {
            System.out.println("Task Name : "+task.getTitle());
            System.out.println("Task Category : "+task.getCategory());
            System.out.println("Task Priority : "+task.getPriority());
            System.out.println("Task DeadLine : "+task.getDeadline());
            System.out.println("------------------------------------");
        }
    }

    public void viewTasksByCategory() {
        for (String key:categories.keySet()) {
            List<Task> list = categories.get(key);
            System.out.println("Category : "+key);
            System.out.println();
            for (Task item:list){
                System.out.println("    Task Name : "+item.getTitle());
                System.out.println("    Task Priority : "+item.getPriority());
                System.out.println("    Task DeadLine : "+item.getDeadline());
                System.out.println("    --------------------------------");
            }
        }
    }

    public void viewTasksByDeadline() {
        for (LocalDateTime key:taskByDeadlines.keySet()) {
            List<Task> list = taskByDeadlines.get(key);
            for (Task item:list){
                System.out.println("DeadLine : "+key);
                System.out.println();
                System.out.println("    Task Name : "+item.getTitle());
                System.out.println("    Task Priority : "+item.getPriority());
                System.out.println("    Task Category : "+item.getCategory());
                System.out.println("    --------------------------------");
            }
        }
    }

    public void viewTasksByPriority() {
        for (int key:taskByPriority.keySet()) {
            List<Task> list = taskByPriority.get(key);
            System.out.println("Priority : "+key);
            System.out.println();
            for (Task item:list){
                System.out.println("    Task Name : "+item.getTitle());
                System.out.println("    Task Category : "+item.getCategory());
                System.out.println("    Task DeadLine : "+item.getDeadline());
                System.out.println("    --------------------------------");
            }
        }
    }

    public void CompleteTask(){
        System.out.println();
        for (Task task:tasks){
            System.out.println("Task Name : "+task.getTitle());
        }
        System.out.println("Enter The Task Name To Complete the Task");
        String title = sc.next();
        boolean flag = false;
        for (Task task:tasks){
            if(task.getTitle().equals(title)){
                String category = task.getCategory();
                LocalDateTime deadline = task.getDeadline();
                int priority = task.getPriority();

                for(String key:categories.keySet()) {
                    if (key.equals(category)){
                        int len = categories.get(key).size();
                        if (len==1) {
                            categories.remove(key);
                            break;
                        }
                        else {
                            
                            categories.get(category).remove(task);
                            break;
                        }
                    }
                }

                for(LocalDateTime key:taskByDeadlines.keySet()) {
                    if (key.equals(deadline)){
                        int len = taskByDeadlines.get(key).size();
                        if (len==1) {
                            taskByDeadlines.remove(key);
                            break;
                        }
                        else {
                            
                            taskByDeadlines.get(deadline).remove(task);
                            break;
                        }
                    }
                }

                for(Integer key:taskByPriority.keySet()) {
                    if (key.equals(priority)){
                        int len = taskByPriority.get(key).size();
                        if (len==1) {
                            taskByPriority.remove(key);
                            break;
                        }
                        else {
                            
                            taskByPriority.get(priority).remove(task);
                            break;
                        }
                    }
                }

                tasks.remove(task);
                System.out.println(title+" Completed ");
                System.out.println();
                flag=true;
                break;
            }
        }
        if (flag==false) {
            System.out.println("There is No Such Task !!!!");
        }
        
    }

}

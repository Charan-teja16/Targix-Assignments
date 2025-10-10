
import java.time.LocalDateTime;


public class Task {
    private String title;
    private String category;
    private int priority;
    private LocalDateTime deadline;

    Task ( String title , String category , int priority , LocalDateTime deadline) {
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.deadline = deadline;
    }

    public void setTitle (String title) {
        this.title = title;
    }

    public void setCategory (String category) {
        this.category = category;
    }

    public void setPriority (int priority) {
        this.priority = priority;
    }

    public void setDeadline (LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public String getTitle () {
        return this.title;
    }

    public String getCategory () {
        return this.category;
    }

    public int getPriority () {
        return this.priority;
    }

    public LocalDateTime getDeadline () {
        return this.deadline;
    }

}

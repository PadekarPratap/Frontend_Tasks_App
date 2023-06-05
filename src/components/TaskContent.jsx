import TaskItem from "./TaskItem";
import { BsCheck2Circle } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";

const TaskContent = ({ taskList }) => {
  const priorityTasks = [...taskList].filter(
    (task) => task.isPriority && !task.isCompleted
  );
  const tasks = [...taskList].filter(
    (task) => !task.isPriority && !task.isCompleted
  );

  const completedTasks = [...taskList].filter((task) => task.isCompleted);

  return (
    <div>
      {taskList.length === 0 && <p className="text-center tracking-widest text-xl ">No Tasks Found. Click on Add Task to add a new task.</p>}
      <div>
        {priorityTasks.length > 0 && (
          <div className="flex items-center gap-3">
            <AiFillExclamationCircle size={30} className="text-yellow-500" />
            <h1 className="text-yellow-500 font-poppins text-2xl uppercase tracking-widest font-semibold">
              Priority Tasks
            </h1>
          </div>
        )}
        {priorityTasks.length > 0 &&
          priorityTasks.map((task) => {
            return <TaskItem key={task._id} task={task} />;
          })}
      </div>
      <div>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
      <div>
        {completedTasks.length > 0 && (
          <div className="flex items-center gap-3 mt-5">
            <BsCheck2Circle size={30} className="text-green-700" />
            <h2 className="text-green-700 font-poppins text-2xl uppercase tracking-widest font-semibold">
              Completed Tasks
            </h2>
          </div>
        )}
        {completedTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};
export default TaskContent;

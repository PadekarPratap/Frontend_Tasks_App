import { RiDeleteBin2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiFillExclamationCircle } from "react-icons/ai";
import axios from "axios";
import { server } from "../constants/constants";
import { useDispatch } from "react-redux";
import { refreshList, updateModalState, updateTaskId } from "../redux/slices/taskSlice";
import { toast } from "react-toastify";

const TaskItem = ({ task }) => {
  const { title, description, isPriority, isCompleted } = task;
  const dispatch = useDispatch();

  const onTaskDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(refreshList());
    } catch (err) {
      console.log(err);
    }
  };

  const updateHandler = (id) =>{
    dispatch(updateTaskId(id))
    dispatch(updateModalState())
  }

  return (
    <div className={`flex items-center justify-between mt-5 ${isCompleted && 'opacity-50'}`}>
      <div>
        <p className={`text-lg font-bold ${isCompleted && 'line-through'}`}>{title}</p>
        <p className="text-sm ">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        {isPriority && (
          <abbr title="Priority task">
            <AiFillExclamationCircle className="text-yellow-500" size={25} />
          </abbr>
        )}
        <abbr title="Edit task">
          <button onClick={() => updateHandler(task._id)}>
            <FiEdit size={25} className="text-gray-600" />
          </button>
        </abbr>
        <abbr title="Delete task">
          <button onClick={() => onTaskDelete(task._id)}>
            <RiDeleteBin2Fill size={25} className="text-red-600" />
          </button>
        </abbr>
      </div>
    </div>
  );
};
export default TaskItem;

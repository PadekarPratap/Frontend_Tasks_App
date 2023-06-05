import { useForm } from "react-hook-form";
import { Oval } from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { refreshList, updateModalState } from "../redux/slices/taskSlice";
import axios from "axios";
import { server } from "../constants/constants";
import { toast } from "react-toastify";

const UpdateModal = () => {
  const form = useForm({
    defaultValues: async () => {
      const { data } = await axios.get(`${server}/tasks/singletask/${taskId}`, {
        withCredentials: true,
      });
      const { title, description, isPriority, isCompleted } = data.task;
      return {
        title,
        description,
        isPriority,
        isCompleted,
      };
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await axios.put(
        `${server}/tasks/update/${taskId}`,
        { ...values },
        { withCredentials: true }
      );

      dispatch(refreshList())
      toast.success("The task has been updated!")
      dispatch(updateModalState())
    } catch (err) {
        console.log(err)
    }

  };

  const { taskId } = useSelector((state) => state.task);

  return (
    <div className="fixed inset-0 bg-black/50">
      <div
        id="modal-container"
        className="max-w-[500px] w-full p-5 rounded bg-white relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      >
        <button
          onClick={() => dispatch(updateModalState())}
          className="absolute top-[8px] right-[8px]"
        >
          <ImCross color="red" size={20} />
        </button>
        {/* heading  */}
        <div>
          <h1 className="text-2xl font-bold uppercase text-center">
            Update task
          </h1>
        </div>
        {/* form  */}
        <div>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5">
              <input
                type="text"
                className="w-full rounded-md"
                placeholder="Update task..."
                {...register("title", {
                  required: {
                    value: true,
                    message: "Task field cannot be empty",
                  },
                })}
              />
              {errors.title?.message && (
                <p className="error">{errors.title.message}</p>
              )}
            </div>
            <div>
              <textarea
                className="w-full resize-none rounded-md"
                rows="2"
                placeholder="Update task description..."
                {...register("description")}
              ></textarea>
            </div>
            <div className="my-4">
              <input
                type="checkbox"
                className="rounded focus:ring-0 mr-3"
                id="check"
                {...register("isPriority")}
              />
              <label htmlFor="check">Set task as Priority Task</label>
            </div>
            <div className="my-4">
              <input
                type="checkbox"
                className="rounded focus:ring-0 mr-3"
                id="comp"
                {...register("isCompleted")}
              />
              <label htmlFor="comp">Completed Task</label>
            </div>
            <div className="flex justify-center mt-7">
              <button disabled={isSubmitting} className="px-5 py-2 bg-indigo-500 text-white rounded-md flex items-center gap-2 disabled:bg-indigo-400">
                Update Task {isSubmitting && <Oval height={"1.5rem"} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

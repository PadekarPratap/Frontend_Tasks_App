import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../redux/slices/userSlice";
import { Oval } from "react-loading-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TaskContent from "../components/TaskContent";
import { refreshList } from "../redux/slices/taskSlice";
import { Navigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [taskList, setTaskList] = useState([]);

  const { isAuthenticated } = useSelector((state) => state.user);

  const { refreshTaskList } = useSelector((state) => state.task);

  const form = useForm();
  const { register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    getTasks();
  }, [refreshTaskList]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(`${server}/users/profile`, {
        withCredentials: true,
      });
      console.log(data);
      dispatch(setIsAuthenticated(true));
      setLoading(false);
    } catch (err) {
      console.log(err);
      dispatch(setIsAuthenticated(false));
      setLoading(false);
    }
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${server}/tasks/all`, {
        withCredentials: true,
      });
      setTaskList(data.tasks);
      console.log(data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const onTaskSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await axios.post(
        `${server}/tasks/new`,
        { ...values },
        { withCredentials: true }
      );
      //console.log(data)
      toast.success(data.message);
      dispatch(refreshList());
    } catch (err) {
      //console.log(err)
      toast.error(err.response.data.message);
    }
  };

  if (loading) {
    return (
      <>
        <div className="bg-gray-200 fixed inset-0"></div>
        <div className="fixed z-[50] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-4xl uppercase font-poppins">
          Tasks App
          <Oval className="mx-auto mt-5" stroke="#06bcee" />
          <div className="text-center text-[#06bcee] text-lg mt-4 capitalize">
          Loading...
          </div>
        </div>
      </>
    );
  }
  
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-indigo-50">
      <div className="task-container pt-8">
        {/* taskbar */}
        <div className="max-w-[800px] mx-auto p-5 bg-white rounded">
          <form noValidate onSubmit={handleSubmit(onTaskSubmit)}>
            <div>
              <input
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Enter a task to add it to the Task List.",
                  },
                })}
                placeholder="Enter task name..."
                className="rounded w-full"
              />
              {errors.title?.message && (
                <p className="error">{errors.title.message}</p>
              )}
            </div>
            <div className="mt-4">
              <textarea
                rows="2"
                {...register("description")}
                className="w-full resize-none rounded"
                placeholder="Enter task description..."
              ></textarea>
            </div>
            <div className="mt-3">
              <input
                {...register("isPriority")}
                type="checkbox"
                id="priority"
                className="rounded focus:ring-0 mr-3"
              />
              <label htmlFor="priority" className="cursor-pointer">
                Set task as Priority Task
              </label>
            </div>
            <div className="mt-3 flex justify-center">
              <button className="px-5 py-2 bg-indigo-500 text-white rounded-md flex gap-2 items-center">
                Add Task {isSubmitting && <Oval height={"1.5rem"} />}
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-[800px] mx-auto p-5 bg-white mt-4 rounded-md">
          <TaskContent taskList={taskList} />
        </div>
      </div>
    </div>
  );
};
export default Home;

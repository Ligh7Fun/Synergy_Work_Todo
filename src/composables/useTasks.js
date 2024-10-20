import { ref, computed } from "vue";

const tasks = ref([]);

export function useTasks() {
  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.completed),
  );
  const incompleteTasks = computed(() =>
    tasks.value.filter((task) => !task.completed),
  );

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://671531dd33bc2bfe40b9b5fc.mockapi.io/api/v1/tasks",
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      tasks.value = data.map((task) => ({
        ...task,
        isUpdating: false,
        isDeleting: false,
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch(
        "https://671531dd33bc2bfe40b9b5fc.mockapi.io/api/v1/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      tasks.value.unshift(data);
      return data;
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(
        `https://671531dd33bc2bfe40b9b5fc.mockapi.io/api/v1/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const index = tasks.value.findIndex((t) => t.id === data.id);
      if (index !== -1) {
        tasks.value[index] = { ...data, isUpdating: false, isDeleting: false };
      }
      return data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://671531dd33bc2bfe40b9b5fc.mockapi.io/api/v1/tasks/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      tasks.value = tasks.value.filter((task) => task.id !== id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateCounts = () => {
    return {
      total: tasks.value.length,
      completed: completedTasks.value.length,
      incomplete: incompleteTasks.value.length,
    };
  };

  return {
    tasks,
    completedTasks,
    incompleteTasks,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    updateCounts,
  };
}

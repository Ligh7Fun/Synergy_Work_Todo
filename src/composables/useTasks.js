import { ref, computed } from "vue";

const tasks = ref([]);

// Экспортируем функцию useTasks
export function useTasks() {
  // Вычисляемое свойство для фильтрации выполненных задач
  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.completed),
  );

  // Вычисляемое свойство для фильтрации невыполненных задач
  const incompleteTasks = computed(() =>
    tasks.value.filter((task) => !task.completed),
  );

  // Асинхронная функция для загрузки задач с сервера
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://671531dd33bc2bfe40b9b5fc.mockapi.io/api/v1/tasks",
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Добавляем дополнительные свойства к каждой задаче
      tasks.value = data.map((task) => ({
        ...task,
        isUpdating: false,
        isDeleting: false,
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Асинхронная функция для добавления новой задачи
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
      // Добавляем новую задачу в конец массива
      tasks.value.push(data);
      return data;
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Асинхронная функция для обновления существующей задачи
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
      // Обновляем задачу в локальном массиве
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

  // Асинхронная функция для удаления задачи
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
      // Удаляем задачу из локального массива
      tasks.value = tasks.value.filter((task) => task.id !== id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Функция для подсчета количества задач
  const updateCounts = () => {
    return {
      total: tasks.value.length,
      completed: completedTasks.value.length,
      incomplete: incompleteTasks.value.length,
    };
  };

  // Возвращаем объект с функциями и данными для использования в компонентах
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

<template>
  <div class="text-white">
    <TaskList
      :tasks="tasks"
      @toggle-show="toggleShow"
      @toggle-complete="toggleComplete"
      @open-edit-modal="openEditModal"
      @delete-task="deleteTask"
    />
    <TaskModal
      v-if="editingTask"
      :task="editingTask"
      @save="saveTask"
      @close="closeEditModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TaskList from "../components/TaskList.vue";
import TaskModal from "../components/TaskModal.vue";
import { useTasks } from "../composables/useTasks";

// Извлекаем необходимые функции и данные из useTasks
const {
  tasks,
  fetchTasks,
  updateTask,
  deleteTask: removeTask,
  updateCounts,
} = useTasks();

// Реактивная переменная для хранения редактируемой задачи
const editingTask = ref(null);

// Определяем emit для обновления счетчиков в родительском компоненте
const emit = defineEmits(["update-counts"]);

// Функция для переключения видимости детальной информации задачи
const toggleShow = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    task.isShow = !task.isShow;
  }
};

// Асинхронная функция для переключения статуса выполнения задачи
const toggleComplete = async (task) => {
  task.isUpdating = true;
  try {
    await updateTask({ ...task, completed: !task.completed });
    emitUpdateCounts();
  } finally {
    task.isUpdating = false;
  }
};

// Асинхронная функция для удаления задачи
const deleteTask = async (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    task.isDeleting = true;
    try {
      await removeTask(id);
      emitUpdateCounts();
    } finally {
      task.isDeleting = false;
    }
  }
};

// Функция для открытия модального окна редактирования задачи
const openEditModal = (task) => {
  editingTask.value = { ...task };
};

// Функция для закрытия модального окна редактирования задачи
const closeEditModal = () => {
  editingTask.value = null;
};

// Асинхронная функция для сохранения отредактированной задачи
const saveTask = async (updatedTask) => {
  updatedTask.isUpdating = true;
  try {
    await updateTask(updatedTask);
    closeEditModal();
    emitUpdateCounts();
  } finally {
    updatedTask.isUpdating = false;
  }
};

// Функция для отправки обновленных счетчиков в родительский компонент
const emitUpdateCounts = () => {
  const counts = updateCounts();
  emit("update-counts", counts);
};

// Хук жизненного цикла, выполняющийся при монтировании компонента
onMounted(async () => {
  // Загружаем задачи и обновляем счетчики при инициализации компонента
  await fetchTasks();
  emitUpdateCounts();
});
</script>

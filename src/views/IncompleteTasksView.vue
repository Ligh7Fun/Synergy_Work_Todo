<template>
  <div class="mt-16 text-white">
    <TaskList
      :tasks="incompleteTasks"
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
      :isAdding="false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import TaskList from "../components/TaskList.vue";
import TaskModal from "../components/TaskModal.vue";
import { useTasks } from "../composables/useTasks";

// Извлечение необходимых функций и данных из useTasks
const {
  tasks,
  incompleteTasks,
  fetchTasks,
  updateTask,
  deleteTask: removeTask,
  updateCounts,
} = useTasks();

// Реактивная переменная для хранения редактируемой задачи
const editingTask = ref(null);

// Определение emit для обновления счетчиков в родительском компоненте
const emit = defineEmits(["update-counts"]);

// Функция для переключения видимости детальной информации невыполненной задачи
const toggleShow = (id) => {
  const task = incompleteTasks.value.find((t) => t.id === id);
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
  await updateTask(updatedTask);
  closeEditModal();
  emitUpdateCounts();
};

// Функция для отправки обновленных счетчиков в родительский компонент
const emitUpdateCounts = () => {
  const counts = updateCounts();
  emit("update-counts", counts);
};

// Хук жизненного цикла, выполняющийся при монтировании компонента
onMounted(async () => {
  // Загрузка задач и обновление счетчиков при инициализации компонента
  await fetchTasks();
  emitUpdateCounts();
});

// Наблюдатель за изменениями в списке задач
// При любых изменениях в задачах (глубокое отслеживание) обновляем счетчики
watch(tasks, emitUpdateCounts, { deep: true });
</script>

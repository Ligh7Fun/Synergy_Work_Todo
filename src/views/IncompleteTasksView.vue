<template>
  <div class="mt-16 text-white">
    <TaskList
      :tasks="incompleteTasks"
      @toggle-show="toggleShow"
      @toggle-complete="toggleComplete"
      @open-edit-modal="openEditModal"
      @delete-task="deleteTask"
    />
    <EditTaskModal
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
import EditTaskModal from "../components/TaskModal.vue";
import { useTasks } from "../composables/useTasks";

const {
  tasks,
  incompleteTasks,
  fetchTasks,
  updateTask,
  deleteTask: removeTask,
  updateCounts,
} = useTasks();
const editingTask = ref(null);
const emit = defineEmits(["update-counts"]);

const toggleShow = (id) => {
  const task = incompleteTasks.value.find((t) => t.id === id);
  if (task) {
    task.isShow = !task.isShow;
  }
};

const toggleComplete = async (task) => {
  task.isUpdating = true;
  try {
    await updateTask({ ...task, completed: !task.completed });
    emitUpdateCounts();
  } finally {
    task.isUpdating = false;
  }
};

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

const openEditModal = (task) => {
  editingTask.value = { ...task };
};

const closeEditModal = () => {
  editingTask.value = null;
};

const saveTask = async (updatedTask) => {
  await updateTask(updatedTask);
  closeEditModal();
  emitUpdateCounts();
};

const emitUpdateCounts = () => {
  const counts = updateCounts();
  emit("update-counts", counts);
};

onMounted(async () => {
  await fetchTasks();
  emitUpdateCounts();
});

watch(tasks, emitUpdateCounts, { deep: true });
</script>

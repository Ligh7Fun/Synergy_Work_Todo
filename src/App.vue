<template>
  <div class="relative min-h-screen bg-gray-800">
    <nav class="fixed top-0 z-50 w-full border-b border-gray-700 bg-gray-800">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start">
            <a href="#!" class="ms-2 flex md:me-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="me-3 h-8 text-white"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                class="self-center whitespace-nowrap text-xl font-semibold text-white sm:text-2xl"
                >Todo App</span
              >
            </a>
          </div>
          <div class="flex items-center">
            <button
              @click="openAddTaskModal"
              class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Добавить задачу
            </button>
          </div>
        </div>
      </div>
    </nav>

    <aside
      class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-700 bg-gray-800 pt-20 transition-transform sm:translate-x-0"
    >
      <div class="h-full overflow-y-auto bg-gray-800 px-3 pb-4">
        <ul class="space-y-2 font-medium">
          <li>
            <router-link
              to="/"
              class="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
              :class="{ 'bg-gray-700': $route.path === '/' }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5 text-gray-400 transition duration-75 group-hover:text-white"
              >
                <path
                  d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z"
                />
              </svg>
              <span class="ms-3 flex-1 whitespace-nowrap">Все задачи</span>
              <span
                class="ms-3 inline-flex h-3 w-auto items-center justify-center rounded-full bg-blue-900 p-3 text-sm font-medium text-blue-300"
                >{{ totalTasks }}</span
              >
            </router-link>
          </li>
          <li>
            <router-link
              to="/completed"
              class="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
              :class="{ 'bg-gray-700': $route.path === '/completed' }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5 text-gray-400 transition duration-75 group-hover:text-white"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ms-3 flex-1 whitespace-nowrap">Выполненные</span>
              <span
                class="ms-3 inline-flex h-3 w-auto items-center justify-center rounded-full bg-green-900 p-3 text-sm font-medium text-green-300"
                >{{ completedTasks }}</span
              >
            </router-link>
          </li>
          <li>
            <router-link
              to="/incomplete"
              class="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
              :class="{ 'bg-gray-700': $route.path === '/incomplete' }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5 text-gray-400 transition duration-75 group-hover:text-white"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15ZM9 12.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ms-3 flex-1 whitespace-nowrap">Не выполненные</span>
              <span
                class="ms-3 inline-flex h-3 w-auto items-center justify-center rounded-full bg-red-900 p-3 text-sm font-medium text-red-300"
                >{{ incompleteTasks }}</span
              >
            </router-link>
          </li>
        </ul>
      </div>
    </aside>

    <div class="p-4 sm:ml-64">
      <router-view @update-counts="updateCounts" />
    </div>
    <TaskModal
      v-if="isAddingTask"
      :task="newTask"
      @save="addTaskHandler"
      @close="closeAddTaskModal"
      :isAdding="true"
    />
    <div
      class="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-600 bg-gray-700 sm:hidden"
    >
      <div class="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
        <router-link
          to="/"
          class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800"
          :class="{ 'bg-gray-800': $route.path === '/' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-gray-400 transition duration-75 group-hover:text-white"
          >
            <path
              d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z"
            />
          </svg>
          <span class="text-sm text-gray-400 group-hover:text-blue-500"
            >Все&nbsp;задачи</span
          >
        </router-link>
        <router-link
          to="/completed"
          class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800"
          :class="{ 'bg-gray-800': $route.path === '/completed' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-gray-400 transition duration-75 group-hover:text-white"
          >
            <path
              fill-rule="evenodd"
              d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm text-gray-400 group-hover:text-blue-500"
            >Выполненные</span
          >
        </router-link>
        <router-link
          to="/incomplete"
          class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800"
          :class="{ 'bg-gray-800': $route.path === '/incomplete' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-gray-400 transition duration-75 group-hover:text-white"
          >
            <path
              fill-rule="evenodd"
              d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15ZM9 12.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm text-gray-400 group-hover:text-blue-500"
            >Не&nbsp;выполненные</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskModal from "./components/TaskModal.vue";
import { useTasks } from "./composables/useTasks";

// Получение функций из композабла useTasks
const { addTask, updateCounts: updateTaskCounts } = useTasks();

// Реактивные переменные для хранения количества задач
const totalTasks = ref(0);
const completedTasks = ref(0);
const incompleteTasks = ref(0);
const isAddingTask = ref(false);
const newTask = ref({ title: "", description: "", completed: false });

// Функция обновления счетчиков задач
const updateCounts = (counts) => {
  totalTasks.value = counts.total;
  completedTasks.value = counts.completed;
  incompleteTasks.value = counts.incomplete;
};

// Открытие модального окна для добавления задачи
const openAddTaskModal = () => {
  isAddingTask.value = true;
};

// Закрытие модального окна для добавления задачи
const closeAddTaskModal = () => {
  isAddingTask.value = false;
  newTask.value = { title: "", description: "", completed: false };
};

// Обработчик добавления новой задачи
const addTaskHandler = async (task) => {
  await addTask(task);
  closeAddTaskModal();
  const counts = updateTaskCounts();
  updateCounts(counts);
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-96 rounded-lg bg-gray-800 p-6">
      <h2 class="mb-4 text-xl text-white">
        {{ isAdding ? "Добавить задачу" : "Редактировать задачу" }}
      </h2>
      <input
        v-model="editedTask.title"
        class="mb-2 w-full rounded bg-gray-700 p-2 text-white"
        placeholder="Название задачи"
        required
      />
      <textarea
        v-model="editedTask.description"
        class="mb-4 w-full rounded bg-gray-700 p-2 text-white"
        placeholder="Описание задачи"
        required
      ></textarea>

      <div class="flex justify-end">
        <button
          @click="save"
          class="mr-2 rounded bg-blue-600 px-4 py-2 text-white"
          :class="{ 'opacity-50': !isValid, 'hover:bg-blue-700': isValid }"
          :disabled="!isValid"
        >
          {{ isAdding ? "Добавить" : "Сохранить" }}
        </button>
        <button
          @click="close"
          class="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Отменить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

// Определение входных свойств компонента
const props = defineProps({
  task: Object,
  isAdding: {
    type: Boolean,
    default: false,
  },
});

// События, которые компонент может отправлять родительскому компоненту
const emit = defineEmits(["save", "close"]);

// Создание реактивной копии задачи для редактирования
const editedTask = ref({ ...props.task });

// Вычисляемое свойство для проверки введенных данных
const isValid = computed(() => {
  return (
    editedTask.value.title.trim() !== "" &&
    editedTask.value.description.trim() !== ""
  );
});

// Наблюдатель за изменениями задачи
watch(
  () => props.task,
  (newTask) => {
    // Обновление локальной копии при изменении задачи
    editedTask.value = { ...newTask };
  },
);

// Функция сохранения задачи
const save = () => {
  if (isValid.value) {
    emit("save", editedTask.value);
  }
};

// Функция закрытия модального окна
const close = () => {
  emit("close");
};
</script>

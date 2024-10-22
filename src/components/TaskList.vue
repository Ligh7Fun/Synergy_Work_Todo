<template>
  <div class="mt-16">
    <div
      v-if="reversedTasks.length === 0"
      class="rounded-lg border-2 border-dashed border-red-900 p-4 text-center text-lg font-semibold text-white"
    >
      Нет задач или все задачи выполнены 🥳
    </div>
    <div
      v-else
      v-for="task in reversedTasks"
      :key="task.id"
      class="mb-4 cursor-pointer rounded-lg bg-gray-700 p-4 transition-transform duration-200 hover:scale-[1.01]"
      :class="{ 'border border-green-500': task.completed }"
      @click="$emit('toggle-show', task.id)"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3
            class="text-lg font-semibold"
            :class="{ 'line-through': task.completed }"
          >
            {{ task.title }}
          </h3>
          <p v-if="task.isShow" class="mt-2 text-gray-400">
            {{ task.description }}
          </p>
        </div>
        <div @click.stop class="flex space-x-2">
          <button
            @click="$emit('toggle-complete', task)"
            :class="[
              'rounded p-2 transition-colors duration-200',
              task.completed
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-green-500 hover:bg-green-600',
              { 'cursor-not-allowed opacity-50': task.isUpdating },
            ]"
            :title="
              task.completed
                ? 'Отметить как невыполненное'
                : 'Отметить как выполненное'
            "
            :disabled="task.isUpdating"
          >
            <XMarkIcon v-if="task.completed" class="h-5 w-5 text-white" />
            <CheckIcon v-else class="h-5 w-5 text-white" />
          </button>
          <button
            @click="$emit('open-edit-modal', task)"
            class="rounded bg-yellow-500 p-2 transition-colors duration-200 hover:bg-yellow-600"
            title="Изменить задачу"
          >
            <PencilSquareIcon class="h-5 w-5 text-white" />
          </button>
          <button
            @click="$emit('delete-task', task.id)"
            :class="[
              'rounded bg-red-500 p-2 transition-colors duration-200 hover:bg-red-600',
              { 'cursor-not-allowed opacity-50': task.isDeleting },
            ]"
            title="Удалить задачу"
            :disabled="task.isDeleting"
          >
            <TrashIcon class="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import {
  CheckIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const reversedTasks = computed(() => [...props.tasks].reverse());

defineEmits([
  "toggle-show",
  "toggle-complete",
  "open-edit-modal",
  "delete-task",
]);
</script>

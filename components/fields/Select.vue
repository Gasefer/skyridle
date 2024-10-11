<script setup>
import { ref, watch } from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const emit = defineEmits(["update:modelValue", "search"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  border: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: true, // Увімкнено пошук
  },
  filterable: {
    type: Boolean,
    default: true, // Увімкнено фільтрацію
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  labelName: {
    type: String,
    default: "name",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [Array, Object],
    default() {
      return [];
    },
  },
  name: {
    type: String,
    default: "",
  },
});

// Локальна змінна для контролю стану завантаження
const isLoading = ref(true);
let q = ref("");
const select = ref(null);

// Функція для отримання мітки опції
function getOptionLabel(option) {
  if (typeof option === "object" && option.hasOwnProperty(props.labelName)) {
    return option[props.labelName].toLowerCase().includes(q.value.toLowerCase())
      ? option[props.labelName]
      : "";
  }
  return option;
}

// Функція обробки пошуку
function onSearch(search, loading) {
  q.value = search;
  loading(true);
  emit("search", search);
  loading(false);
}

// Використання watch для перевірки завантаження даних
watch(
  () => props.options,
  (newValue) => {
    if (Array.isArray(newValue) && newValue.length > 0) {
      isLoading.value = false; // Змінюємо стан на не завантажено
    }
  }
);
</script>

<template>
  <div :class="['select', customClass]">
    <div class="default-select__wrapper form-group">
      <!-- Відображення HTML лише після завантаження даних -->
      <template v-if="!isLoading">
        <v-select
          ref="select"
          :name="name"
          :model-value="modelValue"
          :searchable="searchable"
          :options="options"
          :placeholder="placeholder"
          :clearable="clearable"
          :append-to-body="appendToBody"
          :label="labelName"
          :filterable="filterable"
          :getOptionLabel="getOptionLabel"
          @update:model-value="emit('update:modelValue', $event)"
          @search="onSearch"
        >
          <template #option="option">
            <div class="option">
              <img
                :src="`/icon-character/${option.url}.webp`"
                :alt="option.url"
                width="70"
                height="70"
              />
              <span class="option__label">
                {{ option[props.labelName] }}
              </span>
            </div>
          </template>
        </v-select>
      </template>
      <template v-else>
        <div class="loader">Loading...</div>
        <!-- Відображаємо повідомлення про завантаження -->
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.option {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: inherit;
  img {
    border-radius: 8px;
    object-fit: cover;
  }
  &__label {
    font-size: 20px;
    background-color: inherit;
  }
}

.select {
  .vs__dropdown-option--highlight {
    background-color: #b9a074;
  }
}
.loader {
  text-align: center;
}
</style>

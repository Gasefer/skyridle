<script setup>
import { ref, watch, onMounted } from "vue";

const characters = ref([]); // Ініціалізуємо масив для персонажів
const input = ref("");
const tableCharacters = ref([]);

// Завантаження персонажів з файлу characters.json
const fetchCharacters = () => {
  fetch("/characters.json")
    .then((response) => response.json())
    .then((data) => {
      characters.value = data.characters; // Присвоюємо результат в characters.value
    });
};

// Викликаємо функцію для завантаження персонажів
fetchCharacters();

// Функція для переміщення персонажа за його ім'ям
const selectCharacter = (selectedName) => {
  // Знайти індекс вибраного персонажа в масиві characters
  const index = characters.value.findIndex(
    (character) => character.name === selectedName.name
  );

  if (index !== -1) {
    // Видаляємо персонажа за індексом з масиву characters
    const [selectedCharacter] = characters.value.splice(index, 1);

    // Додаємо видаленого персонажа до tableCharacters
    tableCharacters.value.push(selectedCharacter);

    // Очищуємо поле вибору
    input.value = "";
  }
};

const randomCharacter = ref("");
const selectRandomCharacter = () => {
  const randomIndex = Math.floor(Math.random() * characters.value.length);
  return characters.value[randomIndex];
};

onMounted(() => {
  // Перевіряємо, чи персонажі вже є, і якщо так — викликаємо функцію
  if (characters.value && characters.value.length > 0) {
    randomCharacter.value = selectRandomCharacter();
    console.log(randomCharacter.value);
  }
});

// Якщо персонажі зміняться після завантаження
watch(characters, (newVal) => {
  if (newVal && newVal.length > 0) {
    randomCharacter.value = selectRandomCharacter();
    console.log(randomCharacter.value);
  }
});
</script>

<template>
  <div class="main main__character">
    <div class="container">
      <div class="quote">
        <div class="quote-random">
          <h2>Which character has said this quote?</h2>
          <div class="quote-random__wrapper">
            <div class="quote-random__text">
              {{ randomCharacter.quote }}
            </div>
            <button v-if="countTrys >= 5" @click="isSoundBlock = true">
              Open tip
            </button>
          </div>
        </div>
        <FieldsSelect
          v-model="input"
          customClass="destination__select"
          :options="characters"
          placeholder="Enter character"
          clearable
          @update:model-value="selectCharacter"
        />
        <div class="quote-table"></div>
      </div>
    </div>
  </div>
</template>

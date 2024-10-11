<script setup>
import charactersApi from "~/characters.json";

const characters = ref([]); // Ініціалізуємо масив для персонажів
const input = ref("");
const tableCharacters = ref([]);

// Завантаження персонажів з файлу characters.json
// const fetchCharacters = () => {
//   fetch("/characters.json")
//     .then((response) => response.json())
//     .then((data) => {
//       characters.value = data.characters; // Присвоюємо результат в characters.value
//     });
// };

characters.value = json.parse(json.stringify(charactersApi));
log(characters.value);
console.log(characters.value);

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

const findMaybe = (searchedCard, targetCard) => {
  if (!searchedCard.length && !targetCard.length) {
    return "true";
  }

  const intersectionTarget = targetCard.filter((item) =>
    searchedCard.includes(item)
  );
  const intersectionSearch = searchedCard.filter((item) =>
    targetCard.includes(item)
  );

  if (intersectionTarget.length === 0 && intersectionSearch.length === 0) {
    return "false";
  }

  if (
    searchedCard.length === targetCard.length &&
    intersectionTarget.length === intersectionSearch.length &&
    intersectionTarget.length === targetCard.length
  ) {
    return "true";
  } else {
    return "maybe";
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
      <div class="character">
        <!-- Поле для вибору персонажа -->
        <FieldsSelect
          v-model="input"
          customClass="destination__select"
          :options="characters"
          placeholder="Enter character"
          clearable
          @update:model-value="selectCharacter"
        />
      </div>
      <!-- Виведення вибраних персонажів у таблиці -->
      <div v-if="tableCharacters.length" class="character__table">
        <div class="character__table-header">
          <div class="block block-header">Image</div>
          <div class="block block-header">Gender</div>
          <div class="block block-header">Race</div>
          <div class="block block-header">City</div>
          <div class="block block-header">Class</div>
          <div class="block block-header">Key Stats</div>
          <div class="block block-header">Skills</div>
          <div class="block block-header">Faction</div>
          <div class="block block-header">Services</div>
          <div class="block block-header">Follower</div>
          <div class="block block-header">Spouse</div>
        </div>
        <div class="character__table-body">
          <div
            class="character__table-row"
            v-for="character in tableCharacters"
            :key="character.id"
          >
            <div
              class="block block__image"
              :class="character.url === randomCharacter.url ? 'true' : 'false'"
            >
              <NuxtImg
                :src="`/icon-character/${character.url}.webp`"
                :alt="character.url"
                width="104"
                height="104"
              />
            </div>
            <div
              class="block"
              :class="
                character.gender === randomCharacter.gender ? 'true' : 'false'
              "
            >
              {{ character.gender }}
            </div>
            <div
              class="block"
              :class="
                character.race === randomCharacter.race ? 'true' : 'false'
              "
            >
              {{ character.race }}
            </div>
            <div
              class="block"
              :class="
                character.city === randomCharacter.city ? 'true' : 'false'
              "
            >
              <!-- <NuxtImg
                v-if="
                  character.city === 'Winterhold' ||
                  character.city === 'Solitude'
                "
                :src="`/icon-city/${character.city}.svg`"
                :alt="character.city"
                width="58"
                height="75"
              />
              <NuxtImg
                v-else
                :src="`/icon-city/${character.city}.svg`"
                :alt="character.city"
                width="80"
                height="80"
              /> -->
              {{ character.city.length ? character.city : "No city" }}
            </div>
            <div
              class="block"
              :class="findMaybe(character.class, randomCharacter.class)"
            >
              {{ character.class.join(", ") }}
            </div>

            <div
              class="block"
              :class="findMaybe(character.keyStats, randomCharacter.keyStats)"
            >
              {{ character.keyStats.join(", ") }}
            </div>
            <div
              class="block"
              :class="findMaybe(character.skills, randomCharacter.skills)"
            >
              {{
                character.skills.length
                  ? character.skills.join(", ")
                  : "No skills"
              }}
            </div>
            <div
              class="block"
              :class="findMaybe(character.faction, randomCharacter.faction)"
            >
              {{
                character.faction.length
                  ? character.faction.join(", ")
                  : "No faction"
              }}
            </div>
            <div
              class="block"
              :class="findMaybe(character.services, randomCharacter.services)"
            >
              {{
                character.services.length
                  ? character.services.join(", ")
                  : "No services"
              }}
            </div>
            <div
              class="block block__follower"
              :class="
                character.follower === randomCharacter.follower
                  ? 'true'
                  : 'false'
              "
            >
              {{ character.follower ? "Yes" : "No" }}
            </div>
            <div
              class="block block__spouse"
              :class="
                character.spouse === randomCharacter.spouse ? 'true' : 'false'
              "
            >
              {{ character.spouse ? "Yes" : "No" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import charactersApi from "~/characters.json";

const props = defineProps({
  isPlayingMusic: {
    type: Boolean,
    default: false,
  },
});

const characters = ref([]); // Ініціалізуємо масив для персонажів
const input = ref("");
const tableCharacters = ref([]);
let inputSearch = ref(true);

const selectRandomCharacter = () => {
  const randomIndex = Math.floor(Math.random() * characters.value.length);
  return characters.value[randomIndex];
};

const randomCharacter = ref("");
randomCharacter.value = selectRandomCharacter();
console.log(randomCharacter.value);

characters.value = JSON.parse(JSON.stringify(charactersApi.characters));

// Функція для переміщення персонажа за його ім'ям
const selectCharacter = (selectedName) => {
  // Знайти індекс вибраного персонажа в масиві characters
  const index = characters.value.findIndex(
    (character) => character.name === selectedName.name
  );

  if (index !== -1) {
    const [selectedCharacter] = characters.value.splice(index, 1); // Видаляємо персонажа за індексом з масиву characters

    selectedCharacter.appear = false; // початкове значення

    tableCharacters.value.push(selectedCharacter); // Додаємо видаленого персонажа до tableCharacters

    // Очищуємо поле вибору
    input.value = "";

    // Додаємо клас appear з затримкою
    setTimeout(() => {
      selectedCharacter.appear = true; // зміна значення
    }, 100);

    if (selectedCharacter === randomCharacter.value) {
      setTimeout(() => {
        inputSearch.value = false;
      }, 2600);
    }
  }
};

const reloadPage = () => {
  window.location.reload();
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

const playSound = (path) => {
  if (props.isPlayingMusic) {
    const audio = new Audio(path);
    audio.play();
  }
};

onMounted(() => {
  // Перевіряємо, чи персонажі вже є, і якщо так — викликаємо функцію
  if (characters.value && characters.value.length > 0) {
    randomCharacter.value = selectRandomCharacter();
    console.log(randomCharacter.value);
  }
});

watch(inputSearch, (newValue) => {
  if (newValue === false) {
    playSound("/sound-game/skyrimLevelUp.mp3");
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
          v-if="inputSearch"
          v-model="input"
          customClass="destination__select"
          :options="characters"
          placeholder="Enter character"
          clearable
          @update:model-value="selectCharacter"
        />
        <div v-else class="winner-container">
          <button class="button" @click="reloadPage">Play again</button>
        </div>
      </div>
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
        <!-- Виведення вибраних персонажів у таблиці -->
        <TransitionGroup name="fade" tag="div" class="character__table-body">
          <div
            class="character__table-row"
            :class="{ appear: character.appear }"
            v-for="character in tableCharacters"
            :key="character.id"
            @before-enter="beforeEnter"
            @enter="enter"
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
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

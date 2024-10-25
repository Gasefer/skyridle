<script setup>
const music = ref(null); // Об'єкт для фонової музики
const isPlayingMusic = ref(false); // Музика не грає за замовчуванням

// Функція для запуску або зупинки фонової музики
const toggleMusic = () => {
  if (!music.value) {
    music.value = new Audio("/sound-game/skyrimMusic.mp3"); // Вказуємо шлях до музики
    music.value.loop = true; // Зациклюємо фонову музику
  }

  if (isPlayingMusic.value) {
    music.value.pause(); // Зупиняємо музику
    isPlayingMusic.value = false; // Вказуємо, що музика не грає
  } else {
    music.value.play(); // Відтворюємо музику
    isPlayingMusic.value = true; // Вказуємо, що музика грає
  }
};

// Функція для відтворення звукового ефекту і зупинки фонової музики
const playSound = (path) => {
  if (music.value) music.value.pause(); // Зупиняємо фонову музику, якщо вона грає
  const audio = new Audio(path);
  audio.play();

  // Відновлюємо фонову музику після завершення звукового ефекту
  audio.onended = () => {
    if (music.value) music.value.play();
  };
};

useHead({
  title: "Skyridle",
});
</script>

<template>
  <div>
    <Html lang="uk">
      <Body>
        <div class="wrapper">
          <BaseHeader>
            <template #button>
              <!-- Кнопка, яка перемикає відтворення/паузу музики -->
              <button @click="toggleMusic">
                <img
                  v-show="isPlayingMusic"
                  src="/icon-base/volume-on.svg"
                  alt="volume-on"
                  width="30"
                  height="30"
                />
                <img
                  v-show="!isPlayingMusic"
                  src="/icon-base/volume-off.svg"
                  alt="volume-off"
                  width="30"
                  height="30"
                />
              </button>
            </template>
          </BaseHeader>
          <NuxtPage :isPlayingMusic="isPlayingMusic" />
          <BaseFooter />
        </div>
      </Body>
    </Html>
  </div>
</template>

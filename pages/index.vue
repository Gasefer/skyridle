<template>
  <div class="main">
    <div class="container">
      <div class="main__wrapper">
        <div class="main__header">
          <h1>
            Guess
            <NuxtLink to="https://www.skyrim.com/" class="main__link-skyrim"
              >SKYRIM</NuxtLink
            >
            character
          </h1>
        </div>
        <div class="container-btn">
          <NuxtLink class="main__link" to="/character"
            >Guess character</NuxtLink
          >
          <NuxtLink class="main__link" to="/quote">Guess quote</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

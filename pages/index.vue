<template>
  <div class="main">
    <div class="container">
      <div class="main__wrapper">
        <div class="main__header">
          <h1>
            Guess
            <NuxtLink
              to="https://elderscrolls.fandom.com/wiki/The_Elder_Scrolls_V:_Skyrim"
              target="_blank"
              class="main__link-skyrim"
              >SKYRIM</NuxtLink
            >
            character
          </h1>
        </div>
        <div class="container-btn">
          <NuxtLink class="button" to="/character">Guess character</NuxtLink>
          <NuxtLink class="button" to="/quote">Guess quote</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

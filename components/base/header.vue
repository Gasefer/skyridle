<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <NuxtLink to="/" class="logo">
          <img src="/img/logo.svg" alt="logo" width="60" height="60" />
          <span class="logo__text"> SKYRIDLE </span>
          <img src="/img/logo.svg" alt="logo" width="60" height="60" />
        </NuxtLink>
        <div class="header-button">
          <slot name="button"></slot>
        </div>
      </div>
    </div>
  </header>
</template>

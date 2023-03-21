<template>
  <main id="main" class="flex flex-col text-white">
    <div class="flex-1">
      <slot class="w-full"/>
    </div>
    <Footer class="w-full"/>
    <div class="[ l-Section l-Section--stars ]"><div class="stars-small"></div><div class="stars-big"></div></div>
  </main>
</template>

<style>
html {
  scroll-behavior: smooth;
}

body {
  font-family: usd-300, Helvetica, sans-serif;
  line-height: 1.3;
}

#main {
  min-height: 100vh;
}

.font-usd-200 {
  font-family: usd-200, Helvetica, sans-serif;
  font-weight: 200;
}
</style>

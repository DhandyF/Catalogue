<template>
  <div>
    <nav-bar />
    <div class="container">
      <div class="content">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style scoped>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  width: 100%;
  margin: 60px 0 0 0;
  padding: 0 70px;
}

.content {
  width: 100%;
  margin: 0;
  padding: 20px;
  display: flex;
}
</style>

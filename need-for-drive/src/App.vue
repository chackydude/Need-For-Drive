<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "Roboto";
  src: url("../public/fonts/roboto/Roboto-Bold.ttf");
  font-weight: bold;
}

@font-face {
  font-family: "Roboto";
  src: url("../public/fonts/roboto/Roboto-Medium.ttf");
  font-weight: normal;
}

@font-face {
  font-family: "Roboto";
  src: url("../public/fonts/roboto/Roboto-Light.ttf");
  font-weight: 300;
}

@font-face {
  font-family: "Helvetica";
  src: url("../public/fonts/helvetica/HelveticaBold.ttf");
  font-weight: bold;
}

@font-face {
  font-family: "Helvetica";
  src: url("../public/fonts/helvetica/HelveticaRegular.ttf");
  font-weight: normal;
}

@font-face {
  font-family: "Helvetica";
  src: url("../public/fonts/helvetica/HelveticaLight.ttf");
  font-weight: 300;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  outline: none;
}
</style>

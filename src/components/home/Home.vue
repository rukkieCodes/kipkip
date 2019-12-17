<template>
  <v-container fluid class="ma-0 pa-0 home">
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <header class="v-header container">
          <div class="fullscreen-video-wrap">
            <video src="../../assets/vid1.mp4" autoplay loop muted></video>
          </div>

          <div class="header-overlay"></div>

          <v-container>
            <v-layout justify-center>
              <div class="header-content">
                <h1 class="my-2 display-2 font-weight-light">KipKip</h1>
                <p class="body-1 my-2">
                  The more your know yourself, the more you understand life,
                  <br />
                  the more you value your time. Maxime Lagacé
                </p>
                <Form />
              </div>
            </v-layout>
          </v-container>
        </header>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Form from "./Form";
export default {
  components: {
    Form
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.home {
  line-height: 1.5;
  color: #333;
  overflow: hidden;

  .v-header {
    height: 100vh;
    display: flex;
    align-items: center;
    color: #fff;
  }

  .container {
    max-width: 960px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: auto;
    text-align: center;
  }

  .v-header {
    .fullscreen-video-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;

      video {
        min-width: 100%;
        min-height: 100%;
      }
    }

    .header-overlay {
      height: 100vh;
      width: 100vw;
      position: absolute;
      top: 0;
      left: 0;
      background: #225470;
      z-index: 1;
      opacity: 0.3;
    }

    .header-content {
      z-index: 2;
    }
  }
}
</style>

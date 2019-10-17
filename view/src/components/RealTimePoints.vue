<template>
  <section class="hello">
    <mu-flex class="flex-wrapper" justify-content="center">
      <h1>(主) {{ home }} vs (客) {{ away }}</h1>
    </mu-flex>
    <mu-flex class="flex-wrapper" justify-content="center">
      <h1>{{ homePoints }} vs {{ awayPoints }}</h1>
    </mu-flex>
  </section>
</template>

<script>
  import { db } from '@/modules/firebase-config';

  export default {
    name: 'RealTimePoints',
    data() {
      return {
        home: '',
        away: '',
        homePoints: 0,
        awayPoints: 0,
      };
    },
    mounted() {
      const vueModel = this;
      vueModel.listeningOnGameModified();
    },
    methods: {
      async listeningOnGameModified() {
        const vueModel = this;
        vueModel.cancelListening = db.collection('Game')
          .onSnapshot(
            async gameSnapshot => {
              let newestGameDoc;
              let newestGameChange = gameSnapshot.docChanges().last();
              if (!newestGameChange) {
                return;
              }
              if (newestGameChange.type === 'added' || newestGameChange.type === 'modified') {
                newestGameDoc = newestGameChange.doc;
                const newestGame = newestGameDoc.data();
                vueModel.home = newestGame.home;
                vueModel.away = newestGame.away;
                vueModel.homePoints = newestGame.homePoints;
                vueModel.awayPoints = newestGame.awayPoints;
              }
            }
          );
      },
    }
  };
</script>

<style scoped lang="less">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

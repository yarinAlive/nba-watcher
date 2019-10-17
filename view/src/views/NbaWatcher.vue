<template>
  <section>
    <mu-flex justify-content="center">
      <h1 class="margin-top main-title">NBA 即時資訊</h1>
    </mu-flex>

    <mu-flex class="margin-top" justify-content="center">
      <mu-form class="points-block" ref="game" :model="pointsInfo">
        <mu-form-item label="輸入主隊分數" prop="pointsInfo.home" :rules="pointsRules">
          <mu-text-field v-model="pointsInfo.home"
                         prop="account"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">確認修改</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-flex>

    <mu-flex class="margin-top" justify-content="center">
      <mu-circular-progress v-show="isLoading" :stroke-width="5" :size="50"></mu-circular-progress>
    </mu-flex>
    <RealTimePoints v-show="!isLoading"></RealTimePoints>
  </section>
</template>


<script>
  import RealTimePoints from '@/components/RealTimePoints';

  export default {
    name: 'NbaWatcher',
    components: {
      RealTimePoints
    },
    data() {
      return {
        isLoading: false,
        points: 0,
        pointsInfo: {
          home: 0,
          away: 0,
        },

        pointsRules: [
          {
            validate(points) {
              try {
                parseInt(points);
                return true;
              } catch (error) {
                return false;
              }
            },
            message: '請輸入數字'
          }
        ],
      };
    },
    methods: {
      async submit() {
        const vueModel = this;
        let validateResult = await vueModel.$refs.game.validate();
        if (validateResult === true) {
          vueModel.isLoading = true;
          try {
            const response = await vueModel.$axios({
              method: 'PATCH',
              url: 'https://jsqsdc1etd.execute-api.ap-southeast-1.amazonaws.com/prod/nba-game',
              data: {
                homePoints: vueModel.pointsInfo.home
              }
            });
            vueModel.isLoading = false;
          } catch (error) {
            console.log('error #####', error);
            vueModel.isLoading = false;
            throw error;
          }
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../static/less/global.less';

  .margin-top {
    margin-top: 20px;
  }

  .points-block {
    width: 350px
  }
</style>

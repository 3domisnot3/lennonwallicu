<template>
  <div id="app">
    <div class="header" style="background-color:#ffdd57;">

      <div class="header-inner">
        <router-link to="/" >
          <div @click="content = false">
            <div style="float:left;height:20px;width:20px;background-color:#ffdd57;"></div>
            <div style="float:left;padding-left:7px;font-size:18px;font-family:'Arapey',serif;color:black;">{{$t('__lennonwallicu')}}</div>
          </div>
        </router-link>


        <div v-if="$route.name == 'read2'" style="float:left;padding-left:6px;font-size:9px;padding-top:3px;color:#black;" class="sans-serif">{{$t('__reader')}}</div>
        <div v-if="$route.name == 'NewMessage'" style="float:left;padding-left:6px;font-size:9px;padding-top:3px;color:#black;" class="sans-serif">{{$t('__new')}}</div>
        <div v-if="$route.name == 'NewFile'" style="float:left;padding-left:6px;font-size:9px;padding-top:3px;color:#black;" class="sans-serif">{{$t('__newFile')}}</div>

        <!-- <div style="float:left;height:23px;width:23px;background-color:#ffdd57;"></div>
        <div style="float:left;padding-left:8px;padding-top:1px;font-size:19px;font-family:'Arapey'">{{$t('__lennonwallicu')}}</div> -->

        <div style="float:right;font-size:14px;" class="sans-serif">
          <router-link to="/new-message" class="m-2"><font-awesome-icon icon="sticky-note" size="lg" /></router-link>
          <router-link to="/new-file" class="m-2"><font-awesome-icon icon="file-upload" size="lg" /></router-link>
          <b-dropdown size="sm" dropleft variant="white">
          <template slot="button-content">
            <font-awesome-icon icon="globe" size="lg" />
          </template>
          <b-dropdown-item @click="switchLang('en')">English</b-dropdown-item>
          <b-dropdown-item @click="switchLang('zhtw')">䌓體中文(香港)</b-dropdown-item>
          <b-dropdown-item @click="switchLang('zhtw')">䌓體中文(台灣)</b-dropdown-item>
          <!--<b-dropdown-item @click="switchLang('zhtw')">简体中文</b-dropdown-item>-->
        </b-dropdown>
        </div>
      </div>
    </div>

    <router-view class="router-content"></router-view>

    <div class="reader-footer">
      <div class="width">
        <a href="https://github.com/3domisnot3/lennonwallicu" target="_blank" title="GitHub" class="sans-serif brand" style="margin-right:2px;">
          {{$t('__lennonwallicu')}} {{$t('__lennonwallversion')}}</a>
        <div style="float:right;" class="sans-serif">
          <router-link to="/" class="m-2">{{$t('__home')}}</router-link>
          <router-link to="/about" class="m-2">{{$t('__homeAbout')}}</router-link>
           <a href="https://github.com/3domisnot3/lennonwallicu" target="_blank" title="GitHub" class="sans-serif m-2">
          GitHub</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Header from './views/Header.vue';
export default {
  props: [''],
  components: {
    // Header
  },
  data: function() {
    return {
      content: false
    }
  },
  mounted () {
    
  },
  methods: {
    switchLang : function(newLang){
      this.$root.$i18n.locale = newLang;
      localStorage.setItem('locale', newLang);
    }
  }
}
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

body {
  margin: 0 0 50px;
  font-family: Arial, "文泉驛正黑", "WenQuanYi Zen Hei", "儷黑 Pro", "LiHei Pro", "微軟正黑體", "Microsoft JhengHei", "標楷體", DFKai-SB, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #181818;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  /* color: black; */
  /* color: #42b983; Vue style */
  /* color: #18b1ab; */
}

.reader-footer a {
  color: white !important;
}

.reader-footer a.brand {
  color: #FFDD57 !important;
}

.link {
  text-decoration: none;
  color: #4289b9;
  cursor: pointer;
}

.link:hover {
  /*border-bottom: 1px solid #4289b9;*/
}

.router-content {
  margin-left: 20px;
  margin-right: 20px;
}

h1 {
  font-size: 19px;
  font-weight: bold;
  text-align: center;
}

h2 {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 24px;
}

h3 {
  font-size: 17px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
}
</style>

<template>
  <div class="home">



    <div class="home-content">

      <div v-if="$route.name != 'about'">

        <div class="centered" v-if="!$parent.content">

          <span>
            <div style="width:100px;margin:0 auto;margin-top:-10px;">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px" viewBox="0 0  200 200" preserveAspectRatio="xMidYMid meet"><rect id="svgEditorBackground" x="0" y="0" width="200" height="200" style="fill: none; stroke: none;"/><rect x="0" y="0" style="fill:#FFDD57;stroke:none;stroke-width:0px;" id="e1_rectangle" width="200" height="200"/><text style="fill:black;font-family:Impact;font-size:50px;" x="65" y="58" id="e2_texte"><tspan x="98.375" style="text-anchor:middle;">Lennon</tspan><tspan x="98.375" dy="1.25em" style="text-anchor:middle;">Wall</tspan><tspan x="98.375" dy="1.25em" style="text-anchor:middle;">ICU</tspan></text></svg>
            </div>
            <div style="height: 10px;"></div>
            <h3>
              {{$t('__lennonwallslogan')}}
            </h3>

            <h4 style="margin-top:10px;margin-bottom:30px;">
              {{$t('__lennonwallslogan2')}}
            </h4>

            <h6 style="margin-top:10px;margin-bottom:30px;">
              <span v-html="$t('__lennonwallOnGoing')"></span>
            </h6>

            

            <div style="height:3px;"></div>
          </span>
            
        </div>

        <div class="content-block" style="margin-top:0px;">
        
          <reader-component @isContent="isContent"/>

        </div>

      </div>

      <div v-if="$route.name == 'about'">

      <div class="content-block" style="margin-top:0px;">
       <h2 style="text-align:left;margin-bottom:40px;">{{$t('__aboutUs')}}</h2>

        <span v-html="$t('__aboutUsText')"></span>
        <div style="max-width:600px;margin:0 auto;">
          <center>
            <button class="btncopy m-2" v-clipboard="$t('__ethAddress')"></button>
            <button class="btnqrcode m-2" @click="$modal.show('qr-code');"></button>
          </center>
          <modal name="qr-code" :height="350" :width="350" transition="scale">
            <qr-code :text="$t('__ethAddress')" :size="350"></qr-code>
          </modal>
        </div>
        <br>
        <br>
        <h2 style="text-align:left;margin-bottom:40px;">{{$t('__aboutHowItworks')}}</h2>

       <span v-html="$t('__aboutReadTitle')"></span>
        <ul>
          <li>
             <span v-html="$t('__aboutReadMethod1')"></span>
          </li>
          <li>
            <span v-html="$t('__aboutReadMethod2')"></span>
          </li>
        </ul>

        <br>
        <br>
        
        <span v-html="$t('__aboutNewMessageTitle')"></span>
        <ul>
          <li>
            <span v-html="$t('__newheadDisclaimer')"></span>
          </li>
          <li>
            <span v-html="$t('__newheadProcedure')"></span>
          </li>
        </ul>

       
      </div>


      </div>


    </div>
  </div>
</template>

<script>
// import MsgIpProtection from '../components/MsgIpProtection.vue';
// import FileInput from '../components/FileInput.vue';
import ReaderComponent from '../components/ReaderComponent.vue';

export default {
  name: 'home',
  data: function() {
    return {
      
    }
  },
  components: {
    // FileInput,
    ReaderComponent
    // MsgIpProtection
  },

  beforeMount () {
    // if (this.$route.name == 'msgIpProtection') {
    //   this.msgType = 'msgIpProtection';
    //   // this.messageInput = this.messageInputIp;
    // }
  },
  mounted () {
    // console.log('home');
    document.getElementById('splashScreen').style.display = 'none';
    window.scrollTo(0, 0);
  },
  rendered () {
    window.scrollTo(0, 0);
  },
  updated () {
    window.scrollTo(0, 0);
  },
  methods: {

    isContent: function(boo) {
      if(boo) { this.$parent.content = true; }
      else { this.$parent.content = false; }
    },

    toTop: function() {
      window.scrollTo(0, 0);
    },

    fileData: function(el) {
      this.fileName = el.fileName;
      this.fileSize = el.fileSize;
      this.fileHash = el.fileHash;
    },
    
  }
}
</script>

<style>
  h1 {
    margin-top:20px;
    margin-bottom:7px;
    font-size:20px;
  }

  h3 {
    margin-top:10px;
    font-size:15px;
    text-align: center;
    font-weight:normal;
  }

  .home {
    max-width: 1032px;
    height: 100%;
    margin: 0 auto;
    margin-top: 20px;
  }

  /* .header {
    position:fixed;
    width: 100%;
    height:60px;
    top:0px;
    left: 0px;
    padding-top: 20px;
    border-bottom: 1px solid rgb(221, 221, 221);
    background-color:white;
  } */

  .header {
    position:sticky;
    /* margin: 0 auto; */
    z-index: 10;
    width: 100%;
    height:60px;
    top:0px;
    left: 0px;
    padding-top: 20px;
    border-bottom: 1px solid rgb(221, 221, 221);
    background-color:white;
  }

  .header a {
    color: black !important;
  }

  .header-inner {
    max-width:1032px;
    margin:0 auto;
    padding:0 10px 0 10px;
  }

  @media only screen and (max-width: 600px) {
    .header-inner {
      padding:0 20px 0 20px;
    }
    .home {
      margin-top:0px;
    }
  }

  .home-content {
    max-width: 740px;
    margin: 0 auto;
    clear:both;
    padding-top: 80px;
    padding-bottom: 120px;
    text-align: left;
    font-size: 14px;
    padding-left:20px;
    padding-right:20px;
  }

  .content-block {
    margin-top: 80px;
  }

  .centered {
    text-align: center;
  }

  .border-top {
    border-top: 1px solid rgb(179, 179, 179);
    padding-top: 15px;
  }

  button {
    font-size: 15px;
    padding: 4px 17px 4px 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: rgb(134, 134, 134);
    border-color: rgb(170, 170, 170);
    color: white;
    cursor: pointer;
  }

  button:focus {
    outline:0;
  }

  .overflow-dots {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .message-input {
    width:100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height:220px;
    resize: vertical;
    border-color:1px solid rgb(145, 145, 145);
    padding: 4px;
  }

  .feedback {
    margin-top: 14px;
  }

  .notice {
    color: rgb(255, 94, 0);
  }

  .underlined {
    border-bottom: 2px solid rgb(255, 94, 0);
  }

  .underlined:hover {
    border-bottom: 2px solid rgb(255, 94, 0);
  }

  
</style>
<template>
  <div class="reader">

    <div class="read-content" style="margin-top:-20px;">

      <span class="pre-formatted serif" v-html="tempstr"></span>

      <div v-if="tempstr != 'Message is not available. Try a different tx hash.'">
        <div style="border-top:1px solid #cccccc;width:100%;margin-top: 80px;padding-top:10px;"></div>
          <div class="reader-tx-details sans-serif" style="line-height:18px;">
            {{$t('__readblockchaincharacteristic')}}<br><br>
            {{$t('__readmessagecreated')}} 
            <a v-bind:href="'https://ropsten.etherscan.io/tx/'+txHash" target="_blank"><span class="sans-serif" title="Link to Ropsten.Etherscan">{{ timestamp }}</span>
          </a>
          <br>    
          <div class="overflow-dots">
            {{$t('__readhashaddress')}}
            <a v-bind:href="'https://ropsten.etherscan.io/tx/'+txHash" target="_blank" title="Link to Ropsten Etherscan">{{ txHash }}</a>
          </div>
          <br>
          <button class="btncopy m-2" v-clipboard="txHash"></button>
        </div>
        <div style="font-size:12px;height:20px;" class="overflow-dots">
          <a v-bind:href="'/ropsten/tx/'+txHash" target="_blank" style="font-size:12px;">https://lennonwall.icu/ropsten/tx/{{txHash}}</a>
        </div>
        <div style="max-width:600px;margin:0 auto;">
        <center>
          <button class="btncopy m-2" v-clipboard="$t('__readRopstenLink',{txHashVal: txHash})"></button>
          <button class="btnqrcode m-2" @click="$modal.show('qr-code');"></button>
        </center>
        <modal name="qr-code" :height="360" :width="360" transition="scale">
          <qr-code :text="$t('__readRopstenLink',{txHashVal: txHash})" :size="350" style="margin-left:5px;margin-top:5px;"></qr-code>
        </modal>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['txHash'],
  components: {
    
  },
  data: function() {
    return {
      tempstr: 'Loading...',
      output: '',
      decoded: '',
      blockNumber: '',
      timestamp: 'Loading...',
    }
  },
  mounted () {
    document.getElementById('splashScreen').style.display = 'none';
    window.scrollTo(0, 0);
    let self = this;
    
    axios.get(ropstenApiEtherscan + '/api?module=proxy&action=eth_getTransactionByHash&txhash=' + this.txHash)
    .then(
      function (response) {
        // console.log(response);
        self.hex2utf8(response["data"]["result"]["input"]);
        self.blockNumber = response["data"]["result"]["blockNumber"];
        axios.get(ropstenApiEtherscan + '/api?module=proxy&action=eth_getBlockByNumber&tag='+self.blockNumber+'&boolean=true')
          .then (
            function (response) {
              // console.log(response);

              if (typeof response["data"]["error"] === 'undefined') {
                  let timestamp = response["data"]["result"]["timestamp"];
                  timestamp = parseInt(timestamp, 16);
                  self.convert(timestamp);
              }
              else {
                  self.timestamp = "Processing..."
              }
            }
          )
          .catch (
            function (error) {
              console.log (error);
            }
          );
      }
    )
    .catch (
      function (error) {
        // console.log (error);
        self.tempstr = "Message is not available. Try a different tx hash.";
      }
    );
  },
  methods: {
    hex2utf8: function(pStr) {
      try {
        this.tempstr = decodeURIComponent(pStr.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&')).substring(2);
        console.log(this.tempstr);
      }
      catch (err) {
        console.log(err);
        for (b = 0; b < pStr.length; b = b + 2) {
          this.tempstr = this.tempstr + String.fromCharCode(parseInt(pStr.substr(b, 2), 16));
        }
      }            
    },
    convert: function(unixtimestamp) {
      this.timestamp = new Date(new Date(unixtimestamp*1000)).toUTCString();
    }
  }
}
</script>

<style>
.reader {
  max-width: 1032px;
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
}

.read-content {
  max-width: 740px;
  margin: 0 auto;
  clear:both;
  padding-bottom: 120px;
  padding-top:140px;
  padding-left:20px;
  padding-right:20px;
}

@media only screen and (max-width: 600px) {
  .read-content {
    padding-top:100px;
    padding-bottom:80px;
  }
}

.serif {
  /*font-family: 'Arapey', serif;*/
  font-size: 19px;
}

.pre-formatted {
  white-space: pre-line;
  word-break: break-word;
}

.reader-tx-details {
  color: grey;
  font-size: 12px;
  clear: both;
}

.reader-footer {
  background-color: black;
  border-top: 1px solid rgb(179, 179, 179);
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  overflow: hidden;
  font-size: 14px;
  padding-top: 15px;
  
}

.footertext {
  color: #ffdd57;
}

.width {
  max-width: 1032px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
}

.social-icon {
  width: 20px;
  margin-right: 10px;
  margin-top: 10px;
}

.sans-serif {
  /*font-family: 'Noto', sans-serif;*/
}
</style>
<template>
  <div class="reader-input">

    <!-- <div style="font-size:18px;margin-top:-20px;margin-bottom:60px;">
      <b>Blockchain message reader</b>
    </div> -->

		<!-- <div style="font-size:14px;">
      Ethereum transaction hash:
    </div> -->
    
    <div style="max-width:600px;margin:0 auto;">
      <b-alert v-model="showEnterTxAlert" variant="danger" dismissible>
        {{$t('__readEnterTxAlert')}}
      </b-alert>
      <b-alert v-model="showMsgNotFoundAlert" variant="danger" dismissible>
        {{$t('__readmsgnotavailiable')}}
      </b-alert>
		  <input type="text" v-bind:placeholder="$t('__readsearchplaceholder')" v-model="txHash" style="width:100%;height:35px;padding:5px;padding-top:6px;margin-bottom:2px;font-size:15px;margin-top:5px;outline:0;" autofocus>
    </div>

    <div style="height:10px;"></div>
  	<b-button @click="read" class="m-2">{{$t('__readreadthemssage')}}</b-button>
    <b-button @click="read('lucky')" class="m-2">{{$t('__readlucky')}}</b-button>
    <div v-if="showLoading == true " class="center">
      <div style="height: 10px;"></div>
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-if="$parent.$parent.content" class="reader-msg serif" style="min-height:55px;">      
      <div style="position:absolute;top:11px;right:13px;cursor:pointer;font-size:20px;" @click="close()">✕</div>
      {{ message }}
        <div style="border-top:1px solid #cccccc;width:100%;margin-top:50px;padding-top:0px;"></div>
        <div class="reader-tx-details sans-serif" style="line-height:18px;margin-bottom:20px;margin-top:-7px;">
          {{$t('__readblockchaincharacteristic')}}<br>
          {{$t('__readmessagecreated')}}<a v-bind:href="'https://etherscan.io/tx/'+txHash" target="_blank"><span class="sans-serif" title="Link to Etherscan">{{ timestamp }}</span></a>
          {{$t('__readhashaddress')}}<a v-bind:href="'https://etherscan.io/tx/'+txHash" target="_blank" title="Link to Etherscan">{{ txHash }}</a>
          <br>
          <button class="btncopy m-2" v-clipboard="txHash"></button>
        </div>
    </div>

    <div v-if="$parent.$parent.content" style="margin-top:-20px;">
      <div style="font-size:12px;height:20px;" class="overflow-dots">
        <a v-bind:href="'/tx/'+txHash" target="_blank" style="font-size:12px;">https://lennonwall.icu/tx/{{txHash}}</a>
      </div>
      <div style="max-width:600px;margin:0 auto;">
        <center>
          <button class="btncopy m-2" v-clipboard="$t('__readLink',{txHashVal: txHash})"></button>
          <button class="btnqrcode m-2" @click="$modal.show('qr-code');"></button>
        </center>
        <modal name="qr-code" :height="350" :width="350" transition="scale">
          <qr-code :text="$t('__readLink',{txHashVal: txHash})" :size="350"></qr-code>
        </modal>
      </div>
      <br>
      <!-- <button>Link</button>&nbsp;&nbsp; -->
      <!-- <button @click="embed()">Embed</button> -->
      <!-- <br><br> -->
    </div>
    

  </div>
</template>

<script>


export default {
  name: 'ReaderComponent',
  data: function() {
    return {
      txHash: '',
      txHashArray: [
        //'0x52fcfb8b25daa9a6ea2c99a26cba4a4104ba21cb83fe670a3d296a317b98f097',
        //'0x35dbf0e5c933db547022fbb61ed06458e028d34e388d253ab14a2b686582dd6c',
        '0x2d6a7b0f6adeff38423d4c62cd8b6ccb708ddad85da5d3d06756ad4d8a04a6a2',
        '0x548f15260c1f67af26cff021d993f600256c75e34b619f6b86e8a724d20bb097',
        '0x5724a82946a8342b493d6dea3558423965d3fb81cca988f6e2232ebcab83b375',
        //'0x8006d703a45663cab96a85a4ef3e6ab94a1410d6e70119139eea807a63ecb79e',
        //'0xddfa3b28394d52d0e2c168c42d0f853179b3e482ee4bf507851c95da6d68d1c1',
        '0x77ed505f790493db0e47a0379e8455843bb5ecac9d03ba88602696e346d84828',
        //'0xeff50e090d8490266b9b122c75fb661b5967bc5789a51540875ca7d2554f7e01',
        //'0x3ce1ef698a5fe2e505014d5468f80b10e10a150929b9ea52ce79d466ba158b62',
        '0x6361ac23362b8761490addad58636f1f3d5748451fcc9b4f8182b9776809e710',
        //'0xc8a7249826e78349bbe63652d80747118f7927f10884cd2ccf0ae344a5b13a1f',
        '0xcc1f5ee8e08b38adee27f397565690fdd882f295492ded96fb6d9e6b81000a6a',
        '0xdad229813cdcb0b26d0dd824fcd820b1f4c4c9b1b37347f369496b9fc990ea54',
        '0xcd98780f0f4d21835f24781eabffdfad3369c7e10ad4cf97cd81e14283a8c48e',
        '0xca8836d2e9ac00053a4549b7f2dfa48c3c9eea60296b658e8bc95a3926ded010',
        //'0xd065be0f5777e4a16e2c9e2750bde15c27ab5a4ab866736f3cb6041b450f6ee6',
        '0xc7377190e9c0b40d3e5e7d434430ffeff5df3394dd4e6b56581802ee125185de',
        '0x98f619c174b21b28a5820f9be61cd4f86b51d7889b0eb38840028df34a6ac2c7',

      ],
      message: this.$t('__readloading'),
      showMsgNotFoundAlert: false,
      content: false,
      timestamp: '',
      showEnterTxAlert: false,
      showLoading: false,
    }
  },
  methods: {
    embed: function() {
      alert("This feature is coming soon. Please come back in a few days.")
    },
    close: function() {
      this.$parent.$parent.content = false;
      // this.$emit('isContent', false);
    },
    read: function(lucky) {
      this.showEnterTxAlert = false;
      this.showMsgNotFoundAlert = false;
      

      if (lucky == 'lucky') {
        this.txHash = this.txHashArray[Math.floor(Math.random()*this.txHashArray.length)];
      }

      if (this.txHash == '') {
        this.showEnterTxAlert = true;
        this.showLoading = false;
        return;
      }

      
      this.showLoading = true;
      let self = this;

      axios.get(etherscan + '/api?module=proxy&action=eth_getTransactionByHash&txhash=' + this.txHash)
      .then(
        function (response) {
          // console.log(response);
          if (typeof(response["data"]["result"]["input"]) == 'undefined') {
            self.message = "NO";
            self.showLoading = false;
            return;
          }
          self.hex2utf8(response["data"]["result"]["input"]);
          self.blockNumber = response["data"]["result"]["blockNumber"];
          axios.get(etherscan + '/api?module=proxy&action=eth_getBlockByNumber&tag='+self.blockNumber+'&boolean=true')
            .then (
              function (response) {
                console.log(response);

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
          self.showLoading = false;
          self.$parent.$parent.content = true;
        }
      )
      .catch (
        function (error) {
          console.log (error);
          self.showMsgNotFoundAlert = true;
          self.$parent.$parent.content = false;
          self.showLoading = false;
        }
      );
    },
    hex2utf8: function(pStr) {
      try {
        this.message = decodeURIComponent(pStr.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&')).substring(2);
        // console.log(this.tempstr);
      }
      catch (err) {
        for (b = 0; b < pStr.length; b = b + 2) {
          this.message = this.tempstr + String.fromCharCode(parseInt(pStr.substr(b, 2), 16));
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
  .reader-input {
    text-align: center;
  }

  .hover:hover {
    border-bottom: 1px solid black;
    cursor:pointer;
  }

  
  .reader-tx-details {
    color: grey;
    font-size: 12px;
    clear: both;
  }

  .btncopy{
    width: 39px;
            height: 34px;
            padding: 0;
            margin: 0;
            background-color: #eee;
            background-image: linear-gradient(#fcfcfc,#eee);
            border: 1px solid #d5d5d5;
            cursor: pointer;
            appearance: none;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            outline: 0;
            transition: opacity .3s ease;
            &:before;
                content: '';
                display: inline;
                width: 39px;
                height: 34px;
                background: url('/img/copy.svg') center center no-repeat;
                background-size: 14px;
                vertical-align: top;
  }

  .btnqrcode{
    width: 39px;
            height: 34px;
            padding: 0;
            margin: 0;
            background-color: #eee;
            background-image: linear-gradient(#fcfcfc,#eee);
            border: 1px solid #d5d5d5;
            cursor: pointer;
            appearance: none;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            outline: 0;
            transition: opacity .3s ease;
            &:before;
                content: '';
                display: inline;
                width: 39px;
                height: 34px;
                background: url('/img/qrcode.svg') center center no-repeat;
                background-size: 14px;
                vertical-align: top;
  }

  .reader-msg {
    border: 1px #ccc solid;
    padding: 30px;
    padding-top: 40px;
    padding-bottom: 20px;
    -webkit-rtl-ordering: logical;
    flex-direction: column;
    white-space: pre-line;
    word-wrap: break-word;
    text-align: left;
    margin-top: 40px;
    margin-bottom: 50px;
    position:relative;
  }

  @media only screen and (max-width: 600px) {
    .reader-msg {
      padding: 15px;
      padding-top: 40px;
      padding-bottom: 20px;
    }
  }

</style>

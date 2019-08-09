<template>
  <div class="reader" style="padding-left:20px;padding-right:20px;">
    
    <!-- New message -->
    <div style="max-width:620px;margin:0 auto;margin-top:100px;">
      <h1 style="font-size:14px;margin-bottom:30px;"><span v-html="$t('__newheadline')"></span></h1>

      <b-button v-b-toggle.collapse-1>{{$t('__newGuidelineButton')}}</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text"><span v-html="$t('__newheadDisclaimer')"></span></p>
          <p class="card-text"><span v-html="$t('__newheadProcedure')"></span></p>
        </b-card>
      </b-collapse>
      <br>
      <br>

      <textarea class="message-input" v-model="messageInput"></textarea>

      <div style="float:left;margin-top:5px;text-align:left;line-height:18px;font-size:13px;">
        <span >
          {{$t('__newMessageSize',{bytesCalcVal:bytesCalc})}}<br>
          {{$t('__newMaxTxFee',{txFeeCalcVal:txFeeCalc})}}
        </span>
      </div>
      <br>

      <div style="width:180px;float:right;">
        <b-button style="float:right;" @click="set()">{{$t('__newSetButton')}}</b-button>
        <div class="link" style="float:right;margin-right:20px;margin-top:13px;font-size:12px;" @click="content = true;">{{$t('__newPreviewButton')}}</div>
      </div>

    </div>

    <!-- Feedback -->
    <div v-if="feedback != ''" v-html="feedback" class="feedback" style="text-align:center;padding-top:100px;margin-bottom:-50px;">
    
      
    </div>
    <div v-if="showRemindAlert" style="text-align:center;padding-top:50px;margin-bottom:-10px;max-width:620px;margin:0 auto;">
      <b-alert variant="info" show>{{remindContent}}</b-alert>
    </div>
    <div v-if="showTxAlert" style="text-align:center;padding-top:50px;margin-bottom:-10px;max-width:620px;margin:0 auto;">
      <b-alert variant="success" show>
        {{$t('__newWeb3TranactionHash', {hashVal: txHash})}}
        <button class="btncopy m-2" v-clipboard="txHash"></button>
      </b-alert>
    </div>
    <div v-if="showTxAlert && !showConfirmationAlert" style="text-align:center;margin-bottom:-10px;max-width:620px;margin:0 auto;">
      <b-alert variant="info" show>
        {{$t('__newWeb3Processing')}}
      </b-alert>
    </div>
    <div v-if="showConfirmationAlert" style="text-align:center;margin-bottom:-10px;max-width:620px;margin:0 auto;">
      <b-alert variant="success" show>{{$t('__newWeb3Confirmation', {confirmVal: web3confirm, hashVal: txHash})}}</b-alert>
      <div v-html="txlink"></div>
      <div style="max-width:600px;margin:0 auto;">
        <center>
          <button class="btncopy m-2" v-clipboard="$t('__readLink',{txHashVal: txHash})"></button>
          <button class="btnqrcode m-2" @click="$modal.show('qr-code');"></button>
        </center>
        <modal name="qr-code" :height="350" :width="350" transition="scale">
          <qr-code :text="$t('__readLink',{txHashVal: txHash})" :size="350"></qr-code>
        </modal>
      </div>
    </div>
    <div v-if="showErrorAlert" style="text-align:center;padding-top:50px;margin-bottom:-10px;max-width:620px;margin:0 auto;">
      <b-alert variant="danger" show>{{$t('__newWeb3Error',{errorVal: web3error })}}</b-alert>
    </div>

    <!-- Preview -->
    <div v-if="content" class="reader-msg serif" style="min-height:55px;margin:0 auto;max-width:620px;margin-top:140px;margin-bottom:100px;box-shadow: #e9e9e9 0px 4px 8px 3px;">  
      <div style="position:absolute;top:3px;right:45px;font-size:13px;color:red;" class="sans-serif">
        {{$t('__newMessagePreview')}}
      </div>
      <div style="position:absolute;top:11px;right:13px;cursor:pointer;font-size:20px;" @click="content = false">✕</div>
      <span v-if="msgType == 'msgPlainText'">
        {{ messageInput }}
      </span>
      <span v-if="msgType == 'msgIpProtection'">
        {{ messageInputIp }}                
      </span>
      <div v-if="message != 'Message is not available. Try a different tx hash.'">
        <div style="border-top:1px solid #cccccc;width:100%;margin-top:50px;padding-top:0px;"></div>
        <div class="reader-tx-details sans-serif" style="line-height:18px;margin-bottom:20px;margin-top:-7px;">
          {{$t('__readblockchaincharacteristic')}}<br>
          {{$t('__readmessagecreated')}}{{$t('__newTimestamp')}}
          {{$t('__readhashaddress')}}{{$t('__newTxHash')}}
        </div>
      </div>
      <div v-else style="height:40px;"></div>
    </div>

    <div v-else style="clear:both;display:block;height:100px;"></div>
  </div>
</template>

<script>
import ReaderComponent from '../components/ReaderComponent.vue';
import Web3 from 'web3';

export default {
  components: {
    ReaderComponent
  },

  data: function() {
    return {
      tempstr: 'Loading...',
      output: '',
      decoded: '',
      blockNumber: '',
      timestamp: 'Loading...',
      message: '',
      messageInput: '',
      url: '',
      msgType: 'msgPlainText',
      fileName: 'Waiting for the file',
      fileSize: 0,
      fileHash: 'Waiting for the file',
      feedback: '',
      content: false,
      showTxAlert: false,
      showRemindAlert: false,
      remindContent: '',
      showConfirmationAlert: false,
      showErrorAlert: false,
      web3error: '',
      txlink: '',
      txHash: '',
    }
  },

  computed: {
    bytesCalc: function () {
      return encodeURI(this.messageInput).split(/%..|./).length - 1;
    },
    txFeeCalc: function () {
      return (((this.bytesCalc * 68) + 30000) * 3) / 1000000000;
    },
  },

  mounted () {
    document.getElementById('splashScreen').style.display = 'none';
    window.scrollTo(0, 0);
  },

  methods: {
    set: function () {           
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
          // Request account access if needed
          ethereum.enable();
        } catch (error) {
          // User denied account access...
          this.remindContent = this.$t('__newWeb3EnableAccess');
          this.showRemindAlert = true;
        }
      } else if (window.web3) {
        // Legacy dapp browsers...
        window.web3 = new Web3(web3.currentProvider);
      } else {
        // Non-dapp browsers...
        console.log(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        );
        this.remindContent = this.$t('__newWeb3InstallMetaMask');
        this.showRemindAlert = true;
      }

      let message = this.messageInput;
      message = this.rstr2utf8(message);
      message = this.str2hex(message);

      let address = web3.eth.accounts.create()["address"];
      this.remindContent = this.$t('__newWeb3ConfirmInMetamask');
      this.showRemindAlert = true;
      this.showConfirmationAlert = false;
      this.showErrorAlert = false;

      let self = this;

      web3.eth.sendTransaction({
        from: web3.currentProvider.publicConfigStore._state.selectedAddress,
        to: address,
        value: 0,
        gas: gasCount(message) + 30000,
        data: message,
        })
      .once('transactionHash', function(hash){
         self.showRemindAlert = false;
         self.showTxAlert = true;
         self.txHash = hash;
        })
      .on('confirmation', function(confNumber, receipt){
        self.showConfirmationAlert = true;
        self.web3confirm = confNumber + 1;
        self.txlink = '<a href="/tx/'+ self.txHash +'" style="font-size:12px;" target="_blank">https://lennonwall.icu/tx/' + self.txHash + '</a>';
      })
      .on('error', function(error){
        self.showErrorAlert = true;
        self.web3error = error;
      })
      .then(function(receipt){
          // will be fired once the receipt is mined
      });
    },

    rstr2utf8: function(input) {
      return unescape( encodeURIComponent( input ) );
    },

    str2hex: function(str) {
      let output = "";
      for (let i = 0; i < str.length; i++) {
        output += this.strlpad(str.charCodeAt(i).toString(16), "0", 2).toUpperCase();
      }
      return output;
    },

    strlpad: function(str, pad, len) {
      while (str.length < len) {
        str = pad + str;
      }
      return str;
    }
  }
}
</script>

<style>

.reader {
  max-width: 1032px;
  height: 100%;
  margin: 0 auto;
  margin-top: 20px;
}

.reader-content {
  max-width: 700px;
  margin: 0 auto;
  clear:both;
  padding-top: 70px;
  font-size: 19px;
  padding-bottom: 120px;
  padding-left: 20px;
  padding-right: 20px;
}

</style>
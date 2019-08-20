<template>
  <div class="reader" style="padding-left:20px;padding-right:20px;">
    
    <!-- New file -->
    <div style="max-width:620px;margin:0 auto;margin-top:100px;">
      <h1 style="font-size:14px;margin-bottom:30px;">{{$t('__newFileHeadline')}}</h1>

      <b-button v-b-toggle.collapse-1>{{$t('__newFileGuidelineButton')}}</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text"><span v-html="$t('__newFileHeadDisclaimer')"></span></p>
          <p class="card-text"><span v-html="$t('__newFileHeadProcedure')"></span></p>
        </b-card>
      </b-collapse>
      <br>
      <br>
      
      <b-form-file
      v-model="file"
      @change="captureFile"
      :state="Boolean(file)"
      v-bind:placeholder="$t('__newFileFilePlacerHolder')"
      v-bind:drop-placeholder="$t('__newFileFileDropPlaceFolder')"
      v-bind:browse-text="$t('__newFileFileBrowser')"
      >
      </b-form-file>
      <br>
      <div style="height: 10px;"></div>
      <div style="min-width:20px;text-align:center;">
        <b-button @click="handleOk">{{$t('__newFileUploadButton')}}</b-button>
      </div>
      <div v-if="showLoading == true " class="center" style="text-align:center;">
        <div style="height: 10px;"></div>
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div style="height: 10px;"></div>
    </div>
    
    <div v-if="showRemindAlert" style="text-align:center;padding-top:50px;margin-bottom:-10px;max-width:620px;margin:0 auto;">
      <b-alert variant="info" show>{{remindContent}}</b-alert>
    </div>
    <div v-if="showConfirmationAlert" style="text-align:center;margin-bottom:-10px;max-width:620px;margin:0 auto;">
      <b-alert variant="success" show>{{$t('__newFileConfirmation')}}<br></b-alert>
      <div v-html="txlink"></div>
      <div style="max-width:600px;margin:0 auto;">
        <center>
          <button class="btnhash m-2" v-clipboard="txHash"></button>
          <button class="btncopy m-2" v-clipboard="$t('__newFileLink',{txHashVal: txHash})"></button>
          <button class="btnqrcode m-2" @click="$modal.show('qr-code');"></button>
        </center>
        <modal name="qr-code" :height="360" :width="360" transition="scale">
          <qr-code :text="$t('__newFileLink',{txHashVal: txHash})" :size="350" style="margin-left:5px;margin-top:5px;"></qr-code>
        </modal>
      </div>
    </div>
    <div v-if="showErrorAlert" style="text-align:center;padding-top:50px;margin-bottom:-10px;max-width:620px;margin:0 auto;">
      <b-alert variant="danger" show>{{$t('__newFileError',{errorVal: fileerror })}}</b-alert>
    </div>

    <div v-else style="clear:both;display:block;height:100px;"></div>
  </div>
</template>

<script>
import ReaderComponent from '../components/ReaderComponent.vue';
import Web3 from 'web3';
//import IPFS from 'ipfs-http-client';

export default {
  components: {
    ReaderComponent
  },

  data: function() {
    return {
      buffer: '',
      feedback: '',
      content: false,
      showTxAlert: false,
      showRemindAlert: false,
      remindContent: '',
      showConfirmationAlert: false,
      showErrorAlert: false,
      txlink: '',
      showLoading: '',
      txHash: '',
      file: '',
      fileerror: '',
    }
  },

  mounted () {
    document.getElementById('splashScreen').style.display = 'none';
    window.scrollTo(0, 0);
  },

  methods: {
    captureFile(file) {
      const reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsArrayBuffer(file.target.files[0]);
        reader.onloadend = async () => {
          this.buffer = await this.convertToBuffer(reader.result);
          this.showErrorAlert = false;
        };
      } else this.buffer = '';
    },
    async convertToBuffer(reader) {
      return Buffer.from(reader);
    },
    upload() {
      const ipfs = window.IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
      this.showLoading = true;
      this.showRemindAlert = true;
      this.remindContent = this.$t('__newFileUploadingMayLong');
      let self = this;

      ipfs.add(this.buffer)
        .then((hashedImg) => {
          self.txHash = hashedImg[0].hash;
          self.showLoading = false;
          self.showRemindAlert = false;
          self.showConfirmationAlert = true;
          self.txlink = '<a href="' + this.$t('__newFileLink', {txHashVal:self.txHash}) + '" style="font-size:12px;" target="_blank">' + this.$t('__newFileLink', {txHashVal:self.txHash}) + '</a>';
        });
    },
    handleOk() {
      if (!this.buffer) {
        this.showErrorAlert = true;
        this.fileerror = this.$t('__newFileFillInInfo');
      } else {
        this.upload();
        this.showErrorAlert = false;
      }
    },
  }
}
</script>

<style>


</style>
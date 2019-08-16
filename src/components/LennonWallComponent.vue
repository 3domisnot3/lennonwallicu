<template>
  <!-- Main Body of the Application -->
  <div class="container reader-input">
    <b-button v-b-toggle.collapse-1>寫進連儂牆 v0.3 (Ropsten 測試網)(測試期資料不會帶至新版本)</b-button>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
	  	<center>
          	<div class="col-sm-6 col-sm-offset-3">
            <div class="panel-heading">
                <h3>寫進連儂牆</h3>
            </div>
			<div v-if="showRemindAlert" style="text-align:center;padding-top:5px;margin-bottom:-5px;max-width:620px;margin:0 auto;">
			<b-alert variant="info" show>{{remindContent}}</b-alert>
			</div>
			<div v-if="showErrorAlert" style="text-align:center;padding-top:5px;margin-bottom:-5px;max-width:620px;margin:0 auto;">
			<b-alert variant="danger" show>{{$t('__newWeb3Error',{errorVal: web3error })}}</b-alert>
			</div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <div class="form-group">
                <b-form-input 
					v-model="form.caption" 
					placeholder="標題"
					:state="captionState"
					aria-describedby="input-caption-help input-caption-feedback"
				></b-form-input>
				<b-form-invalid-feedback id="input-caption-feedback">
				標題不可長於20字
				</b-form-invalid-feedback>
				<b-form-text id="input-caption-help">標題</b-form-text>
              </div>
              <div class="form-group">
                <b-form-select 
					v-model="form.categorySelect" 
					:options="categoryOptions" 
					size="sm" 
					class="mt-3" 
					:state="categoryState"
					aria-describedby="input-category-help input-category-feedback"
					trim
				></b-form-select>
				<b-form-invalid-feedback id="input-category-feedback">
				必需選擇一個分類
				</b-form-invalid-feedback>
				<b-form-text id="input-category-help">分類</b-form-text>
              </div>
              <div class="form-group">       
                <b-form-input 
					v-model="form.imgIpfsHash" 
					placeholder="IPFS 圖片哈希 IPFS ImageHash" 
					size="sm" 
					:state="imgIpfsState" 
					aria-describedby="input-imgIpfs-help input-imgIpfs-feedback"
					trim
				></b-form-input>
				<b-form-invalid-feedback id="input-imgIpfs-feedback">
				必需符合IPFS哈希格式
				</b-form-invalid-feedback>
				<b-form-text id="input-imgIpfs-help">IPFS 圖片哈希 IPFS ImageHash</b-form-text>
              </div>
              <div class="form-group">
                <b-form-input 
					v-model="form.videoIpfsHash" 
					placeholder="IPFS 影片哈希 IPFS VideoHash" 
					size="sm"
					:state="videoIpfsState" 
					aria-describedby="input-videoIpfs-help input-videoIpfs-feedback"
					trim
				></b-form-input>
				<b-form-invalid-feedback id="input-videoIpfs-feedback">
				必需符合IPFS哈希格式
				</b-form-invalid-feedback>
				<b-form-text id="input-videoIpfs-help">IPFS 影片哈希 IPFS VideoHash</b-form-text>
              </div>
              <div class="form-group"> 
                <b-form-input 
					v-model="form.ethHash" 
					placeholder="以太坊文字哈希 Ethereum Text Hash" 
					size="sm"
					:state="ethHashState" 
					aria-describedby="input-ethHash-help input-ethHash-feedback"
					trim
				></b-form-input>
				<b-form-invalid-feedback id="input-ethHash-feedback">
				必需符合以太坊哈希格式
				</b-form-invalid-feedback>
				<b-form-text id="input-ethHash-help">以太坊文字哈希 Ethereum Text Hash</b-form-text>
              </div>
                <b-button type="submit" variant="warning" class="m-2">提交</b-button>
                <b-button type="reset" variant="outline-primary" class="m-2">重設</b-button>
				<!--<pre class="m-0">{{ form }}</pre>-->
            </b-form>
        	</div>
		</center>
      </b-card>
    </b-collapse>
    <div style="height: 10px;"></div>
	<b-container>
	<b-row>
    <b-col v-for="post in currentPosts" cols="12" md="4">
      <b-card 
        img-alt="Image"
        img-top
        title-tag="h6"
		v-if="!post.removed"
		v-bind:title="post.caption"
        v-bind:img-src="post.imageIpfsHash === '' ? '':'https://ipfs.io/ipfs/'+post.imageIpfsHash"
		style="fontSize: 12px"
      >
	  	<b-button pill variant="outline-secondary" size="sm">{{ categoryList[post.categoryId] }}</b-button>
	  	<div style="height: 10px;"></div>
	  	<span v-if="post.imageIpfsHash">
		  	<a v-bind:href="$t('__newFileLink',{txHashVal: post.imageIpfsHash})">
			<button class="btnimage btn-warning m-1" ></button>
			</a>
			<button class="btnhash m-1" v-clipboard="post.imageIpfsHash"></button>
			<button class="btncopy m-1" v-clipboard="$t('__newFileLink',{txHashVal: post.imageIpfsHash})"></button>
			<button class="btnqrcode m-1" @click="$modal.show('qr-code-image-'+post.id);"></button>
			<modal v-bind:name="'qr-code-image-'+post.id" :height="360" :width="360" transition="scale">
				<qr-code :text="$t('__newFileLink',{txHashVal: post.imageIpfsHash})" :size="350" style="margin-left:5px;margin-top:5px;"></qr-code>
			</modal>
		</span>
		<span v-if="post.videoIpfsHash">
			<a v-bind:href="$t('__newFileLink',{txHashVal: post.videoIpfsHash})">
			<button class="btnvideo btn-warning m-1"></button>
			</a>
			<button class="btnhash m-1" v-clipboard="post.videoIpfsHash"></button>
			<button class="btncopy m-1" v-clipboard="$t('__newFileLink',{txHashVal: post.videoIpfsHash})"></button>
			<button class="btnqrcode m-1" @click="$modal.show('qr-code-video-'+post.id);"></button>
			<modal v-bind:name="'qr-code-video-'+post.id" :height="360" :width="360" transition="scale">
				<qr-code :text="$t('__newFileLink',{txHashVal: post.videoIpfsHash})" :size="350" style="margin-left:5px;margin-top:5px;"></qr-code>
			</modal>
		</span>
		<span v-if="post.ethHash!=''">
			<a v-bind:href="$t('__readRopstenLink',{txHashVal: post.ethHash})">
			<button class="btnstickynote btn-warning m-1"></button>
			</a>
			<button class="btnhash m-1" v-clipboard="post.ethHash"></button>
			<button class="btncopy m-1" v-clipboard="$t('__readRopstenLink',{txHashVal: post.ethHash})"></button>
			<button class="btnqrcode m-1" @click="$modal.show('qr-code-text-'+post.id);"></button>
			<modal v-bind:name="'qr-code-text-'+post.id" :height="360" :width="360" transition="scale">
				<qr-code :text="$t('__readRopstenLink',{txHashVal: post.ethHash})" :size="350" style="margin-left:5px;margin-top:5px;"></qr-code>
			</modal>
		</span>
		<div style="height: 10px;"></div>
		上載者: <span style="fontSize: 8px">{{post.owner}}</span>
		<br>
		上載於: {{ Number(post.postTime) | moment("YYYY-MM-DD HH:mm") }}
		<!--<pre class="m-0">{{ post }}</pre>-->
      </b-card>
	</b-col>
	</b-row>
	</b-container>
  </div>
</template>

<script>
import Web3 from 'web3';

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_categoryId",
				"type": "uint256"
			},
			{
				"name": "_catName",
				"type": "string"
			}
		],
		"name": "modifyCategory",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_catName",
				"type": "string"
			}
		],
		"name": "addCategory",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "banHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_parentId",
				"type": "uint256"
			},
			{
				"name": "_imageIpfsHash",
				"type": "string"
			},
			{
				"name": "_videoIpfsHash",
				"type": "string"
			},
			{
				"name": "_ethHash",
				"type": "string"
			}
		],
		"name": "replyHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "isPauser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "releaseHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "caption",
				"type": "string"
			},
			{
				"name": "imageIpfsHash",
				"type": "string"
			},
			{
				"name": "videoIpfsHash",
				"type": "string"
			},
			{
				"name": "ethHash",
				"type": "string"
			},
			{
				"name": "categoryId",
				"type": "uint256"
			},
			{
				"name": "postTime",
				"type": "uint256"
			},
			{
				"name": "replyTime",
				"type": "uint256"
			},
			{
				"name": "removed",
				"type": "bool"
			},
			{
				"name": "exists",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renouncePauser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "addPauser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_categoryId",
				"type": "uint256"
			},
			{
				"name": "_caption",
				"type": "string"
			},
			{
				"name": "_imageIpfsHash",
				"type": "string"
			},
			{
				"name": "_videoIpfsHash",
				"type": "string"
			},
			{
				"name": "_ethHash",
				"type": "string"
			}
		],
		"name": "postHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCounter",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_categoryId",
				"type": "uint256"
			},
			{
				"name": "_start",
				"type": "uint256"
			}
		],
		"name": "getpostsByCategory",
		"outputs": [
			{
				"name": "",
				"type": "uint256[20]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCategoryCounter",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getCategory",
		"outputs": [
			{
				"name": "catName",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_token",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "NewPost",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "NewReply",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "catName",
				"type": "string"
			}
		],
		"name": "CategoryAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "catName",
				"type": "string"
			}
		],
		"name": "CategoryEdited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "account",
				"type": "address"
			}
		],
		"name": "PauserAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "account",
				"type": "address"
			}
		],
		"name": "PauserRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	}
];

export default {
  name: 'LennonWallComponent',
  // Data held here for the application
  data: function() {
    return {
      postTemplate: { id: '', caption: '', categoryId: '', imageHash: '', videoHash: '', ethHash: ''},
      categoryOptions: [
        {value: null, text:'請選擇分類'}
        ],
      currentPosts: [],
      form: {
        caption: '',
        categorySelect: null,
        imgIpfsHash: '',
        videoIpfsHash: '',
        ethHash: '',
		wallQRcode: '',
      },
      show: true,
	  categoryList: {},
	  showRemindAlert: false,
      remindContent: '',
	  showErrorAlert: false,
      web3error: '',
    }
  },

  computed:{
	  captionState(){
		  return this.form.caption.length <= 20;
	  },
	  categoryState(){
		  return this.form.categorySelect != null;
	  },
	  imgIpfsState(){
		  return (this.form.imgIpfsHash == "") ? true : (this.form.imgIpfsHash[0]=='Q' && this.form.imgIpfsHash[1]=='m')
	  },
	  videoIpfsState(){
		  return (this.form.videoIpfsHash == "") ? true : (this.form.videoIpfsHash[0]=='Q' && this.form.videoIpfsHash[1]=='m')
	  },
	  ethHashState(){
		  return (this.form.ethHash == "") ? true : (this.form.ethHash[0]=='0' && this.form.ethHash[1]=='x')
	  },
  },

  async created() {
    await this.fetchPosts();
  },

  // Methods required to run
  methods: {
    async fetchPosts() {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
          // Request account access if needed
          ethereum.enable();
        } catch (error) {
          // User denied account access...
        }
      } else if (window.web3) {
        // Legacy dapp browsers...
        window.web3 = new Web3(web3.currentProvider);
      } else {
        window.web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws"));
      }

      var contract = new web3.eth.Contract(abi, "0x892A4EDa13Cf846C8C352445817262a7e4f78fF0");

      const counter = await contract.methods.getCounter().call({
        from: this.currentAccount,
      });
      const postsFromContract = [];
      if (counter !== null) {
        for (let i = counter; i >= 1; i -= 1) {
			postsFromContract.push(contract.methods.getHash(i).call({
				from: this.currentAccount,
			}));
        }
      }
      const posts = await Promise.all(postsFromContract);

	  const categoryCounter = await contract.methods.getCategoryCounter().call({
        from: this.currentAccount,
      });
      const catFromContract = [];
      if (categoryCounter !== null) {
        for (let i = 0; i < categoryCounter; i += 1) {
			catFromContract.push(contract.methods.getCategory(i).call({
				from: this.currentAccount,
			}));
        }
      }
    	const cat = await Promise.all(catFromContract);
		var categoryPlaceholder = [
        	{value: null, text:'請選擇'},
        ];
	  	for (let i = 0; i < cat.length; i += 1) {
          categoryPlaceholder.push({
            value: i,
            text: cat[i],
          });
        }

		this.categoryList = cat;
	  	this.categoryOptions = categoryPlaceholder;
      	this.currentPosts = posts;
    },
    onSubmit(evt) {
      evt.preventDefault();
	  if (!(this.captionState && this.categoryState && this.imgIpfsState && this.videoIpfsState && this.ethHashState))
	  {
		this.showErrorAlert = true;
    	this.web3error = "請先確保資料正確";
        return;
	  }

      //alert(JSON.stringify(this.form));
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

      if (this.form.categorySelect == null)
      {
        this.showErrorAlert = true;
    	this.web3error = "必需選擇分類";
        return;
      }

	  this.remindContent = this.$t('__newWeb3ConfirmInMetamask');
      this.showRemindAlert = true;
	  this.showErrorAlert = false;

	  let self = this;

      var contract = new web3.eth.Contract(abi, "0x892A4EDa13Cf846C8C352445817262a7e4f78fF0");
      contract.methods.postHash(this.form.categorySelect,this.form.caption, this.form.imgIpfsHash, this.form.videoIpfsHash, this.form.ethHash)
      .send({ from: web3.currentProvider.publicConfigStore._state.selectedAddress },
              (error, transactionHash) => {
				if (error)
				{
				  self.showErrorAlert = true;
        		  self.web3error = error;
				}
                if (typeof transactionHash !== 'undefined') {
				  this.remindContent = "上傳中";
				  this.showRemindAlert = true;
                  contract.once('NewPost',
                    { from: web3.currentProvider.publicConfigStore._state.selectedAddress },
                    () => {
                      this.fetchPosts();
                      this.remindContent = "成功上傳";
      				  this.showRemindAlert = true;
                    });
                } else 
                {
                  self.showErrorAlert = true;
        		  self.web3error = error;
                }
              });

    },
    onReset(evt) {
        evt.preventDefault();
        // Reset our form values
        this.form.caption = '';
        this.form.categorySelect = null;
        this.form.imgIpfsHash = '';
        this.form.videoIpfsHash = '';
        this.form.ethHash = '';
        this.form.checked = [];
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        })
      }
  }
}
</script>
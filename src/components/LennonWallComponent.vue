<template>
  <!-- Main Body of the Application -->
  <div class="container reader-input">
	<br>
	<br>
	<h4>連儂牆 (Ropsten 測試網)<br></h4><br>
	<b-button v-b-toggle.collapse-1 class="m-1" size="sm">寫進連儂牆</b-button>
	<b-button variant="warning" class="m-1" @click="fetchPosts(null,null,null)" size="sm">全部</b-button>
	<span v-for="cater in categoryList">
		<b-button variant="warning" class="m-1" @click="fetchPosts(cater.id,null,null)" size="sm">{{cater.catName}}</b-button>
	</span>
    <b-collapse id="collapse-1" v-model="showCollapse" class="mt-2">
      <b-card>
	  	<center>
          	<div class="col-sm-6 col-sm-offset-3">
            <div class="panel-heading">
                <h4>寫進連儂牆</h4>
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
				標題不可長於40字
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
			  	<b-form-textarea
				id="textarea"
				v-model="form.message"
				rows="3"
				max-rows="6"
				:state="messageState"
				aria-describedby="input-message-help input-message-feedback"
				></b-form-textarea>
				<b-form-invalid-feedback id="input-message-feedback">
				不可長於200字
				</b-form-invalid-feedback>
				<b-form-text id="input-message-help">內容</b-form-text>
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
			  <div class="form-group"> 
                <b-form-input 
					v-model="form.tags" 
					placeholder="標籤 (以空格分隔)" 
					size="sm"
					:state="tagsState" 
					aria-describedby="input-tags-help input-tags-feedback"
					trim
				></b-form-input>
				<b-form-invalid-feedback id="input-tags-feedback">
				不可多於20個標籤
				</b-form-invalid-feedback>
				<b-form-text id="input-tags-help">標籤 (以空格分隔)</b-form-text>
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
	<div v-if="showFilter">
		當前過濾器: 
		<b-button variant="outline-dark" class="m-1" size="sm" v-if="this.currentCategoryListing != null">{{categoryList[currentCategoryListing].catName}}</b-button>
		<b-button variant="outline-dark" class="m-1" size="sm" v-if="this.currentTagFilter != null">#{{currentTagFilter}}</b-button>
		<b-button variant="outline-dark" class="m-1" size="sm" v-if="this.currentAddressFilter != null">{{currentAddressFilter}}</b-button>
	</div>
    <div style="height: 10px;"></div>
	<b-container>
	<b-row>
    <b-col v-for="post in currentPosts" v-if="!post.removed" cols="12" md="4" xl="3" lg="3">
      <b-card 
        img-alt="Image"
        img-top
        title-tag="h6"
		v-bind:title="post.caption"
        v-bind:img-src="post.imageIpfsHash === '' ? '':'https://ipfs.infura.io/ipfs/'+post.imageIpfsHash"
		style="fontSize: 12px"
      >
	  	<b-button pill variant="outline-dark" size="sm" @click="fetchPosts(categoryList[post.categoryId].id)">{{ categoryList[post.categoryId].catName }}</b-button>
		<div style="height: 10px;"></div>
		{{post.message}}
	  	<div style="height: 10px;"></div>
	  	<span v-if="post.imageIpfsHash">
		  	<a v-bind:href="$t('__newFileLink',{txHashVal: post.imageIpfsHash})" target="_blank">
			<button class="btnimage btn-warning m-1" aria-pressed="true" style="background-color:#ffc107!important;"></button>
			</a>
			<button class="btnhash m-1" v-clipboard="post.imageIpfsHash"></button>
			<button class="btncopy m-1" v-clipboard="$t('__newFileLink',{txHashVal: post.imageIpfsHash})"></button>
			<button class="btnqrcode m-1" @click="$modal.show('qr-code-image-'+post.id);"></button>
			<modal v-bind:name="'qr-code-image-'+post.id" :height="360" :width="360" transition="scale">
				<qr-code :text="$t('__newFileLink',{txHashVal: post.imageIpfsHash})" :size="350" style="margin-left:5px;margin-top:5px;"></qr-code>
			</modal>
		</span>
		<span v-if="post.videoIpfsHash">
			<a v-bind:href="$t('__newFileLink',{txHashVal: post.videoIpfsHash})" target="_blank">
			<button class="btnvideo btn-warning m-1" aria-pressed="true" style="background-color:#ffc107!important;"></button>
			</a>
			<button class="btnhash m-1" v-clipboard="post.videoIpfsHash"></button>
			<button class="btncopy m-1" v-clipboard="$t('__newFileLink',{txHashVal: post.videoIpfsHash})"></button>
			<button class="btnqrcode m-1" @click="$modal.show('qr-code-video-'+post.id);"></button>
			<modal v-bind:name="'qr-code-video-'+post.id" :height="360" :width="360" transition="scale">
				<qr-code :text="$t('__newFileLink',{txHashVal: post.videoIpfsHash})" :size="350" style="margin-left:5px;margin-top:5px;"></qr-code>
			</modal>
		</span>
		<span v-if="post.ethHash!=''">
			<a v-bind:href="$t('__readRopstenLink',{txHashVal: post.ethHash})" target="_blank">
			<button class="btnstickynote btn-warning m-1" aria-pressed="true"></button>
			</a>
			<button class="btnhash m-1" v-clipboard="post.ethHash" style="background-color:#ffc107!important;"></button>
			<button class="btncopy m-1" v-clipboard="$t('__readRopstenLink',{txHashVal: post.ethHash})"></button>
			<button class="btnqrcode m-1" @click="$modal.show('qr-code-text-'+post.id);"></button>
			<modal v-bind:name="'qr-code-text-'+post.id" :height="360" :width="360" transition="scale">
				<qr-code :text="$t('__readRopstenLink',{txHashVal: post.ethHash})" :size="350" style="margin-left:5px;margin-top:5px;"></qr-code>
			</modal>
		</span>
		<div style="height: 10px;"></div>
		<span v-if="post.tags!=''" v-for="tag in post.tags.split(' ')">
		<b-link @click="fetchPosts(null,tag,null)" class="m-1">#{{ tag }}</b-link>
		</span>
		<div style="height: 10px;"></div>
		上載者: <span style="fontSize: 8px"><b-link size="sm" @click="fetchPosts(null,null,post.owner)">{{ post.owner }}</b-link></span>
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
				"internalType": "string",
				"name": "_catName",
				"type": "string"
			}
		],
		"name": "addCategory",
		"outputs": [
			{
				"internalType": "bool",
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
				"internalType": "address",
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
		"inputs": [
			{
				"internalType": "uint256",
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
				"internalType": "uint256",
				"name": "_categoryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_catName",
				"type": "string"
			}
		],
		"name": "modifyCategory",
		"outputs": [
			{
				"internalType": "bool",
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
				"internalType": "uint256",
				"name": "_categoryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_caption",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_videoIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ethHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tags",
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
		"inputs": [],
		"name": "renouncePauser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "unbanHash",
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
		"inputs": [
			{
				"internalType": "contract ERC20Mintable",
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
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
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
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "string",
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
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "string",
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
				"internalType": "address",
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
				"internalType": "address",
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
				"internalType": "address",
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
				"internalType": "address",
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
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "categoryPosts",
		"outputs": [
			{
				"internalType": "uint256",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getCategory",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "catName",
				"type": "string"
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
				"internalType": "uint256",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_categoryId",
				"type": "uint256"
			}
		],
		"name": "getCategoryPostCounter",
		"outputs": [
			{
				"internalType": "uint256",
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
		"name": "getCounter",
		"outputs": [
			{
				"internalType": "uint256",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "caption",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "videoIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ethHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "categoryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tags",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "postTime",
				"type": "uint256"
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
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_addressItemId",
				"type": "uint256"
			}
		],
		"name": "getPostByAddressItem",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "caption",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "videoIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ethHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "categoryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tags",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "postTime",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "_categoryId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_categoryItemId",
				"type": "uint256"
			}
		],
		"name": "getPostByCategoryItem",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "caption",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "videoIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ethHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "categoryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tags",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "postTime",
				"type": "uint256"
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
				"internalType": "string",
				"name": "_tagName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_tagItemId",
				"type": "uint256"
			}
		],
		"name": "getPostByTagRecord",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "caption",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "videoIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ethHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "categoryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tags",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "postTime",
				"type": "uint256"
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
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getPostingRecordCounter",
		"outputs": [
			{
				"internalType": "uint256",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_tagName",
				"type": "string"
			}
		],
		"name": "getTagRecordCounter",
		"outputs": [
			{
				"internalType": "uint256",
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
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
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
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "isPauser",
		"outputs": [
			{
				"internalType": "bool",
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
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
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
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
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
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tagRecord",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = "0x8e5AA2B106650BF6ccD2584dC11fca993A8fdE69";

export default {
  name: 'LennonWallComponent',
  // Data held here for the application
  data: function() {
    return {
      postTemplate: { id: '', caption: '', categoryId: '', imageHash: '', videoHash: '', ethHash: '', tags: ''},
      categoryOptions: [
        {value: null, text:'請選擇分類'}
        ],
      currentPosts: [],
      form: {
        caption: '',
		message: '',
        categorySelect: null,
        imgIpfsHash: '',
        videoIpfsHash: '',
        ethHash: '',
		tags: '',
		wallQRcode: '',
      },
      show: true,
	  categoryList: {},
	  showRemindAlert: false,
      remindContent: '',
	  showErrorAlert: false,
      web3error: '',
	  currentCategoryListing: null,
	  currentTagFilter: null,
	  currentAddressFilter: null,
	  showCollapse: false,
    }
  },

  computed:{
	  captionState(){
		  return this.form.caption.length <= 40;
	  },
	  categoryState(){
		  return this.form.categorySelect != null;
	  },
	  messageState(){
		  return this.form.message.length <=200;
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
	  tagsState(){
		  return this.form.tags.length <=100;
	  },
	  showFilter(){
		  return this.currentAddressFilter || this.currentTagFilter || this.currentCategoryListing
	  },
  },

  async created() {
	await this.loadCategory();
    await this.fetchPosts();
  },

  // Methods required to run
  methods: {
	async loadCategory() {
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

      	var contract = new web3.eth.Contract(abi, contractAddress);

		//GetCategory
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
            text: cat[i].catName,
          });
        }
		this.categoryList = cat;
	  	this.categoryOptions = categoryPlaceholder;	
	},
    async fetchPosts(catId = null, tagFilter = null, address = null) {
		this.currentCategoryListing = catId;
		this.currentTagFilter = tagFilter;
		this.currentAddressFilter = address;

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

      	var contract = new web3.eth.Contract(abi, contractAddress);

		var posts;
		if (this.currentCategoryListing != null)
		{
			//GetPost
			const categoryPostCounter = await contract.methods.getCategoryPostCounter(this.currentCategoryListing).call({
				from: this.currentAccount,
			});
			const categoryPostsFromContract = [];
			if (categoryPostCounter !== null && categoryPostCounter > 0) {
				for (let i = categoryPostCounter - 1; i >= 0; i -= 1) {
					contract.methods.getPostByCategoryItem(this.currentCategoryListing,i).call({
							from: this.currentAccount,
						}).then(function(tempPost)
						{	
							tempPost['id'] = i;
							categoryPostsFromContract.push(tempPost);
						})
						.catch(function(error){});
				}
			}
			posts = categoryPostsFromContract;
		}
		else if (this.currentTagFilter != null)
		{
			//GetPost
			const tagRecordCounter = await contract.methods.getTagRecordCounter(this.currentTagFilter).call({
				from: this.currentAccount,
			});
			const tagPostsFromContract = [];
			if (tagRecordCounter !== null && tagRecordCounter > 0) {
				for (let i = tagRecordCounter - 1; i >= 0; i -= 1) {
					contract.methods.getPostByTagRecord(this.currentTagFilter,i).call({
							from: this.currentAccount,
						}).then(function(tempPost)
						{	
							tempPost['id'] = i;
							tagPostsFromContract.push(tempPost);
						})
						.catch(function(error){});
				}
			}
			posts = tagPostsFromContract;
		}
		else if (this.currentAddressFilter != null)
		{
			//GetPost
			const postingRecordCounter = await contract.methods.getPostingRecordCounter(this.currentAddressFilter).call({
				from: this.currentAccount,
			});
			const addressPostsFromContract = [];
			if (postingRecordCounter !== null && postingRecordCounter > 0) {
				for (let i = postingRecordCounter - 1; i >= 0; i -= 1) {
					contract.methods.getPostByAddressItem(this.currentAddressFilter,i).call({
							from: this.currentAccount,
						}).then(function(tempPost)
						{	
							tempPost['id'] = i;
							addressPostsFromContract.push(tempPost);
						})
						.catch(function(error){});
				}
			}
			posts = addressPostsFromContract;
		}
		else
		{
			//GetPost
			const counter = await contract.methods.getCounter().call({
				from: this.currentAccount,
			});
			const postsFromContract = [];
			if (counter !== null) {
				for (let i = counter; i >= 1; i -= 1) {
					contract.methods.getHash(i).call({
							from: this.currentAccount,
						}).then(function(tempPost)
						{	
							tempPost['id'] = i;
							postsFromContract.push(tempPost);
						})
						.catch(function(error){});
				}
			}
			posts = postsFromContract;
		}

		
      	this.currentPosts = posts;

		this.showCollapse = false;
	  	onReset();
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

      var contract = new web3.eth.Contract(abi, contractAddress);
      contract.methods.postHash(this.form.categorySelect,this.form.caption, this.form.message, this.form.imgIpfsHash, this.form.videoIpfsHash, this.form.ethHash, this.form.tags)
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
		this.form.message = '';
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
/* /en/lang.js */
export default {
    __lennonwallicu: 'Lennon Wall ICU',
    __lennonwallslogan: 'Permanent Place for Freedom of Expression',
    __lennonwallslogan2: 'Live with Ethereum Blockchain',
    __lennonwallabout: '',
    __lennonwallversion: 'v0.3',
    __lennonwallOnGoing: 'Current Development: Lennon Wall v0.4 smart contract, which enable view according to catergory and tag. Add Voting.',

    __home: 'Home',
    __new: 'New Message',
    __newFile: 'New File',
    __broadcast: 'Broadcast',
    __reader: 'Reader',
    __homeAbout: 'About',

    __networkSwitch: 'Switch network',
    __networkCurrentMainnet: 'Network：Mainnet',
    __networkCurrentRopsten: 'Network：Ropsten',

    __qrcodegen: 'QRCode Generator',
    __qrcodeplaceholder: 'Type the URL / Message here',

    __aboutHowItworks:'How it works',
    __aboutNewMessageTitle: 'To <a href="/new-message" class="router-link-active">create a message</a>:',
    __aboutReadTitle: 'To <a href="/" class="router-link-active">read a message</a>:',
    __aboutReadMethod1: 'Open it in <a href="/" class="router-link-active">reader</a>',
    __aboutReadMethod2: 'Embed the transaction hash in the URL, for example: <br><a href="https://lennonwall.icu/tx/0x2d6a7b0f6adeff38423d4c62cd8b6ccb708ddad85da5d3d06756ad4d8a04a6a2">https://lennonwall.icu/tx/0x2d6a7b0f6adeff38423d4c62cd8b6ccb708ddad85da5d3d06756ad4d8a04a6a2',
    __aboutUs: 'Lennon Wall ICU',
    __aboutUsText: '<p>Lennon Wall.ICU - permanent place for freedom of expression in urgent needs.</p><p><a href="https://en.wikipedia.org/wiki/Lennon_Wall_(Hong_Kong)" target="_blank">Lennon Wall</a> is referring the mosaic wall created in Hong Kong during <a href="https://en.wikipedia.org/wiki/2019_Hong_Kong_anti-extradition_bill_protests">protests against the China-Extradition bill</a>. It is a space of encouragement and solidarity, full of colourful post-it notes (more than ten thousand pieces) with messages advocating for freedom, democracy and universal suffrage blossoming everywhere. However within the first few days of being setup, they have been vandalized, and people around it was assaulted. It is sad to see people getting hurt or arrested when they express their idea/view or their effort being erased.</p><p>We aimed to create a ethereum blockchain-based decentralized community as a permanent place for freedom of expression. Writing message to blockchain is the first feature that we created to ensure every message is immuntable and being kept permanetly on network.</p><p>User create message in our interface, write into ethereum network via Metamask directly and read from ethereum network via <a href="https://etherscan.io">Etherscan</a> directly. We never obtain user\'s private key or personal information. You can verify by checking our code in Github. There is no back-end code and no database, all logic is on the front-end, written in Vue.js.</p><br></br><h2 style="text-align:left;margin-bottom:40px;">Development Roadmap</h2><p><ul><li>Lennon Wall</li></ul></p><br><br><h2 style="text-align:left;margin-bottom:40px;">Contact Us</h2><p>Contact: \x33\x64\x6f\x6d\x69\x73\x6e\x6f\x74\x33\x40\x70\x72\x6f\x74\x6f\x6e\x6d\x61\x69\x6c\x2e\x63\x6f\x6d</p><p>Donate to support the further development of a permanent place for freedom of expression. Thank you.<br>ETH address: 0x0093d8f97A6662b3FA38420438390DDB6694A804</p>',
    __ethAddress: '0x0093d8f97A6662b3FA38420438390DDB6694A804',

    __readsearchplaceholder : 'Ethereum transaction hash',
    __readreadthemssage: 'read the message',
    __readlucky: 'I\'m feeling lucky',
    __readloading: 'Loading...',
    __readmsgnotavailiable : 'Message is not available. Try a different tx hash.',
    __readblockchaincharacteristic : 'The above message is stored permanently on the blockchain. It cannot be edited or deleted.',
    __readmessagecreated: 'Message created:',
    __readhashaddress : 'Ethereum transaction hash:',
    __readEnterTxAlert: 'Enter Ethereum transaction hash',
    __readLink: 'https://lennonwall.icu/tx/{txHashVal}',
    __readRopstenLink: 'https://lennonwall.icu/ropsten/tx/{txHashVal}',

    __newheadline : 'Create a new permanent record on ethereum blockchain. Once the message being submitted and confirmed, it can\'t be modify or delete.',
    __newheadline2: 'Non mainnet network might get reset. Message is not guaranteed to be persistent,',
    __newGuidelineButton: 'How it works',
    __newheadDisclaimer: 'User create message in our interface and write into ethereum network via Metamask directly. We never obtain user\'s private key or personal information. You can verify by checking our code in Github',
    __newheadProcedure: '<b>Once the message being submitted and confirmed, it can\'t be modify or delete. </b>To protect user\'s privacy, the message will be sent to a random address, however please be notify that the message is publicly exposed to whom knowing the address / transaction hash. The transaction we prepared only includes the transaction fee which is higher if the message is longer.<br><br>Keeping the transaction hash, and you can check the message from different ethereum explorer.',
    __newMessageSize: 'Message size: {bytesCalcVal} bytes',
    __newMaxTxFee: 'Max tx fee(Not accurate at this moment): {txFeeCalcVal} ETH',
    __newPreviewButton: 'Preview',
    __newSetButton: 'Write',
    __newMessagePreview: 'Message preview',
    __newTimestamp: 'Timestamp (available after the message is recorded)',
    __newTxHash: 'Unique transaction hash (available after the message is recorded)',
    __newWeb3InstallMetaMask: 'Please install metamask for writing to ethereum network ',
    __newWeb3EnableAccess: 'Please allow us to connect to metamask',
    __newWeb3ConfirmInMetamask: 'Please confirm the transaction in Metamask, and ensure you have enough ETH to pay for gas',
    __newWeb3Confirmation: 'Transaction is confirmed with {number} confirmation. You can view it in our site',
    __newWeb3TranactionHash: 'The transaction hash: {hashVal}',
    __newWeb3Error: 'Error {errorVal}',
    __newWeb3Processing: 'Transaction Processing, Please wait...',

    __newFileHeadline : 'Upload file to InterPlanetary File System. Once the file being uploaded, it can\'t be actively modify or delete. (Please always keep a backup copy of the file)',
    __newFileGuidelineButton: 'How it works',
    __newFileHeadDisclaimer: 'User upload file to InterPlanetary File System directly in our interface. We never obtain user\'s personal information. You can verify by checking our code in Github',
    __newFileHeadProcedure: '<b>Once the message being submitted and confirmed, it can\'t be modify or delete. </b> The file will be kept and pinned on Infura IPFS node and to be accessed anytime. Not 100% guarantee the file will be kept forever as the node might be offline. Please always keep a backup copy of the file.',
    __newFileUploadButton: 'Upload',
    __newFileIPFSHash: 'IPFS Hash',
    __newFileLink: 'https://ipfs.io/ipfs/{txHashVal}',
    __newFileConfirmation: 'File has been uploaded. You can check the file in the link below',
    __newFileFilePlacerHolder:'Choose a file...',
    __newFileFileDropPlaceFolder: 'Drop file here...',
    __newFileFileBrowser: 'Browser',
    __newFileError: 'Error {errorVal}',
    __newFileFillInInfo: 'Please fill in the information.',
    __newFileUploadingMayLong: 'Uploading may take 1 minute or more. Please Wait...',
  }

"use strict";

// http://hgm.nubati.net/book_format.html

// Note on bitwise operations on BigInt values: everything is treated as infinite-length twos-compliment,
// which means negatives will never be accidentally introduced. (For normal Numbers, bitwise operations
// coerce to 32-bit signed.)

const PolyglotPieceXorVals = [		// the trailing n here means BigInt
	0x9d39247e33776d41n, 0x2af7398005aaa5c7n, 0x44db015024623547n, 0x9c15f73e62a76ae2n,
	0x75834465489c0c89n, 0x3290ac3a203001bfn, 0x0fbbad1f61042279n, 0xe83a908ff2fb60can,
	0x0d7e765d58755c10n, 0x1a083822ceafe02dn, 0x9605d5f0e25ec3b0n, 0xd021ff5cd13a2ed5n,
	0x40bdf15d4a672e32n, 0x011355146fd56395n, 0x5db4832046f3d9e5n, 0x239f8b2d7ff719ccn,
	0x05d1a1ae85b49aa1n, 0x679f848f6e8fc971n, 0x7449bbff801fed0bn, 0x7d11cdb1c3b7adf0n,
	0x82c7709e781eb7ccn, 0xf3218f1c9510786cn, 0x331478f3af51bbe6n, 0x4bb38de5e7219443n,
	0xaa649c6ebcfd50fcn, 0x8dbd98a352afd40bn, 0x87d2074b81d79217n, 0x19f3c751d3e92ae1n,
	0xb4ab30f062b19abfn, 0x7b0500ac42047ac4n, 0xc9452ca81a09d85dn, 0x24aa6c514da27500n,
	0x4c9f34427501b447n, 0x14a68fd73c910841n, 0xa71b9b83461cbd93n, 0x03488b95b0f1850fn,
	0x637b2b34ff93c040n, 0x09d1bc9a3dd90a94n, 0x3575668334a1dd3bn, 0x735e2b97a4c45a23n,
	0x18727070f1bd400bn, 0x1fcbacd259bf02e7n, 0xd310a7c2ce9b6555n, 0xbf983fe0fe5d8244n,
	0x9f74d14f7454a824n, 0x51ebdc4ab9ba3035n, 0x5c82c505db9ab0fan, 0xfcf7fe8a3430b241n,
	0x3253a729b9ba3dden, 0x8c74c368081b3075n, 0xb9bc6c87167c33e7n, 0x7ef48f2b83024e20n,
	0x11d505d4c351bd7fn, 0x6568fca92c76a243n, 0x4de0b0f40f32a7b8n, 0x96d693460cc37e5dn,
	0x42e240cb63689f2fn, 0x6d2bdcdae2919661n, 0x42880b0236e4d951n, 0x5f0f4a5898171bb6n,
	0x39f890f579f92f88n, 0x93c5b5f47356388bn, 0x63dc359d8d231b78n, 0xec16ca8aea98ad76n,
	0x5355f900c2a82dc7n, 0x07fb9f855a997142n, 0x5093417aa8a7ed5en, 0x7bcbc38da25a7f3cn,
	0x19fc8a768cf4b6d4n, 0x637a7780decfc0d9n, 0x8249a47aee0e41f7n, 0x79ad695501e7d1e8n,
	0x14acbaf4777d5776n, 0xf145b6beccdea195n, 0xdabf2ac8201752fcn, 0x24c3c94df9c8d3f6n,
	0xbb6e2924f03912ean, 0x0ce26c0b95c980d9n, 0xa49cd132bfbf7cc4n, 0xe99d662af4243939n,
	0x27e6ad7891165c3fn, 0x8535f040b9744ff1n, 0x54b3f4fa5f40d873n, 0x72b12c32127fed2bn,
	0xee954d3c7b411f47n, 0x9a85ac909a24eaa1n, 0x70ac4cd9f04f21f5n, 0xf9b89d3e99a075c2n,
	0x87b3e2b2b5c907b1n, 0xa366e5b8c54f48b8n, 0xae4a9346cc3f7cf2n, 0x1920c04d47267bbdn,
	0x87bf02c6b49e2ae9n, 0x092237ac237f3859n, 0xff07f64ef8ed14d0n, 0x8de8dca9f03cc54en,
	0x9c1633264db49c89n, 0xb3f22c3d0b0b38edn, 0x390e5fb44d01144bn, 0x5bfea5b4712768e9n,
	0x1e1032911fa78984n, 0x9a74acb964e78cb3n, 0x4f80f7a035dafb04n, 0x6304d09a0b3738c4n,
	0x2171e64683023a08n, 0x5b9b63eb9ceff80cn, 0x506aacf489889342n, 0x1881afc9a3a701d6n,
	0x6503080440750644n, 0xdfd395339cdbf4a7n, 0xef927dbcf00c20f2n, 0x7b32f7d1e03680ecn,
	0xb9fd7620e7316243n, 0x05a7e8a57db91b77n, 0xb5889c6e15630a75n, 0x4a750a09ce9573f7n,
	0xcf464cec899a2f8an, 0xf538639ce705b824n, 0x3c79a0ff5580ef7fn, 0xede6c87f8477609dn,
	0x799e81f05bc93f31n, 0x86536b8cf3428a8cn, 0x97d7374c60087b73n, 0xa246637cff328532n,
	0x043fcae60cc0eba0n, 0x920e449535dd359en, 0x70eb093b15b290ccn, 0x73a1921916591cbdn,
	0x56436c9fe1a1aa8dn, 0xefac4b70633b8f81n, 0xbb215798d45df7afn, 0x45f20042f24f1768n,
	0x930f80f4e8eb7462n, 0xff6712ffcfd75ea1n, 0xae623fd67468aa70n, 0xdd2c5bc84bc8d8fcn,
	0x7eed120d54cf2dd9n, 0x22fe545401165f1cn, 0xc91800e98fb99929n, 0x808bd68e6ac10365n,
	0xdec468145b7605f6n, 0x1bede3a3aef53302n, 0x43539603d6c55602n, 0xaa969b5c691ccb7an,
	0xa87832d392efee56n, 0x65942c7b3c7e11aen, 0xded2d633cad004f6n, 0x21f08570f420e565n,
	0xb415938d7da94e3cn, 0x91b859e59ecb6350n, 0x10cff333e0ed804an, 0x28aed140be0bb7ddn,
	0xc5cc1d89724fa456n, 0x5648f680f11a2741n, 0x2d255069f0b7dab3n, 0x9bc5a38ef729abd4n,
	0xef2f054308f6a2bcn, 0xaf2042f5cc5c2858n, 0x480412bab7f5be2an, 0xaef3af4a563dfe43n,
	0x19afe59ae451497fn, 0x52593803dff1e840n, 0xf4f076e65f2ce6f0n, 0x11379625747d5af3n,
	0xbce5d2248682c115n, 0x9da4243de836994fn, 0x066f70b33fe09017n, 0x4dc4de189b671a1cn,
	0x51039ab7712457c3n, 0xc07a3f80c31fb4b4n, 0xb46ee9c5e64a6e7cn, 0xb3819a42abe61c87n,
	0x21a007933a522a20n, 0x2df16f761598aa4fn, 0x763c4a1371b368fdn, 0xf793c46702e086a0n,
	0xd7288e012aeb8d31n, 0xde336a2a4bc1c44bn, 0x0bf692b38d079f23n, 0x2c604a7a177326b3n,
	0x4850e73e03eb6064n, 0xcfc447f1e53c8e1bn, 0xb05ca3f564268d99n, 0x9ae182c8bc9474e8n,
	0xa4fc4bd4fc5558can, 0xe755178d58fc4e76n, 0x69b97db1a4c03dfen, 0xf9b5b7c4acc67c96n,
	0xfc6a82d64b8655fbn, 0x9c684cb6c4d24417n, 0x8ec97d2917456ed0n, 0x6703df9d2924e97en,
	0xc547f57e42a7444en, 0x78e37644e7cad29en, 0xfe9a44e9362f05fan, 0x08bd35cc38336615n,
	0x9315e5eb3a129acen, 0x94061b871e04df75n, 0xdf1d9f9d784ba010n, 0x3bba57b68871b59dn,
	0xd2b7adeeded1f73fn, 0xf7a255d83bc373f8n, 0xd7f4f2448c0ceb81n, 0xd95be88cd210ffa7n,
	0x336f52f8ff4728e7n, 0xa74049dac312ac71n, 0xa2f61bb6e437fdb5n, 0x4f2a5cb07f6a35b3n,
	0x87d380bda5bf7859n, 0x16b9f7e06c453a21n, 0x7ba2484c8a0fd54en, 0xf3a678cad9a2e38cn,
	0x39b0bf7dde437ba2n, 0xfcaf55c1bf8a4424n, 0x18fcf680573fa594n, 0x4c0563b89f495ac3n,
	0x40e087931a00930dn, 0x8cffa9412eb642c1n, 0x68ca39053261169fn, 0x7a1ee967d27579e2n,
	0x9d1d60e5076f5b6fn, 0x3810e399b6f65ba2n, 0x32095b6d4ab5f9b1n, 0x35cab62109dd038an,
	0xa90b24499fcfafb1n, 0x77a225a07cc2c6bdn, 0x513e5e634c70e331n, 0x4361c0ca3f692f12n,
	0xd941aca44b20a45bn, 0x528f7c8602c5807bn, 0x52ab92beb9613989n, 0x9d1dfa2efc557f73n,
	0x722ff175f572c348n, 0x1d1260a51107fe97n, 0x7a249a57ec0c9ba2n, 0x04208fe9e8f7f2d6n,
	0x5a110c6058b920a0n, 0x0cd9a497658a5698n, 0x56fd23c8f9715a4cn, 0x284c847b9d887aaen,
	0x04feabfbbdb619cbn, 0x742e1e651c60ba83n, 0x9a9632e65904ad3cn, 0x881b82a13b51b9e2n,
	0x506e6744cd974924n, 0xb0183db56ffc6a79n, 0x0ed9b915c66ed37en, 0x5e11e86d5873d484n,
	0xf678647e3519ac6en, 0x1b85d488d0f20cc5n, 0xdab9fe6525d89021n, 0x0d151d86adb73615n,
	0xa865a54edcc0f019n, 0x93c42566aef98ffbn, 0x99e7afeabe000731n, 0x48cbff086ddf285an,
	0x7f9b6af1ebf78bafn, 0x58627e1a149bba21n, 0x2cd16e2abd791e33n, 0xd363eff5f0977996n,
	0x0ce2a38c344a6eedn, 0x1a804aadb9cfa741n, 0x907f30421d78c5den, 0x501f65edb3034d07n,
	0x37624ae5a48fa6e9n, 0x957baf61700cff4en, 0x3a6c27934e31188an, 0xd49503536abca345n,
	0x088e049589c432e0n, 0xf943aee7febf21b8n, 0x6c3b8e3e336139d3n, 0x364f6ffa464ee52en,
	0xd60f6dcedc314222n, 0x56963b0dca418fc0n, 0x16f50edf91e513afn, 0xef1955914b609f93n,
	0x565601c0364e3228n, 0xecb53939887e8175n, 0xbac7a9a18531294bn, 0xb344c470397bba52n,
	0x65d34954daf3cebdn, 0xb4b81b3fa97511e2n, 0xb422061193d6f6a7n, 0x071582401c38434dn,
	0x7a13f18bbedc4ff5n, 0xbc4097b116c524d2n, 0x59b97885e2f2ea28n, 0x99170a5dc3115544n,
	0x6f423357e7c6a9f9n, 0x325928ee6e6f8794n, 0xd0e4366228b03343n, 0x565c31f7de89ea27n,
	0x30f5611484119414n, 0xd873db391292ed4fn, 0x7bd94e1d8e17debcn, 0xc7d9f16864a76e94n,
	0x947ae053ee56e63cn, 0xc8c93882f9475f5fn, 0x3a9bf55ba91f81can, 0xd9a11fbb3d9808e4n,
	0x0fd22063edc29fcan, 0xb3f256d8aca0b0b9n, 0xb03031a8b4516e84n, 0x35dd37d5871448afn,
	0xe9f6082b05542e4en, 0xebfafa33d7254b59n, 0x9255abb50d532280n, 0xb9ab4ce57f2d34f3n,
	0x693501d628297551n, 0xc62c58f97dd949bfn, 0xcd454f8f19c5126an, 0xbbe83f4ecc2bdecbn,
	0xdc842b7e2819e230n, 0xba89142e007503b8n, 0xa3bc941d0a5061cbn, 0xe9f6760e32cd8021n,
	0x09c7e552bc76492fn, 0x852f54934da55cc9n, 0x8107fccf064fcf56n, 0x098954d51fff6580n,
	0x23b70edb1955c4bfn, 0xc330de426430f69dn, 0x4715ed43e8a45c0an, 0xa8d7e4dab780a08dn,
	0x0572b974f03ce0bbn, 0xb57d2e985e1419c7n, 0xe8d9ecbe2cf3d73fn, 0x2fe4b17170e59750n,
	0x11317ba87905e790n, 0x7fbf21ec8a1f45ecn, 0x1725cabfcb045b00n, 0x964e915cd5e2b207n,
	0x3e2b8bcbf016d66dn, 0xbe7444e39328a0acn, 0xf85b2b4fbcde44b7n, 0x49353fea39ba63b1n,
	0x1dd01aafcd53486an, 0x1fca8a92fd719f85n, 0xfc7c95d827357afan, 0x18a6a990c8b35ebdn,
	0xcccb7005c6b9c28dn, 0x3bdbb92c43b17f26n, 0xaa70b5b4f89695a2n, 0xe94c39a54a98307fn,
	0xb7a0b174cff6f36en, 0xd4dba84729af48adn, 0x2e18bc1ad9704a68n, 0x2de0966daf2f8b1cn,
	0xb9c11d5b1e43a07en, 0x64972d68dee33360n, 0x94628d38d0c20584n, 0xdbc0d2b6ab90a559n,
	0xd2733c4335c6a72fn, 0x7e75d99d94a70f4dn, 0x6ced1983376fa72bn, 0x97fcaacbf030bc24n,
	0x7b77497b32503b12n, 0x8547eddfb81ccb94n, 0x79999cdff70902cbn, 0xcffe1939438e9b24n,
	0x829626e3892d95d7n, 0x92fae24291f2b3f1n, 0x63e22c147b9c3403n, 0xc678b6d860284a1cn,
	0x5873888850659ae7n, 0x0981dcd296a8736dn, 0x9f65789a6509a440n, 0x9ff38fed72e9052fn,
	0xe479ee5b9930578cn, 0xe7f28ecd2d49eecdn, 0x56c074a581ea17fen, 0x5544f7d774b14aefn,
	0x7b3f0195fc6f290fn, 0x12153635b2c0cf57n, 0x7f5126dbba5e0ca7n, 0x7a76956c3eafb413n,
	0x3d5774a11d31ab39n, 0x8a1b083821f40cb4n, 0x7b4a38e32537df62n, 0x950113646d1d6e03n,
	0x4da8979a0041e8a9n, 0x3bc36e078f7515d7n, 0x5d0a12f27ad310d1n, 0x7f9d1a2e1ebe1327n,
	0xda3a361b1c5157b1n, 0xdcdd7d20903d0c25n, 0x36833336d068f707n, 0xce68341f79893389n,
	0xab9090168dd05f34n, 0x43954b3252dc25e5n, 0xb438c2b67f98e5e9n, 0x10dcd78e3851a492n,
	0xdbc27ab5447822bfn, 0x9b3cdb65f82ca382n, 0xb67b7896167b4c84n, 0xbfced1b0048eac50n,
	0xa9119b60369ffebdn, 0x1fff7ac80904bf45n, 0xac12fb171817eee7n, 0xaf08da9177dda93dn,
	0x1b0cab936e65c744n, 0xb559eb1d04e5e932n, 0xc37b45b3f8d6f2ban, 0xc3a9dc228caac9e9n,
	0xf3b8b6675a6507ffn, 0x9fc477de4ed681dan, 0x67378d8eccef96cbn, 0x6dd856d94d259236n,
	0xa319ce15b0b4db31n, 0x073973751f12dd5en, 0x8a8e849eb32781a5n, 0xe1925c71285279f5n,
	0x74c04bf1790c0efen, 0x4dda48153c94938an, 0x9d266d6a1cc0542cn, 0x7440fb816508c4fen,
	0x13328503df48229fn, 0xd6bf7baee43cac40n, 0x4838d65f6ef6748fn, 0x1e152328f3318dean,
	0x8f8419a348f296bfn, 0x72c8834a5957b511n, 0xd7a023a73260b45cn, 0x94ebc8abcfb56daen,
	0x9fc10d0f989993e0n, 0xde68a2355b93cae6n, 0xa44cfe79ae538bben, 0x9d1d84fcce371425n,
	0x51d2b1ab2ddfb636n, 0x2fd7e4b9e72cd38cn, 0x65ca5b96b7552210n, 0xdd69a0d8ab3b546dn,
	0x604d51b25fbf70e2n, 0x73aa8a564fb7ac9en, 0x1a8c1e992b941148n, 0xaac40a2703d9bea0n,
	0x764dbeae7fa4f3a6n, 0x1e99b96e70a9be8bn, 0x2c5e9deb57ef4743n, 0x3a938fee32d29981n,
	0x26e6db8ffdf5adfen, 0x469356c504ec9f9dn, 0xc8763c5b08d1908cn, 0x3f6c6af859d80055n,
	0x7f7cc39420a3a545n, 0x9bfb227ebdf4c5cen, 0x89039d79d6fc5c5cn, 0x8fe88b57305e2ab6n,
	0xa09e8c8c35ab96den, 0xfa7e393983325753n, 0xd6b6d0ecc617c699n, 0xdfea21ea9e7557e3n,
	0xb67c1fa481680af8n, 0xca1e3785a9e724e5n, 0x1cfc8bed0d681639n, 0xd18d8549d140caean,
	0x4ed0fe7e9dc91335n, 0xe4dbf0634473f5d2n, 0x1761f93a44d5aefen, 0x53898e4c3910da55n,
	0x734de8181f6ec39an, 0x2680b122baa28d97n, 0x298af231c85bafabn, 0x7983eed3740847d5n,
	0x66c1a2a1a60cd889n, 0x9e17e49642a3e4c1n, 0xedb454e7badc0805n, 0x50b704cab602c329n,
	0x4cc317fb9cddd023n, 0x66b4835d9eafea22n, 0x219b97e26ffc81bdn, 0x261e4e4c0a333a9dn,
	0x1fe2cca76517db90n, 0xd7504dfa8816edbbn, 0xb9571fa04dc089c8n, 0x1ddc0325259b27den,
	0xcf3f4688801eb9aan, 0xf4f5d05c10cab243n, 0x38b6525c21a42b0en, 0x36f60e2ba4fa6800n,
	0xeb3593803173e0cen, 0x9c4cd6257c5a3603n, 0xaf0c317d32adaa8an, 0x258e5a80c7204c4bn,
	0x8b889d624d44885dn, 0xf4d14597e660f855n, 0xd4347f66ec8941c3n, 0xe699ed85b0dfb40dn,
	0x2472f6207c2d0484n, 0xc2a1e7b5b459aeb5n, 0xab4f6451cc1d45ecn, 0x63767572ae3d6174n,
	0xa59e0bd101731a28n, 0x116d0016cb948f09n, 0x2cf9c8ca052f6e9fn, 0x0b090a7560a968e3n,
	0xabeeddb2dde06ff1n, 0x58efc10b06a2068dn, 0xc6e57a78fbd986e0n, 0x2eab8ca63ce802d7n,
	0x14a195640116f336n, 0x7c0828dd624ec390n, 0xd74bbe77e6116ac7n, 0x804456af10f5fb53n,
	0xebe9ea2adf4321c7n, 0x03219a39ee587a30n, 0x49787fef17af9924n, 0xa1e9300cd8520548n,
	0x5b45e522e4b1b4efn, 0xb49c3b3995091a36n, 0xd4490ad526f14431n, 0x12a8f216af9418c2n,
	0x001f837cc7350524n, 0x1877b51e57a764d5n, 0xa2853b80f17f58een, 0x993e1de72d36d310n,
	0xb3598080ce64a656n, 0x252f59cf0d9f04bbn, 0xd23c8e176d113600n, 0x1bda0492e7e4586en,
	0x21e0bd5026c619bfn, 0x3b097adaf088f94en, 0x8d14dedb30be846en, 0xf95cffa23af5f6f4n,
	0x3871700761b3f743n, 0xca672b91e9e4fa16n, 0x64c8e531bff53b55n, 0x241260ed4ad1e87dn,
	0x106c09b972d2e822n, 0x7fba195410e5ca30n, 0x7884d9bc6cb569d8n, 0x0647dfedcd894a29n,
	0x63573ff03e224774n, 0x4fc8e9560f91b123n, 0x1db956e450275779n, 0xb8d91274b9e9d4fbn,
	0xa2ebee47e2fbfce1n, 0xd9f1f30ccd97fb09n, 0xefed53d75fd64e6bn, 0x2e6d02c36017f67fn,
	0xa9aa4d20db084e9bn, 0xb64be8d8b25396c1n, 0x70cb6af7c2d5bcf0n, 0x98f076a4f7a2322en,
	0xbf84470805e69b5fn, 0x94c3251f06f90cf3n, 0x3e003e616a6591e9n, 0xb925a6cd0421aff3n,
	0x61bdd1307c66e300n, 0xbf8d5108e27e0d48n, 0x240ab57a8b888b20n, 0xfc87614baf287e07n,
	0xef02cdd06ffdb432n, 0xa1082c0466df6c0an, 0x8215e577001332c8n, 0xd39bb9c3a48db6cfn,
	0x2738259634305c14n, 0x61cf4f94c97df93dn, 0x1b6baca2ae4e125bn, 0x758f450c88572e0bn,
	0x959f587d507a8359n, 0xb063e962e045f54dn, 0x60e8ed72c0dff5d1n, 0x7b64978555326f9fn,
	0xfd080d236da814ban, 0x8c90fd9b083f4558n, 0x106f72fe81e2c590n, 0x7976033a39f7d952n,
	0xa4ec0132764ca04bn, 0x733ea705fae4fa77n, 0xb4d8f77bc3e56167n, 0x9e21f4f903b33fd9n,
	0x9d765e419fb69f6dn, 0xd30c088ba61ea5efn, 0x5d94337fbfaf7f5bn, 0x1a4e4822eb4d7a59n,
	0x6ffe73e81b637fb3n, 0xddf957bc36d8b9can, 0x64d0e29eea8838b3n, 0x08dd9bdfd96b9f63n,
	0x087e79e5a57d1d13n, 0xe328e230e3e2b3fbn, 0x1c2559e30f0946ben, 0x720bf5f26f4d2eaan,
	0xb0774d261cc609dbn, 0x443f64ec5a371195n, 0x4112cf68649a260en, 0xd813f2fab7f5c5can,
	0x660d3257380841een, 0x59ac2c7873f910a3n, 0xe846963877671a17n, 0x93b633abfa3469f8n,
	0xc0c0f5a60ef4cdcfn, 0xcaf21ecd4377b28cn, 0x57277707199b8175n, 0x506c11b9d90e8b1dn,
	0xd83cc2687a19255fn, 0x4a29c6465a314cd1n, 0xed2df21216235097n, 0xb5635c95ff7296e2n,
	0x22af003ab672e811n, 0x52e762596bf68235n, 0x9aeba33ac6ecc6b0n, 0x944f6de09134dfb6n,
	0x6c47bec883a7de39n, 0x6ad047c430a12104n, 0xa5b1cfdba0ab4067n, 0x7c45d833aff07862n,
	0x5092ef950a16da0bn, 0x9338e69c052b8e7bn, 0x455a4b4cfe30e3f5n, 0x6b02e63195ad0cf8n,
	0x6b17b224bad6bf27n, 0xd1e0ccd25bb9c169n, 0xde0c89a556b9ae70n, 0x50065e535a213cf6n,
	0x9c1169fa2777b874n, 0x78edefd694af1eedn, 0x6dc93d9526a50e68n, 0xee97f453f06791edn,
	0x32ab0edb696703d3n, 0x3a6853c7e70757a7n, 0x31865ced6120f37dn, 0x67fef95d92607890n,
	0x1f2b1d1f15f6dc9cn, 0xb69e38a8965c6b65n, 0xaa9119ff184cccf4n, 0xf43c732873f24c13n,
	0xfb4a3d794a9a80d2n, 0x3550c2321fd6109cn, 0x371f77e76bb8417en, 0x6bfa9aae5ec05779n,
	0xcd04f3ff001a4778n, 0xe3273522064480can, 0x9f91508bffcfc14an, 0x049a7f41061a9e60n,
	0xfcb6be43a9f2fe9bn, 0x08de8a1c7797da9bn, 0x8f9887e6078735a1n, 0xb5b4071dbfc73a66n,
	0x230e343dfba08d33n, 0x43ed7f5a0fae657dn, 0x3a88a0fbbcb05c63n, 0x21874b8b4d2dbc4fn,
	0x1bdea12e35f6a8c9n, 0x53c065c6c8e63528n, 0xe34a1d250e7a8d6bn, 0xd6b04d3b7651dd7en,
	0x5e90277e7cb39e2dn, 0x2c046f22062dc67dn, 0xb10bb459132d0a26n, 0x3fa9ddfb67e2f199n,
	0x0e09b88e1914f7afn, 0x10e8b35af3eeab37n, 0x9eedeca8e272b933n, 0xd4c718bc4ae8ae5fn,
	0x81536d601170fc20n, 0x91b534f885818a06n, 0xec8177f83f900978n, 0x190e714fada5156en,
	0xb592bf39b0364963n, 0x89c350c893ae7dc1n, 0xac042e70f8b383f2n, 0xb49b52e587a1ee60n,
	0xfb152fe3ff26da89n, 0x3e666e6f69ae2c15n, 0x3b544ebe544c19f9n, 0xe805a1e290cf2456n,
	0x24b33c9d7ed25117n, 0xe74733427b72f0c1n, 0x0a804d18b7097475n, 0x57e3306d881edb4fn,
	0x4ae7d6a36eb5dbcbn, 0x2d8d5432157064c8n, 0xd1e649de1e7f268bn, 0x8a328a1cedfe552cn,
	0x07a3aec79624c7dan, 0x84547ddc3e203c94n, 0x990a98fd5071d263n, 0x1a4ff12616eefc89n,
	0xf6f7fd1431714200n, 0x30c05b1ba332f41cn, 0x8d2636b81555a786n, 0x46c9feb55d120902n,
	0xccec0a73b49c9921n, 0x4e9d2827355fc492n, 0x19ebb029435dcb0fn, 0x4659d2b743848a2cn,
	0x963ef2c96b33be31n, 0x74f85198b05a2e7dn, 0x5a0f544dd2b1fb18n, 0x03727073c2e134b1n,
	0xc7f6aa2de59aea61n, 0x352787baa0d7c22fn, 0x9853eab63b5e0b35n, 0xabbdcdd7ed5c0860n,
	0xcf05daf5ac8d77b0n, 0x49cad48cebf4a71en, 0x7a4c10ec2158c4a6n, 0xd9e92aa246bf719en,
	0x13ae978d09fe5557n, 0x730499af921549ffn, 0x4e4b705b92903ba4n, 0xff577222c14f0a3an,
	0x55b6344cf97aafaen, 0xb862225b055b6960n, 0xcac09afbddd2cdb4n, 0xdaf8e9829fe96b5fn,
	0xb5fdfc5d3132c498n, 0x310cb380db6f7503n, 0xe87fbb46217a360en, 0x2102ae466ebb1148n,
	0xf8549e1a3aa5e00dn, 0x07a69afdcc42261an, 0xc4c118bfe78feaaen, 0xf9f4892ed96bd438n,
	0x1af3dbe25d8f45dan, 0xf5b4b0b0d2deeeb4n, 0x962aceefa82e1c84n, 0x046e3ecaaf453ce9n,
	0xf05d129681949a4cn, 0x964781ce734b3c84n, 0x9c2ed44081ce5fbdn, 0x522e23f3925e319en,
	0x177e00f9fc32f791n, 0x2bc60a63a6f3b3f2n, 0x222bbfae61725606n, 0x486289ddcc3d6780n,
	0x7dc7785b8efdfc80n, 0x8af38731c02ba980n, 0x1fab64ea29a2ddf7n, 0xe4d9429322cd065an,
	0x9da058c67844f20cn, 0x24c0e332b70019b0n, 0x233003b5a6cfe6adn, 0xd586bd01c5c217f6n,
	0x5e5637885f29bc2bn, 0x7eba726d8c94094bn, 0x0a56a5f0bfe39272n, 0xd79476a84ee20d06n,
	0x9e4c1269baa4bf37n, 0x17efee45b0dee640n, 0x1d95b0a5fcf90bc6n, 0x93cbe0b699c2585dn,
	0x65fa4f227a2b6d79n, 0xd5f9e858292504d5n, 0xc2b5a03f71471a6fn, 0x59300222b4561e00n,
	0xce2f8642ca0712dcn, 0x7ca9723fbb2e8988n, 0x2785338347f2ba08n, 0xc61bb3a141e50e8cn,
	0x150f361dab9dec26n, 0x9f6a419d382595f4n, 0x64a53dc924fe7ac9n, 0x142de49fff7a7c3dn,
	0x0c335248857fa9e7n, 0x0a9c32d5eae45305n, 0xe6c42178c4bbb92en, 0x71f1ce2490d20b07n,
	0xf1bcc3d275afe51an, 0xe728e8c83c334074n, 0x96fbf83a12884624n, 0x81a1549fd6573da5n,
	0x5fa7867caf35e149n, 0x56986e2ef3ed091bn, 0x917f1dd5f8886c61n, 0xd20d8c88c8ffe65fn,
];

const PolyglotCastleXorVals = [
	0x31d71dce64b2c310n, 0xf165b587df898190n, 0xa57e6339dd2cf3a0n, 0x1ef6e6dbb1961ec9n,
];

const PolyglotEnPassantXorVals = [
	0x70cc73d90bc26e24n, 0xe21a6b35df0c3ad7n, 0x003a93d8b2806962n, 0x1c99ded33cb890a1n,
	0xcf3145de0add4289n, 0xd0e4427a5514fb72n, 0x77c621cc9fb3a483n, 0x67a34dac4356550bn,
];

const PolyglotActiveXorVal = 0xf8d626aaaf278509n;

// ------------------------------------------------------------------------------------------------------------------------

const PolyglotMoveLookup = [];		// Lookup table for book blob bytes 8-9. Most of the moves are impossible, but meh.

for (let n = 0; n < 65536; n++) {

	let to_file    =  (n >>  0) & 0x07;
	let to_row     =  (n >>  3) & 0x07;
	let from_file  =  (n >>  6) & 0x07;
	let from_row   =  (n >>  9) & 0x07;
	let promval    =  (n >> 12) & 0x07;

	let source = Point(from_file, 7 - from_row);
	let dest   = Point(to_file,   7 - to_row);

	let promch = ["", "n", "b", "r", "q", "", "", ""][promval];

	PolyglotMoveLookup.push(source.s + dest.s + promch);
}

// ------------------------------------------------------------------------------------------------------------------------

function KeyFromBoard(board) {

	if (!board) return "";

	let key = 0n;

	// Note to anyone reading this trying to make their own Polyglot routines:
	// My board (0,0) is a8, not a1. Otherwise, you'd use y and not (7 - y) in the index calc.

	for (let x = 0; x < 8; x++) {
		for (let y = 0; y < 8; y++) {
			if (!board.state[x][y]) {
				continue;
			}
			let piecekind = "pPnNbBrRqQkK".indexOf(board.state[x][y]);
			if (piecekind === -1) {
				continue;
			}
			let index = (64 * piecekind) + (8 * (7 - y)) + x;					// I mean here.
			key ^= PolyglotPieceXorVals[index];
		}
	}

	if (board.castling.includes("H")) key ^= PolyglotCastleXorVals[0];
	if (board.castling.includes("A")) key ^= PolyglotCastleXorVals[1];
	if (board.castling.includes("h")) key ^= PolyglotCastleXorVals[2];
	if (board.castling.includes("a")) key ^= PolyglotCastleXorVals[3];

	// Happily, the format's idea of when an en passant square should be included is identical to mine...
	// "If the opponent has performed a double pawn push and there is now a pawn next to it belonging to the player to move."

	if (board.enpassant) {
		key ^= PolyglotEnPassantXorVals[board.enpassant.x];
	}

	if (board.active === "w") {
		key ^= PolyglotActiveXorVal;
	}

	return key;
}

function ParsePolyglotBlob(buf, off) {		// Args are Buffer + offset.

	if (buf instanceof Buffer === false) {
		throw "ParsePolyglotBlob() bad book";
	}

	if (off < 0 || off > buf.length - 16) {
		throw "ParsePolyglotBlob() bad offset";
	}

	// Bytes 0-7 represent the key as a big-endian number.

	let hi = (buf[off++] * 16777216) + (buf[off++] * 65536) + (buf[off++] * 256) + buf[off++];
	let lo = (buf[off++] * 16777216) + (buf[off++] * 65536) + (buf[off++] * 256) + buf[off++];
	let key = (BigInt(hi) << 32n) + BigInt(lo);

	// Bytes 8-9 represent the move as a big-endian bitfield, uh...

	let move = PolyglotMoveLookup[(buf[off++] * 256) + buf[off++]];

	// Bytes 10-11 represent the quality as a big-endian number.

	let weight = (buf[off++] * 256) + buf[off++];

	return {key, move, weight};
}

function SortAndDeclutterPGNBook(book) {

	if (book instanceof Buffer) {
		throw "Cannot call SortAndDeclutterPGNBook() on a Buffer.";
	}

	if (Array.isArray(book) === false) {
		throw "SortAndDeclutterPGNBook() bad arg";
	}

	if (book.length === 0) {
		return;
	}

	book.sort((a, b) => {					// Sort by key AND move to make deduplication possible.
		if (a.key < b.key) return -1;
		if (a.key > b.key) return 1;
		if (a.move < b.move) return -1;
		if (a.move > b.move) return 1;
		return 0;
	});

	// Now we deduplicate the book in place... (algorithm relies on length >= 1)

	let i = 0;			// Slow index
	let j = 1;			// Fast index

	while (true) {

		if (j >= book.length) {
			book.length = i + 1;
			break;
		}

		if (book[i].key === book[j].key && book[i].move === book[j].move) {

			book[i].weight++;
			j++;

		} else {

			book[i + 1] = book[j];
			i++;
			j++;

		}
	}
}

function BookAtLogicalIndex(book, i) {
	if (!book) throw "BookAtLogicalIndex() bad book";
	if (book instanceof Buffer) {
		return ParsePolyglotBlob(book, i * 16);
	}
	return book[i];
}

function BookLogicalLength(book) {
	if (!book) throw "BookLength() bad book";
	if (book instanceof Buffer) {
		return Math.floor(book.length / 16);
	}
	if (Array.isArray(book) === false) {
		return 0;
	}
	return book.length;
}

function BookProbe(key, book) {

	// book is either the raw buffer, of an array of objects of form {key, move, weight}

	let logical_length = BookLogicalLength(book);			// returns 0 on non-books

	if (!key || logical_length === 0) {
		return [];
	}

	let hit;
	let cur;

	let mid;
	let lowerbound = 0;
	let upperbound = logical_length - 1;

	while (true) {

		if (lowerbound > upperbound) {

			console.log("BookProbe(): lowerbound > upperbound");
			break;

		} else {

			mid = Math.floor((upperbound + lowerbound) / 2);		// If upper and lower are neighbours, mid is the left one.
			cur = BookAtLogicalIndex(book, mid);

			if (cur.key === key) {
				hit = cur;
				break;
			}

			if (lowerbound === upperbound) {
				break;
			}

			if (cur.key < key) {
				lowerbound = mid + 1;		// +1 is used here so the neighbours case does change lower.
			} else {
				upperbound = mid;			// In the neighbours case, upper becomes equal to lower. Can't do -1 or it would go to the left of lower.
			}
			continue;
		}
	}

	if (hit === undefined) {
		return [];
	}

	let ret = [hit];

	let left = mid;
	let right = mid;

	while (left > 0) {
		cur = BookAtLogicalIndex(book, left - 1);
		if (cur.key === key) {
			ret.unshift(cur);
			left--;
		} else {
			break;
		}
	}

	while (right < logical_length - 1) {
		cur = BookAtLogicalIndex(book, right + 1);
		if (cur.key === key) {
			ret.push(cur);
			right++;
		} else {
			break;
		}
	}

	return ret;
}

// For debugging...
function HubProbe() {
	let objects = BookProbe(KeyFromBoard(hub.tree.node.board), hub.book);
	let ret = [];
	for (let o of objects) {
		ret.push({
			hex: BigIntToHex(o.key),
			key: o.key,
			move: o.move,
			weight: o.weight,
		});
	}
	return ret;
}

function BigIntToHex(big) {
	let s = big.toString(16);
	while (s.length < 16) s = "0" + s;
	return s;
}

function BookStressTest() {

	// Given a randomly chosen singleton (position with 1 move),
	// does BookProbe() actually find it?

	if (!hub.book) return "Need hub to have a book!";

	let trials = 0;
	let successes = 0;
	let logical_length = BookLogicalLength(hub.book);

	for (let n = 0; n < 100000; n++) {

		let i = RandInt(1, logical_length - 1);

		let left_o = BookAtLogicalIndex(hub.book, i - 1);
		let mid_o = BookAtLogicalIndex(hub.book, i);
		let right_o = BookAtLogicalIndex(hub.book, i + 1);



		if (left_o.key === mid_o.key || right_o.key === mid_o.key) {
			continue;
		}
		trials++;
		let proberesults = BookProbe(mid_o.key, hub.book);
		if (proberesults.length === 1) {
			successes++;
		} else {
			console.log("Missed:", mid_o.key);
		}
	}

	return `${trials} trials, ${successes} successes, ${trials - successes} failures.`;
}


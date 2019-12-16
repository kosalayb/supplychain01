import Web3 from 'web3';
import AssetTracking from '../build/contracts/AssetTracking.json';

let web3;
let assetTracking;


const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};



const initContract = () => {
  const deploymentKey = Object.keys(AssetTracking.networks)[0];
  return new web3.eth.Contract(
    AssetTracking.abi, 
    AssetTracking
      .networks[deploymentKey]
      .address
  );
};




const initApp = () => {

  const $addColour = document.getElementById('addColour');
  const $data = document.getElementById('data');
  const $view = document.getElementById('view');
  const $viewState = document.getElementById('viewState');
  const $addAsset = document.getElementById('addAsset');
  const $transferAsset = document.getElementById('transferAsset');
  const $assetId = document.getElementById('assetId');
  const $traceTransfer= document.getElementById('traceTransfer');

  var firstAccount;


  web3.eth.getAccounts().then(e => { 
    firstAccount = e[0];
    //console.log(firstAccount);
  }) 


  $addAsset.addEventListener('submit', (e) =>{
    const id = e.target.elements[0].value;
    const tkid = e.target.elements[1].value;
    const des = e.target.elements[2].value;
    const manu = e.target.elements[3].value;
    const quan =  e.target.elements[4].value;
    assetTracking.methods
      .createAsset(id,tkid,des,manu,quan)
      .send({from: firstAccount})
  });



  $transferAsset.addEventListener('submit', (e) => {
    e.preventDefault();
    let tmp;
    let tmpId =  e.target.elements[0].value;
    let sendFrom = e.target.elements[1].value;
    let sendTo = e.target.elements[2].value;
    let tkid, des,manu,quan;

    assetTracking.getPastEvents(
      'AssetCreateEvent', 
      {
        fromBlock: 0,
        toBlock: 'latest'
      }, 
      function(error, events){ 
        console.log(events); 

        let len = events.length;
        for(let i=len-1; i>=0;i--){
          if(tmpId==events[i].returnValues['id']){
              tmp = events[i];
              tkid = tmp.returnValues['tokenId'];
              des = tmp.returnValues['description'];
              manu = tmp.returnValues['manufacturer'];
              quan = tmp.returnValues['quantity'];
              console.log("logging selected event is :"+tmp.returnValues[0]);
          }
        }

      }
    ).then (function(events){

      assetTracking.methods
        .transferAsset(tmpId,tkid,des,manu,quan,sendFrom,sendTo)
        .send({from: firstAccount});
      }

    );


  });


  $traceTransfer.addEventListener('submit', (e) => {
    e.preventDefault();
    assetTracking.getPastEvents(
      'AssetTransferEvent', 
      {
        fromBlock: 0,
        toBlock: 'latest'
      }, 
      function(error, events){ 
        console.log(events); 
      }
    )
    .then ( function(events)
            {
               let len = events.length;
               var str, tmp;
               for(let i=0; i<len;i++){

                  tmp = events[i].returnValues['id']+":"
                  +events[i].returnValues['tokenId']+":"
                  +events[i].returnValues['description']+":"
                  +events[i].returnValues['manufacturer']+":"
                  +events[i].returnValues['quantity']+":"
                  +events[i].returnValues['sendFrom']+":"
                  +events[i].returnValues['sendTo']+":";

                  if(tmp)
                  {
                    if(str)
                      str = str+tmp+"</br>";
                    else
                      str = tmp + "</br>";
                  }
               }

                $traceTransfer.innerHTML = str;
                
            }
      );

  });


  $viewState.addEventListener('submit', (e) => {
    e.preventDefault();
    assetTracking.getPastEvents(
      'AssetCreateEvent', 
      {
        fromBlock: 0,
        toBlock: 'latest'
      }, 
      function(error, events){ 
        console.log(events); 
      }
    )
    .then ( function(events)
            {
               let len = events.length;
               var str, tmp;
               for(let i=0; i<len;i++){
                  tmp = events[i].returnValues['id']+":"+events[i].returnValues['manufacturer']+":"+events[i].returnValues['description'];
                  if(tmp)
                  {
                    if(str)
                      str = str+tmp+"</br>";
                    else
                      str = tmp + "</br>";
                  }
               }
                $view.innerHTML = str;
            }
      );

  });


  // $transferAsset.addEventListener('submit', (e) =>{
  //   const id = e.target.elements[0].value;
  //   const sendTo = e.target.elements[1].value;
  //   assetTracking.methods
  //     .readAsset()

  //   assetTracking.methods
  //     .transferAsset(id,sendTo)
  //     .send({from: firstAccount})
  // });



  $addColour.addEventListener('submit', (e) => {
    const data = e.target.elements[0].value;
    assetTracking.methods
      .AddColour(data)
      .send({from: firstAccount})
      //       .then(result => {
      //   return colourChange.methods
      //     .GetColour()
      //     .call();
      // })
      // .then(result => {
      //   $data.innerHTML = result.join(', ');
      // }); 
  });

  //This is a working code
  // $viewState.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   assetTracking.getPastEvents(
  //     'ColourEvent', 
  //     {
  //       fromBlock: 0,
  //       toBlock: 'latest'
  //     }, 
  //     function(error, events){ 
  //       console.log(events); 
  //     }
  //   )
  //   .then ( function(events)
  //           {
  //              let len = events.length;
  //              var str, tmp;
  //              for(let i=0; i<len;i++){
  //                 tmp = events[i].returnValues['_from']+":"+events[i].returnValues['colour'];
  //                 if(tmp)
  //                 {
  //                   if(str)
  //                     str = str+tmp+" </br> ";
  //                   else
  //                     str = tmp + "</br>";
  //                 }
  //              }
  //               $view.innerHTML = str;
  //           }
  //     );

  // });



};




document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      assetTracking = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
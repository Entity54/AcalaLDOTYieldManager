import React,{useState,useEffect} from 'react';
 
import { 
  depositDOT, stakeDOT, unstakeDOT
} from '../../../../ntt54_accounts.js';     

import Nouislider from "nouislider-react";
import SnappingTOValues from "./SnappingToValues";


const UI2 = ({ currentAccount,
  acaBalance, ausdBalance, dotBalance, ldotBalance, str1Balance, amountToStake,
  scacaBalance, scausdBalance, scdotBalance, scldotBalance,
  getAllBalanceForAccount,
  userSCrecordedDOTBalance, userSCrecordedLDOTBalance,
  userSCrecordedACABalance, userSCrecordedAUSDBalance

}) => {
   
	const [strategy, setStrategy] = useState("ACA");
	const [frequency, setFrequency] = useState("10");
	const [sliderAUSDpercent, setSliderAUSDpercent] = useState("100");


  const sliderSetAUSDpercent = (sliderValue) => {
    console.log(`sliderValue: `,sliderValue);
    setSliderAUSDpercent(sliderValue)
  }

  const frequencyPicker = (numBlocks) => {
    console.log(`User picked frequency: ${numBlocks}`);
    setFrequency(numBlocks);
  }

  const claim = async () => {
    console.log(`STAKE DOT `);
    stakeDOT()
    .then(async (res) => {
      console.log(`We have just called stakeDOT  currentAccount:${currentAccount} res: `,res);
      await getAllBalanceForAccount(currentAccount);
    })
    .catch((er) => console.log(`Error in depositToStrategyForACA: `,er));
  }

  const stake = async () => {
    console.log(`STAKE DOT `);
    stakeDOT()
    .then(async (res) => {
      console.log(`We have just called stakeDOT  currentAccount:${currentAccount} res: `,res);
      await getAllBalanceForAccount(currentAccount);
    })
    .catch((er) => console.log(`Error in depositToStrategyForACA: `,er));
  }

  const deposit = async () => {
    console.log(`deposit `); 
    if (amountToStake!=="" && frequency!=="")
		{
        console.log(`Deposit DOT to strategy and get ACA`);
        depositDOT(amountToStake, sliderAUSDpercent)
        .then(async (res) => {
          console.log(`We have just called depositDOT:${amountToStake} sliderAUSDpercent:${sliderAUSDpercent} currentAccount:${currentAccount} res: `,res);
          await getAllBalanceForAccount(currentAccount);
        })
        .catch((er) => console.log(`Error in depositToStrategyForACA: `,er));
      
		}

  }


  const unstake = async () => {
    console.log(`UNSTAKE DOT `);
    unstakeDOT()
    .then(async (res) => {
      console.log(`We have just called unstakeDOT  currentAccount:${currentAccount} res: `,res);
      await getAllBalanceForAccount(currentAccount);
    })
    .catch((er) => console.log(`Error in depositToStrategyForACA: `,er));
  }



	return(
		<>
    {/* ----------------ADJUSTED FRONT END START------------------- */}

    <div style={{marginTop:"0px"}}>

        <div className="col-xl-12 col-lg-12 col-xxl-12 p-0 m-0">
          <div className="row p-0 m-0">
            <div className="col-xl-12 p-0 m-0">
              <div className="card p-0 m-0"style={{backgroundColor:"#0c0c0c"}}>
                <div className="card-body mb-4">
                  <div className="table-responsive recentOrderTable">
                  <table className="table verticle-middle table-hover">
                      <thead>
                        <tr style={{textAlign:"center", }}>
                          <th scope="col"style={{padding:"0px",color:"#6e757c"}}>STRATEGY<br />TOKENS</th>
                          <th scope="col"style={{fontSize:"14px",padding:"0px",color:"green"}}>LDOT<br />value</th>
                          <th scope="col"style={{fontSize:"14px",paddingTop:"0px", paddingBottom:"0px",color:"green", borderRight:"solid thin "}}>DOT<br />value</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>ACA</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>AUSD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{textAlign:"center"}}>
                          <td>{str1Balance}</td>
                          <td>{isNaN(userSCrecordedLDOTBalance)?"":userSCrecordedLDOTBalance}</td>
                          <td style={{borderRight:"solid thin "}}>{isNaN(userSCrecordedDOTBalance)? userSCrecordedDOTBalance : userSCrecordedDOTBalance}</td>
                          <td>{Number(userSCrecordedACABalance).toFixed(3)}</td>
                          <td>{Number(userSCrecordedAUSDBalance).toFixed(3)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-0" style={{marginTop:"-10px",backgroundColor:"#0c0c0c",color:"#9E38FF"}}>
          <div className="card-body mt-0 p-0">
            <div className="basic-form">
                <div className="form-group mb-0">
                  <div className="row" style={{ marginTop:"10px"}}>
                    <div className="col-xl-12 col-xxl-4 col-lg-6 col-sm-6 px-3">
                      <div className="row">
                        <h3 className="pt-3 mb-2 text-center"><span style={{color:"#6e757c"}}>Configure Your Yield</span></h3>
                        <div className="col-xl-4 col-xxl-4 col-lg-6 col-sm-6 px-3"></div>
                        <div className="col-xl-2 col-xxl-4 col-lg-6 col-sm-6 px-3">



{/* Slider Info Starts Here */}

                          <h3 className="pt-3 mb-2 text-center"><span style={{color:"white"}}>ACA</span></h3>
                        </div>
                        <div className="col-xl-2 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <h3 className="pt-3 mb-2 text-center"><span style={{color:"white"}}>{`${100-sliderAUSDpercent}`}%</span></h3>
                        </div>

                        <div className="col-xl-12 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <div className="card mb-0 mx-5">
                            <div className="card-body pb-0" style={{backgroundColor:"#0c0c0c"}}>
                              <div className="stepping-slider">
                                <div id="slider-step">
                                  <SnappingTOValues sliderSetAUSDpercent={sliderSetAUSDpercent} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-4 col-xxl-4 col-lg-6 col-sm-6 px-3"></div>
                        <div className="col-xl-2 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <h3 className="mb-2 text-center"><span style={{color:"white"}}>AUSD</span></h3>
                        </div>
                        <div className="col-xl-2 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <h3 className="mb-2 text-center"><span style={{color:"white"}}>{`${sliderAUSDpercent}`}%</span></h3>
                        </div>
                      </div>

{/* Slider Info Ends Here */}


                      <div className="row">
                        <h3 className="text-white text-center pt-5 mb-2"><span style={{color:"#6e757c"}}>Harvesting Frequency</span></h3>
                      </div>
                      <div className="row" style={{ marginTop:"10px"}}>
                        <div className="col-xl-12 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <div className="row">
                            <div className="card-body p-0">
                              <div className="basic-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <div className="form-group mb-4 fs-18 text-info text-center font-w500">
                                    <label className="radio-inline me-3">
                                      <input type="radio" name="optradio"  onClick = { () => frequencyPicker(5) } /> 120 Blocks
                                    </label>
                                    <label className="radio-inline me-3">
                                      <input type="radio" name="optradio" onClick = { () => frequencyPicker(10) } /> 240 Blocks
                                    </label>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-xl-1"></div>
          <div className="col-xl-10"  style={{marginTop:"10px"}}>
            <button type="button" className="btn btn-outline-primary btn-lg btn-block"style={{backgroundColor:"#0c0c0c"}} onClick = { () => deposit() } >DEPOSIT DOT</button> 
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-xl-1"></div>
          <div className="col-xl-10"  style={{marginTop:"10px"}}>
            <button type="button" className="btn btn-outline-primary btn-lg btn-block"style={{backgroundColor:"#0c0c0c"}} onClick = { () => stake() } >STAKE DOT</button> 
          </div>
        </div>
        
        <div className="row mt-2">
          <div className="col-xl-1"></div>
          <div className="col-xl-10"  style={{marginTop:"10px"}}>
            <button type="button" className="btn btn-outline-primary btn-lg btn-block"style={{backgroundColor:"#0c0c0c"}} onClick = { () => claim() } >CLAIM REWARDS</button> 
          </div>
        </div>

        {/* <div className="row mt-2">
          <div className="col-xl-1"></div>
          <div className="col-xl-10"  style={{marginTop:"10px"}}>
            <button type="button" className="btn btn-outline-primary btn-lg btn-block"style={{backgroundColor:"#0c0c0c"}} onClick = { () => unstake() } >UNSTAKE DOT</button> 
          </div>
        </div> */}



      </div>

    {/* ----------------ADJUSTED FRONT END START------------------- */}
		</>
	)
}
export default UI2;
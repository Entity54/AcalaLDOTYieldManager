import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";
/// Css 
import "./index.css";
import "./chart.css";
import "./step.css";
/// Layout
import Header from "./layouts/nav/Header";
import NAV_NavHade from "./layouts/nav/NavHader";
import NAV_SideBar from "./layouts/nav/SideBar";
import Footer from "./layouts/Footer";
import { ThemeContext } from "../context/ThemeContext";  
/// Dashboard
import DEX from "./components/Dashboard/DEX";
import Portofolio from "./components/Dashboard/Portofolio";


const Markup = ( { 
  currentAccount, provider, wallet, setupSpecs, portfolio, oracleData, blockHeader, evm_api_state, accountList, selectedAccountName,
  treasuryBalances, dotStakedBalance, rewardPerBlock, stakeEpochNumber,  stakeContractState, stakeContractACABalance,
  acaBalance, ausdBalance,  dotBalance, ldotBalance, str1Balance, 
  scacaBalance, scausdBalance, scdotBalance, scldotBalance,
  getAllBalanceForAccount,
  scAdmin, scFrequency, scState, dotLDOT, homaExchnageRate,
  scEpochNumber, scRegTotalDOT, scRegTotalLDOT, scExcessLDOT,
  scInitialDOTCapitaltoLDOT, scAmountAUSDtoSwaptoACA, scFreshAUSDrewards,
  scFreshACArewards, scTotal_STGausd, scTotal_STGaca, scTotalACAavailableBalance, scTotalAUSDavailableBalance,
  userSCrecordedDOTBalance, userSCrecordedLDOTBalance,
  userSCrecordedACABalance, userSCrecordedAUSDBalance,
}) => {

  const { menuToggle } = useContext(ThemeContext);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div id={`${!pagePath ? "main-wrapper" : ""}`} className={`${!pagePath ? "show" : "mh100vh"}  ${menuToggle ? "menu-toggle" : ""}`}>

        {!pagePath && <Header setupSpecs={setupSpecs} evm_api_state={evm_api_state} blockHeader={blockHeader} accountList={accountList} selectedAccountName={selectedAccountName}  />}
        {!pagePath && <NAV_NavHade blockHeader={blockHeader} />}
        {!pagePath && <NAV_SideBar />}

        <div className={`${!pagePath ? "content-body" : ""}`} style={{marginBottom:"-450px"}}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              <Route exact path='/'> 
                  <DEX  currentAccount={currentAccount} setupSpecs={setupSpecs} portfolio={portfolio} oracleData={oracleData} blockHeader={blockHeader} accountList={accountList} 
                        acaBalance={acaBalance}  ausdBalance={ausdBalance}  dotBalance={dotBalance} ldotBalance={ldotBalance}
                        str1Balance={str1Balance}  
                        scacaBalance={scacaBalance}  scausdBalance={scausdBalance}  scdotBalance={scdotBalance}  scldotBalance={scldotBalance}
                        getAllBalanceForAccount={getAllBalanceForAccount} dotLDOT={dotLDOT}
                        userSCrecordedDOTBalance={userSCrecordedDOTBalance} userSCrecordedLDOTBalance={userSCrecordedLDOTBalance}

                        userSCrecordedACABalance={userSCrecordedACABalance} userSCrecordedAUSDBalance={userSCrecordedAUSDBalance}
                        
                  /> 
              </Route>

              <Route exact path='/dex'> 
                  <DEX  currentAccount={currentAccount} setupSpecs={setupSpecs} portfolio={portfolio} oracleData={oracleData} blockHeader={blockHeader} accountList={accountList} 
                        acaBalance={acaBalance}  ausdBalance={ausdBalance}  dotBalance={dotBalance} ldotBalance={ldotBalance}
                        str1Balance={str1Balance}  
                        scacaBalance={scacaBalance}  scausdBalance={scausdBalance}  scdotBalance={scdotBalance}  scldotBalance={scldotBalance}
                        getAllBalanceForAccount={getAllBalanceForAccount} dotLDOT={dotLDOT}
                        userSCrecordedDOTBalance={userSCrecordedDOTBalance} userSCrecordedLDOTBalance={userSCrecordedLDOTBalance}
                        userSCrecordedACABalance={userSCrecordedACABalance} userSCrecordedAUSDBalance={userSCrecordedAUSDBalance}

                  /> 
              </Route>

              <Route exact path='/portofolio'> 
                  <Portofolio 
                        currentAccount={currentAccount} provider={provider} wallet={wallet} 
                        setupSpecs={setupSpecs} portfolio={portfolio} blockHeader={blockHeader} accountList={accountList}
                        treasuryBalances={treasuryBalances} dotStakedBalance={dotStakedBalance} rewardPerBlock={rewardPerBlock} stakeEpochNumber={stakeEpochNumber}
                        stakeContractState={stakeContractState} stakeContractACABalance={stakeContractACABalance}

                        scacaBalance={scacaBalance}  scausdBalance={scausdBalance}  scdotBalance={scdotBalance}  scldotBalance={scldotBalance}

                        getAllBalanceForAccount={getAllBalanceForAccount}

                        scAdmin={scAdmin} scFrequency={scFrequency} scState={scState} dotLDOT={dotLDOT} homaExchnageRate={homaExchnageRate}
                        scEpochNumber={scEpochNumber} scRegTotalDOT={scRegTotalDOT} scRegTotalLDOT={scRegTotalLDOT} scExcessLDOT={scExcessLDOT}
                        scInitialDOTCapitaltoLDOT={scInitialDOTCapitaltoLDOT} scAmountAUSDtoSwaptoACA={scAmountAUSDtoSwaptoACA} scFreshAUSDrewards={scFreshAUSDrewards}
                        scFreshACArewards={scFreshACArewards} scTotal_STGausd={scTotal_STGausd} scTotal_STGaca={scTotal_STGaca} scTotalACAavailableBalance={scTotalACAavailableBalance} scTotalAUSDavailableBalance={scTotalAUSDavailableBalance}
                  /> 
              </Route>

            </Switch> 
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
    </>
  );
};

export default Markup;

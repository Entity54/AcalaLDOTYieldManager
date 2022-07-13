import React,{useState,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import PageTitle from "../../layouts/PageTitle";
import {
	Row,
	Col,
	Card,
	Button,
	ButtonGroup,
	Dropdown,
	DropdownButton,
  } from "react-bootstrap";

import { ThemeContext } from "../../../context/ThemeContext";
// import QuickTransfer from '../Boltz/Home/ntt54_QuickTransfer';

import { 
	deposit_FeesToStrategy, startStrategy, stopStrategy, updateFrequency, getAccountDetailedInfo,
} from '../../../ntt54_accounts.js';         
 
const Portofolio = ({ 
	treasuryBalances, dotStakedBalance, rewardPerBlock, 
	stakeEpochNumber,  stakeContractState, stakeContractACABalance, getAllBalanceForAccount,
	scacaBalance, scausdBalance, scdotBalance, scldotBalance,

	scAdmin, scFrequency, scState, 	scEpochNumber,
	dotLDOT, homaExchnageRate, scRegTotalDOT, scRegTotalLDOT, scExcessLDOT,
	scInitialDOTCapitaltoLDOT, scAmountAUSDtoSwaptoACA, scFreshAUSDrewards,
	scFreshACArewards, scTotal_STGausd, scTotal_STGaca, scTotalACAavailableBalance, scTotalAUSDavailableBalance,

}) =>{
	const { background } = useContext(ThemeContext);
	const [newFrequency, setNewFrequency] = useState("");
	const [feesForStrategy, setFeesForStrategy] = useState("");

	const [accountIsRegistred, setAccountIsRegistred] = useState(false);
	const [registredAccount_balance_DOT, setRegistredAccount_balance_DOT] = useState("");
	const [registredAccount_balance_LDOT, setRegistredAccount_balance_LDOT] = useState("");
	const [registredAccount_balance_ACA, setRegistredAccount_balance_ACA] = useState("");
	const [registredAccount_balance_AUSD, setRegistredAccount_balance_AUSD] = useState("");
	const [accountStakedDOT, setAccountStakedDOT] = useState("");
	const [accountPercentAUSD, setAccountPercentAUSD] = useState("");
	const [accountSTGAUSD, setAccountSTGAUSD] = useState("");
	const [accountSTGACA, setAccountSTGACA] = useState("");


	const update_Frequency = async () => {
		console.log(`We will now updateFrequency Please wait... `);

		if (newFrequency!=="")
		{
			updateFrequency(newFrequency)
			.then((res) => {
				console.log(`We have just called update_Frequency for newFrequency: ${newFrequency} res: `,res);
			})
			.catch((er) => console.log(`Error in update_Frequency: `,er));
		}
	}  

	const getAccountRegisteredDetails = async () => {
		console.log(`We will now getAccountRegisteredDetails Please wait... `);
		getAccountDetailedInfo()
		.then((accountRegisteredDetails) => {
			console.log(`We have just called getAccountRegisteredDetails accountRegisteredDetails: `,accountRegisteredDetails);
			const {
				isRegistredAccount, registredAccount_DOT_balance, registredAccount_LDOT_balance, registredAccount_ACA_balance, registredAccount_AUSD_balance, 
				userStakedDOT, userPercentAUSD, userSTGausd, userSTGaca,
			} = accountRegisteredDetails;

			setAccountIsRegistred(isRegistredAccount); setRegistredAccount_balance_DOT(registredAccount_DOT_balance); setRegistredAccount_balance_LDOT(registredAccount_LDOT_balance); setRegistredAccount_balance_ACA(registredAccount_ACA_balance);
			setRegistredAccount_balance_AUSD(registredAccount_AUSD_balance); setAccountStakedDOT(userStakedDOT); setAccountPercentAUSD(userPercentAUSD); setAccountSTGAUSD(userSTGausd); setAccountSTGACA(userSTGaca);
		})
		.catch((er) => console.log(`Error in update_Frequency: `,er));
	}  

	const AprooveAndPaysFeeStrategy = async () => {
		console.log(`We will now AprooveAndPaysFeeStrategy Please wait... `);

		if (feesForStrategy!=="")
		{
			deposit_FeesToStrategy(feesForStrategy)
			.then((res) => {
				console.log(`We have just called deposit_FeesToStrategy for feesForStrategy: ${feesForStrategy} res: `,res);
			})
			.catch((er) => console.log(`Error in deposit_FeesToStrategy: `,er));
		}
	}  

	const start_Strategy = () => {
		startStrategy()
		.then((res) => {
			console.log(`We have just called start_Strategy res: `,res);
		})
		.catch((er) => console.log(`Error in start_Strategy: `,er));
	}


	const stop_Strategy = () => {
		stopStrategy()
		.then((res) => {
			console.log(`We have just called stop_Strategy res: `,res);
		})
		.catch((er) => console.log(`Error in stop_Strategy: `,er));
	}


	

	// useEffect(() => {
	// 	const updateData = async () => {

	// 		if (blockHeader)
	// 		{
	// 			const mod5 = Number(blockHeader.number) % 5 ;
	// 			// console.log(`DEX BLOCKHEADER#: ${blockHeader.number}  mod5:${mod5}`);
	// 			if (mod5===0)
	// 			{
	// 				const stakeDOTinfo = await getBasicInfo();
	// 				if (stakeDOTinfo)
	// 				{
	// 					const {ntt54_StakeDOT_admin, treasuryBalances, REWARD_PER_BLOCK, epochNumber, dot_StakedBalance} = stakeDOTinfo;
	// 					// console.log(`ntt54_StakeDOT_admin: ${ntt54_StakeDOT_admin} treasuryBalances:${treasuryBalances} REWARD_PER_BLOCK:${REWARD_PER_BLOCK} epochNumber:${epochNumber}`)
	// 					setTreasuryBalances(treasuryBalances); setRewardPerBlock(REWARD_PER_BLOCK); setStakeEpochNumber(epochNumber); setDotStakedBalance(dot_StakedBalance)
	// 				}
	
	// 			}
	// 		}

	// 	}
	// 	updateData();

	// }, [blockHeader]);


	return(
		<>
				<div className="col-xl-12" style={{marginTop:"-50px"}}>
					<div className="row"> 
					 
						<div className="col-xl-1"></div>
						<div className="col-xl-10 col-xxl-12" style={{backgroundColor:""}}>
							<br/>
							<Card style={{backgroundColor:"#0c0c0c", marginBottom:"-15px",backgroundColor:"", marginTop:"5px"}}>
								<Card.Body>
								<div className="custom-tab-1" >




								<div className="col-xl-12 col-lg-12 col-xxl-12 p-0 m-0">
            	<div className="card mb-0" style={{color:"#9E38FF", backgroundColor:"", marginTop:"-10px"}}>
              		<div className="card-body px-4 py-0">
					  	<div className="row">
							<div className="col-xl-6 col-lg-12 col-xxl-12 p-0 m-0"style={{backgroundColor:""}}>
								<Card className="mt-1 align-items-center pt-0 mb-3"style={{backgroundColor:""}}>
								
								<div className="form-head d-flex align-items-center flex-wrap mt-3 text-head">
									<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
										<input type="text" value = {feesForStrategy} placeholder="New Reward Per Epoch" className="form-control" style={{color:"white", width:"200px"}} onChange={(event) => {  
															setFeesForStrategy(event.target.value);
														}
														} />
									</Link>
									<Link to={"#"} className="btn btn-primary me-3 mb-2 py-2 px-3 rounded">
										<button className="btn-primary fs-14" style={{border: "none", width:"140px",color:"white"}}  onClick = { () =>  
											AprooveAndPaysFeeStrategy() 
											}>Approve & Pay Strategy ACA Fees</button> 
									</Link>
								</div>

								
								<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
									<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
										<input type="text" value = {newFrequency} placeholder="New Reward Per Epoch" className="form-control" style={{color:"white", width:"200px"}} onChange={(event) => { 
															setNewFrequency(event.target.value);
														}
														} />
									</Link>
									<Link to={"#"} className="btn btn-primary me-3 mb-2 py-2 px-3 rounded">
										<button className="btn-primary fs-14" style={{border: "none", width:"140px", color:"white"}}  onClick = { () => update_Frequency() }>Update Frequency</button> 
									</Link>
								</div>

								</Card>

							</div>
							<div className="col-xl-6 col-lg-12 col-xxl-12 p-0 m-0"style={{backgroundColor:""}}>
							<div className="row">

							<Col xl="2"></Col>
							<Col xl="8">
								<Card className="mt-3 mb-3"style={{backgroundColor:""}}>
									<Card.Header className=" d-block text-center pb-2">
										<Card.Title>Strategy Control</Card.Title>
											<Card.Text className="mb-0 subtitle">
												Start and Stop Strategies
											</Card.Text>
									</Card.Header>
									<Card.Body className="pb-2 mx-auto">
								

										<ButtonGroup className="mb-4 me-2">
											<Button variant="warning" onClick = { () => start_Strategy() }>Start</Button>
											<Button variant="info disabled">Strategy 1</Button>
											<Button variant="warning" onClick = { () => stop_Strategy() }>Stop</Button>
										</ButtonGroup>

									</Card.Body>
								</Card>
							</Col>
							
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-xl-12 col-xxl-8">

					<div className="card mb-0"style={{backgroundColor:"#202020"}}>
						<div className="card-header border-0 pt-3 pb-0 align-items-center">
							<h3 className="mb-0 text-center mx-auto">STRATEGY DOT FOR LDOT </h3>
						</div>

						<div className="card-body mb-0 pt-0">
						<div className="table-responsive recentOrderTable">
							<table className="table verticle-middle table-hover">
							<thead>
								<tr style={{textAlign:"center"}}>
									<th scope="col"style={{color:"#6e757c"}}>DOT/LDOT<br />RATE </th>                         
									<th scope="col"style={{color:"#6e757c"}}>ACA<br />BALANCES </th>                         
									<th scope="col"style={{color:"#6e757c"}}>DOT<br />BALANCES</th>
									<th scope="col"style={{color:"#6e757c"}}>LDOT<br />BALANCES</th>
									<th scope="col"style={{color:"#6e757c"}}>AUSD<br />BALANCES</th>
									<th scope="col"style={{color:"#6e757c"}}>EPOCH<br />NUMBER</th>
									<th scope="col"style={{color:"#6e757c"}}>CONTRACT<br />STATE</th>

									<th scope="col"style={{color:"#6e757c"}}>Rebalance<br />Frequency</th>
									<th scope="col"style={{color:"#6e757c"}}>Homa<br />Frequency</th>
									<th scope="col"style={{color:"#6e757c"}}>HOMA EXCHANGE<br />RATE</th>
									<th scope="col"style={{color:"#6e757c"}}>Admin<br /></th>
								</tr>
							</thead>
							<tbody>
								<tr style={{textAlign:"center"}}>
									<td>{dotLDOT}</td>
									<td>{scacaBalance}</td>
									<td>{scdotBalance}</td>
									<td>{scldotBalance}</td>
									<td>{scausdBalance}</td>
									<td>{scEpochNumber}</td>
									<td>{scState? "Active":"Stopped"}</td>     

									<td>{scFrequency}</td>
									<td>120</td>
									<td>{homaExchnageRate}</td>
									<td>{scAdmin}</td>
								</tr>
							</tbody>
							</table>
						</div>
						</div>

				</div>
			</div>
		</div>	


		<div className="row">
						<div className="col-xl-12 col-xxl-8">

							<div className="card mb-0"style={{backgroundColor:"#202020"}}>
									<div className="card-header border-0 pt-3 pb-0 align-items-center">
										<h3 className="mb-0 text-center mx-auto">STRATEGY KEY SMART CONTRACT STORED VALUES </h3>
									</div>

								<div className="card-body mb-0 pt-0">
								<div className="table-responsive recentOrderTable">
									<table className="table verticle-middle table-hover">
									<thead>
										<tr style={{textAlign:"center"}}>
											<th scope="col"style={{color:"#6e757c"}}>TOTAL DOT<br/>BALANCE</th>
											<th scope="col"style={{color:"#6e757c"}}>TOTAL LDOT<br/>BALANCE</th>
											<th scope="col"style={{color:"#6e757c"}}>EXCESS LDOT<br/>BALANCE</th>
											<th scope="col"style={{color:"#6e757c"}}>INITIAL DOT<br />TO LDOT</th>
											<th scope="col"style={{color:"#6e757c"}}>SWAP AUSD<br />FOR ACA</th>
											<th scope="col"style={{color:"#6e757c"}}>FRESH AUSD<br />REWARDS </th>  
											<th scope="col"style={{color:"#6e757c"}}>FRESH ACA<br />REWARDS </th>                         
											<th scope="col"style={{color:"#6e757c"}}>TOTAL STG<br/>AUSD</th>
											<th scope="col"style={{color:"#6e757c"}}>TOTAL STG<br/>ACA</th>
										</tr>
									</thead>
									<tbody>
										<tr style={{textAlign:"center"}}>
											<td>{scRegTotalDOT}</td>
											<td>{scRegTotalLDOT}</td>
											<td>{scExcessLDOT}</td>
											<td>{scInitialDOTCapitaltoLDOT}</td>
											<td>{scAmountAUSDtoSwaptoACA}</td>
											<td>{scFreshAUSDrewards}</td>
											<td>{scFreshACArewards}</td>
											<td>{scTotal_STGausd}</td>
											<td>{scTotal_STGaca}</td>
										</tr>
									</tbody>
									</table>
								</div>
								</div>

							</div>
						</div>
		</div>	



		<div className="row">
						<div className="col-xl-12 col-xxl-8">

							<div className="card mb-0"style={{backgroundColor:"#202020"}}>
								<div className="card-header border-0 pt-1 pb-0 align-items-center">
									<h3 className="mb-0 text-center mx-auto">MetaMask Account Smart Contract Registered Values </h3>
									<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
										<Link to={"#"} className="btn btn-primary me-3 mb-2 py-2 px-3 rounded">
											<button className="btn-primary fs-14" style={{border: "none", width:"140px", color:"white"}}  onClick = { () => getAccountRegisteredDetails() }>Update</button> 
										</Link>
									</div>
								</div>

								<div className="card-body mb-0 pt-0">
								<div className="table-responsive recentOrderTable">
									<table className="table verticle-middle table-hover">
									<thead>
										<tr style={{textAlign:"center"}}>
											<th scope="col"style={{color:"#6e757c"}}>Registered</th>
											<th scope="col"style={{color:"#6e757c"}}>DOT Balance </th>
											<th scope="col"style={{color:"#6e757c"}}>LDOT Balance </th>
											<th scope="col"style={{color:"#6e757c"}}>ACA Balance </th>
											<th scope="col"style={{color:"#6e757c"}}>AUSD Balance </th>
											<th scope="col"style={{color:"#6e757c"}}>Staked DOT</th>
											<th scope="col"style={{color:"#6e757c"}}>Percent AUSD</th>                         
											<th scope="col"style={{color:"#6e757c"}}>STG AUSD</th>
											<th scope="col"style={{color:"#6e757c"}}>STG ACA</th>
										</tr>
									</thead>
									<tbody>
										<tr style={{textAlign:"center"}}>
											<td>{`${accountIsRegistred}`}</td>
											<td>{registredAccount_balance_DOT}</td>
											<td>{registredAccount_balance_LDOT}</td>
											<td>{registredAccount_balance_ACA}</td>
											<td>{registredAccount_balance_AUSD}</td>
											<td>{accountStakedDOT}</td>
											<td>{accountPercentAUSD}%</td>
											<td>{accountSTGAUSD}</td>
											<td>{accountSTGACA}</td>
										</tr>
									</tbody>
									</table>
								</div>
								</div>

							</div>
						</div>
		</div>	



								</div>
								</Card.Body>
							</Card>
						</div>
					</div>
				</div>
		</>
	)
}
export default Portofolio; 
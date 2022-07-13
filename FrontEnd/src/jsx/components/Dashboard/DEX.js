import React,{useState,useContext, useEffect} from 'react';
import { ThemeContext } from "../../../context/ThemeContext";
import { Card,  Tab, Nav } from "react-bootstrap";

import EVMAcalaUI1 from '../Boltz/Home/ntt54_EVM_Acala_UI_1';
import EVMAcalaUI2 from '../Boltz/Home/ntt54_EVM_Acala_UI_2';
import DAN_EVMAcalaUI2 from '../Boltz/Home/DAN_ntt54_EVM_Acala_UI_2';



const DEX = ({ currentAccount, acaBalance, ausdBalance,  dotBalance, ldotBalance, str1Balance, 
			   getAllBalanceForAccount, dotLDOT,
  			   scacaBalance, scausdBalance, scdotBalance, scldotBalance,
			   userSCrecordedDOTBalance, userSCrecordedLDOTBalance,
			  userSCrecordedACABalance, userSCrecordedAUSDBalance
}) => {
	const { changeBackground, background } = useContext(ThemeContext);
    const [amountToStake , setAmountToStake]  = useState("");  

	const set_AmountToStake = (amount) => {
		setAmountToStake(amount);
	}
	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);


	return(
		<>

<div className="col-xl-12">
					<div className="row"> 

						{/* LEFT PART OF THE SCREEN START */}
						<div className="col-xl-3"></div>
						<div className="col-xl-3 col-xxl-12">
							<br/>
							<Card style={{backgroundColor:"#0c0c0c", marginBottom:"120px",  marginTop:"-20px"}}>
								<Card.Body>
								<div className="custom-tab-1" >
												<EVMAcalaUI1 
													dotBalance={dotBalance}
													set_AmountToStake={set_AmountToStake}
													dotLDOT={dotLDOT}
												/>
								</div>
								</Card.Body>
							</Card>
						</div>
						{/* LEFT PART OF THE SCREEN END */}


						{/* RIGHT PART OF THE SCREEN START */}
						{/* <div className="col-xl-3 col-xxl-12">
							<EVMAcalaUI2 
								acaBalance={acaBalance} ausdBalance={ausdBalance} dotBalance={dotBalance} ldotBalance={ldotBalance} str1Balance={str1Balance} amountToStake={amountToStake} 
								scacaBalance={scacaBalance}  scausdBalance={scausdBalance}  scdotBalance={scdotBalance}  scldotBalance={scldotBalance}
								getAllBalanceForAccount={getAllBalanceForAccount} currentAccount={currentAccount}
							/>
						</div> */}
						{/* RIGHT PART OF THE SCREEN END*/}

						{/* FAR RIGHT PART OF THE SCREEN START */}
						<div className="col-xl-3 col-xxl-12">
						<DAN_EVMAcalaUI2 
							acaBalance={acaBalance} ausdBalance={ausdBalance} dotBalance={dotBalance} ldotBalance={ldotBalance} str1Balance={str1Balance} amountToStake={amountToStake} 
							scacaBalance={scacaBalance}  scausdBalance={scausdBalance}  scdotBalance={scdotBalance}  scldotBalance={scldotBalance}
							getAllBalanceForAccount={getAllBalanceForAccount} currentAccount={currentAccount}
							userSCrecordedDOTBalance={userSCrecordedDOTBalance} userSCrecordedLDOTBalance={userSCrecordedLDOTBalance}
							userSCrecordedACABalance={userSCrecordedACABalance} userSCrecordedAUSDBalance={userSCrecordedAUSDBalance}

						/>
						</div>
						{/* RIGHT PART OF THE SCREEN END*/}
					</div>

				</div>
				
		</>
	)
}
export default DEX;
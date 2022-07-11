import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";


class SnappingTOValues extends React.Component {  

   constructor(props) {
      super(props);
      this.passValue = this.props.sliderSetAUSDpercent;
   }
   
   state = {
      color: "rgb(127, 127, 127)",
      textValue: null,
      percent: null,
      value: 0,
      disabled: false,
      range: {
         min: 0,
         max: 100,
      },
      ref: null,
   };
   onSkipSlide = (render, handle, value, un, percent) => {
      this.setState({
         skippingValue: percent[0],
      });
   };

   render() {
      return (
         <div className="" id="SnappingTOValues" style={{backgroundColor:""}}>
            <Nouislider
               start={0}
               snap
               range={{
                  min: [0],
                  "20%": 20,
                  "40%": 40,
                  "60%": 60,
                  "80%": 80,
                  max: [100],
               }}
               onSlide={this.onSkipSlide}
            />
            {this.state.skippingValue ? (
               <div>{
                  `${Math.floor(this.state.skippingValue)}%/${100-Math.floor(this.state.skippingValue)}%`
                  }
                  {
                    this.passValue(`${100-Math.floor(this.state.skippingValue)}`)
                  }
                  </div>
            ) : (
               <div> 0%/100%
                  {
                    this.passValue(`${100}`)
                  }
               </div>
            )}
         </div>
      );
   }
}

export default SnappingTOValues;

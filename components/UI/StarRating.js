import React from 'react';
import Srating from 'react-star-ratings';
import theme from '../../config/theme';

const StarRating = ({ rating, size, marginBottom="-5px" }) => {

  return <>
    <Srating
      starEmptyColor="#cbcad9" 
      starHoverColor={theme.colors.primaryColor}
      starRatedColor={theme.colors.secondaryColor}
      starDimension={size || "15px"}
      starSpacing="1px"
      rating={rating}
    />

    {/* STYLE */}
    <style jsx>{`
      :global(.star-container) {
        margin-bottom: ${marginBottom};
      }
    `}</style>
  </>
};

export default StarRating;

// m5.2 18.8l5.999999999999999 5.5-1.6999999999999993 7.699999999999999c-0.1999999999999993 1 0.1999999999999993 2 1 2.5 0.3000000000000007 0.29999999999999716 0.8000000000000007 0.5 1.3000000000000007 0.5 0.40000000000000036 0 0.6999999999999993 0 1-0.20000000000000284 0 0 0.1999999999999993 0 0.1999999999999993-0.10000000000000142l6.800000000000001-3.8999999999999986 6.900000000000002 3.8999999999999986s0.10000000000000142 0 0.10000000000000142 0.10000000000000142c0.8999999999999986 0.3999999999999986 1.8999999999999986 0.3999999999999986 2.5-0.10000000000000142 0.8999999999999986-0.5 1.1999999999999993-1.5 1-2.5l-1.6000000000000014-7.699999999999999c0.6000000000000014-0.5 1.6000000000000014-1.5 2.6000000000000014-2.5l3.200000000000003-2.8000000000000007 0.20000000000000284-0.1999999999999993c0.6000000000000014-0.6999999999999993 0.7999999999999972-1.6999999999999993 0.5-2.5s-1-1.5-2-1.6999999999999993h-0.20000000000000995l-7.800000000000001-0.8000000000000007-3.1999999999999993-7.199999999999997s0-0.09999999999999964-0.1999999999999993-0.09999999999999964c-0.10000000000000142-1.2000000000000002-1-1.7000000000000002-1.8000000000000007-1.7000000000000002s-1.6999999999999993 0.5-2.1999999999999993 1.2999999999999998c0 0 0 0.20000000000000018-0.10000000000000142 0.20000000000000018l-3.1999999999999993 7.199999999999999-7.8 0.8000000000000007h-0.20000000000000018c-0.7999999999999998 0.1999999999999993-1.7000000000000002 0.8000000000000007-2 1.6999999999999993-0.20000000000000018 1 0 2 0.7000000000000002 2.6000000000000014z




// import React from 'react';
// import theme from '../../config/theme';

// const StarRating = ({ onChange, value, color, checkedColor, hoverColor, canEdit, id = "id", size }) => {
//   /**
//    * GET CSS VALUES 
//    */
//   size = size || "1.1rem";
//   value = Math.round(value * 2) /2;
//   color = color || theme.colors.lightestText;
//   checkedColor = checkedColor || theme.colors.primaryColor;
//   hoverColor = hoverColor || theme.colors.secondaryColor;

//   /**
//    * HANDLE TATING CHANGE
//    */
//   const handleChange = ({ target: { value } }) => {
//     if (onChange) onChange(value/2);
//   }

//   /**
//    * STAR ITEM
//    */
//   const Star = ({ value: val }) => {

//     if (val == 1) return ( 
//       <>
//         <input type="radio" id={`${id}2`} name={id} value="2" defaultChecked={value === 1} />
//         <label className="first" htmlFor={`${id}2`} title="1 star"></label> 
//       </>
//     );

//     const radioVal = val * 2;
//     const nextVal = radioVal - 1;
//     const radioID = id + radioVal;
//     const nextID = id + nextVal;

//     return (
//       <>
//         <input type="radio" id={radioID} name={id} value={radioVal} defaultChecked={value === val} />
//         <label htmlFor={radioID} title={`${val} stars`}></label>

//         <input type="radio" id={nextID} name={id} value={nextVal} defaultChecked={value === (val - 0.5)} />
//         <label className="half" htmlFor={nextID} title={`${val - 1} 1/2 stars`}></label>
//       </>
//     );
//   };

//   // =======================================================================
//   //  UI
//   // =======================================================================
//   return (
//     <div>
//       <fieldset onChange={handleChange} className="rate">
//         <Star value={5} />
//         <Star value={4} />
//         <Star value={3} />
//         <Star value={2} />
//         <Star value={1} />
//       </fieldset>

//       { /* STYLE ======================================================================================= */}
//       <style jsx>{`
//         .rate {
//           display: inline-block; 
//           border: 0;
//           vertical-align: middle;
//           pointer-events: ${canEdit ? "auto" : "none"};
//         }

//         .rate > :global(input) { 
//           display: none;
//         }

//         .rate > :global(label) {
//           float: right;
//           color: ${color};
//         }

//         .rate > :global(label:before) {
//           display: inline-block;
//           font-size: ${size};
//           padding: 0 .2rem;
//           margin: 0;
//           cursor: pointer;
//           font-family: FontAwesome; 
//           content: "\f005";
//         }

//         .rate :global(.first:before) {
//           content: "\f005" !important;
//         }

//         .rate > :global(label:last-child:before) {
//           content: "\f006 ";
//         }
//         .rate :global(.half:before) {
//           content: "\f089 ";
//           position: absolute;
//           padding-right: 0;
//         }

//         .rate :global(input:checked ~ label),
//         .rate :global(label:hover), 
//         .rate :global(label:hover ~ label)
//         { color: ${checkedColor} !important;  }


//         .rate :global(input:checked + label:hover), 
//         .rate :global(input:checked ~ label:hover), 
//         .rate :global(input:checked ~ label:hover ~ label),
//         .rate :global(label:hover ~ input:checked ~ label)
//         { color: ${hoverColor} !important;  } 

//       `}</style>
//     </div>
//   );
// };


// export default StarRating;
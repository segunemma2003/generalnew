/* eslint-disable react/prop-types */
import React from "react";
import styles from "./FormComponent.module.css";
import { arrow, bitcoin } from "./assests";

const FormField = ({ label, labelId, selectName }) => {
  return (
    <div className="relative flex w-full">
      <label id={labelId} className={styles["form-label"]}>
        {label}
      </label>
      <input id={labelId} className={styles["form-input"]} onChange={(e)=>onChange(e.target.value)} />
      {
        selectName!=null && 
        <select 
        name={selectName} 
        className={styles["form-select"]}
        onChange={(e)=>onSelect(e.target.value)}
        >
        {
          selectName=="buycoin"?(<option value="KUT">
         
              KUT 
      
          </option>):(<>  <option value="ETH">
      
              ETH 

   
          </option>
          <option value="USDT">USDT</option>
          <option value="BSC">BSC</option>
          </>)
        }
        </select>
      }
      
    </div>
  );
};

export default FormField;

/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./FormComponent.module.css";
import FormField from "./FormField";
import { arrow } from "./assests";
import FormModal from "./FormModal";

const FormComponent = ({ 
  setPaymentCurrency,
  referralAddress,
  setAmount,
  onSubmitHandler
 }) => {
  return (
    <>
      <form className={styles["form"]}>
        <h2 className={styles["form-heading"]}>Buy KUT COIN </h2>
        <div className={styles["form-body"]}>
          {/* crypto to send */}
          <FormField
            label="You Buy"
            labelId="crypto-you-send"
            selectName="buycoin"
          />

          {/* crypto conversion details */}
          <div className="flex items-center justify-start w-full py-2">
            <div className={styles["form-conversion-detail"]}>
              <span className="text-black">Current Balance: 2 KUT</span>
              <span className="text-black">1 BTC = 45762.89 USDT</span>
            </div>
            <button className="mx-auto" aria-label="Switch crypto">
              <img
                src={arrow.src}
                aria-hidden="true"
                width={20}
                height={20}
              />
            </button>
          </div>

          {/* crypto to receive */}
          <FormField
            label="Total Cost"
            labelId="crypto-you-get"
            selectName="receive-crypto"
          />


<span className="mt-4">
<FormField
            label="Referral"
            labelId="refferal"

          />

</span>



          {/* exchange button */}
          <div
            className={`${styles.formButton} cursor-pointer`}
           
          >
            <button type="button"  onClick={onSubmitHandler}>Buy Coin</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormComponent;

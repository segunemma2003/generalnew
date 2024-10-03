import React, { useState, useEffect } from "react";
import { CHECK_WALLET_CONNECTED } from "../context/constants";
import { getReferralCode } from "../Utils/api";

const ReferralPopup = ({ setReferralPopup,  setLoader }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [referral, setReferral] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(referral).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
        });
    };

    useEffect(() =>  {
        if (referral == "") {
            setLoader(true);
            const getReferralCodes = async () => {
    
              try {
                const  address = await  CHECK_WALLET_CONNECTED();
                console.log("check");
                console.log(address);
                if(address){
                    const dat = {
                        "address":address
                    }
                  const data = await getReferralCode(dat);
                  if(!data){
                  setReferral("No refferal code yet")
                  }
                  console.log("refferal:", data['referral_code']); // Fetch settings data
                  setReferral(data['referral_code']); // Store settings in state 
                 }
                
                 setLoader(false);
              } catch (error) {
                console.log(error);
                setLoader(false);
                // notifyError("Failed to fetch settings.");
              }
        
              
            }
            getReferralCodes();
        }
       
      }, [referral]);

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-[#f9e79f] bg-opacity-80 p-10 rounded-lg shadow-lg w-1/2 relative z-50 backdrop-blur-md">
                <h2 className="mb-6 text-2xl font-semibold text-gold">Your Referral Code</h2>
                
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gold">
                        Referral Code
                    </label>
                    <input
                        type="text"
                        value={referral}
                        readOnly
                        className="w-full px-4 py-3 mt-1 bg-transparent border rounded border-gold text-gold"
                    />
                </div>

                <div className="mb-6">
                    <button
                        onClick={handleCopy}
                        className="px-6 py-3 font-semibold text-white rounded-lg bg-gold"
                    >
                        {isCopied ? "Copied!" : "Copy Referral Code"}
                    </button>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-6 py-3 text-white bg-gray-500 rounded-lg"
           
                        onClick={() => setReferralPopup(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReferralPopup;

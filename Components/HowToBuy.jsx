import React from "react";


const HowToBuy = ({setHowToBuy}) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70">
  <section className={`section relative`}>
    <div className={`sectionContainer`}>
      <div className={`contentContainer bg-[#fff] relative`}>
        {/* Cancel Button (X) */}
        <button
          className="absolute top-4 right-4 text-[#3B2621] font-bold text-2xl"
          onClick={()=>setHowToBuy(false)}  // Ensure this function closes the modal
        >
          &times;
        </button>

        <div>
          <h2 className="title text-center text-[#3B2621]">STEP 1</h2>
          <h3 className={`text mt-0 text-[1.2rem] text-[#3B2621]`}>
            Set Up Your Cosmic Wallet
          </h3>

          <p className="text mt-0 text-[1.2rem] text-[#3B2621]">
            Alright, fellow space travelers, let's kickstart this cosmic
            journey! Begin by crafting your digital cosmos with a Metamask or
            Trust wallet. Zoom over to Metamask.io, hit that download button
            like a meteor hurtling through space, and add the Metamask
            extension to your browser. Follow the celestial steps to create
            your wallet. Guard your private key as if it's the rarest gem in
            the universe – it's what keeps your MoonBag securely tethered to
            your cosmic exploration!
          </p>
        </div>
      </div>
    </div>
  </section>
</div>


  );
};

export default HowToBuy;

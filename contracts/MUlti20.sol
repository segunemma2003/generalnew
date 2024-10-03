// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function symbol() external view returns (string memory);

    function totalSupply() external view returns (uint256);

    function name() external view returns (string memory);
}

contract TokenICO {
    address public owner;
    address public tokenAddress;
    uint256 public tokenSalePrice;
    uint256 public soldTokens;
    uint256 public totalReferralsRewarded; // Total tokens rewarded for referrals
    uint256 public referralReward; // Reward for referral in tokens
    uint256 public totalSupply; // Total supply of tokens

    mapping(address => uint256) public referralEarnings; // Amount rewarded to each referrer
    mapping(address => bool) public hasBeenRewarded; // Track if the referrer has been rewarded
    mapping(address => bool) public acceptedTokens;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only  contract owner can perform this action"
        );
        _;
    }

    constructor(address _tokenAddress, uint256 _totalSupply) {
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        totalSupply = _totalSupply;
        referralReward = 1000000000000000000000;
    }

    function updateToken(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
    }

    function updateTokenSalePrice(uint256 _tokenSalePrice) public onlyOwner {
        tokenSalePrice = _tokenSalePrice;
    }

    function updateReferralReward(uint256 _referralReward) public onlyOwner {
        referralReward = _referralReward;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyToken(uint256 _tokenAmount, address referrer) public payable {
        require(
            msg.value == multiply(_tokenAmount, tokenSalePrice),
            "Insufficient Ether provided for the token purchase"
        );

        if (
            referrer != address(0) &&
            referrer != msg.sender &&
            !hasBeenRewarded[referrer]
        ) {
            require(
                totalReferralsRewarded + referralReward <=
                    (totalSupply * 5) / 100,
                "Referral reward limit reached"
            );

            // Reward the referrer
            ERC20 token = ERC20(tokenAddress);
            require(
                token.balanceOf(address(this)) >= referralReward,
                "Not enough tokens for referral reward"
            );
            require(
                token.transfer(referrer, referralReward),
                "Referral reward transfer failed"
            );

            // Mark referrer as rewarded
            hasBeenRewarded[referrer] = true;
            totalReferralsRewarded += referralReward;
        }

        ERC20 tokenToSell = ERC20(tokenAddress);
        require(
            _tokenAmount <= tokenToSell.balanceOf(address(this)),
            "Not enough token left for sale"
        );

        require(tokenToSell.transfer(msg.sender, _tokenAmount * 1e18));

        payable(owner).transfer(msg.value);
        soldTokens += _tokenAmount;
    }

    function buyTokenWithERC20(
        uint256 _tokenAmount,
        address referrer,
        address paymentToken
    ) public {
        require(
            acceptedTokens[paymentToken],
            "This token is not accepted for payment"
        );

        // Calculate the total cost in the payment token
        uint256 totalCost = multiply(_tokenAmount, tokenSalePrice);

        // Transfer payment from buyer to this contract
        ERC20 paymentTokenContract = ERC20(paymentToken);
        require(
            paymentTokenContract.transferFrom(
                msg.sender,
                address(this),
                totalCost
            ),
            "Payment transfer failed"
        );

        // Handle referral rewards if applicable
        if (
            referrer != address(0) &&
            referrer != msg.sender &&
            !hasBeenRewarded[referrer]
        ) {
            require(
                totalReferralsRewarded + referralReward <=
                    (totalSupply * 5) / 100,
                "Referral reward limit reached"
            );

            // Reward the referrer
            ERC20 token = ERC20(tokenAddress);
            require(
                token.balanceOf(address(this)) >= referralReward,
                "Not enough tokens for referral reward"
            );
            require(
                token.transfer(referrer, referralReward),
                "Referral reward transfer failed"
            );

            // Mark referrer as rewarded
            hasBeenRewarded[referrer] = true;
            totalReferralsRewarded += referralReward;
        }

        // Ensure enough tokens are available for sale
        ERC20 tokenToSell = ERC20(tokenAddress);
        require(
            _tokenAmount <= tokenToSell.balanceOf(address(this)),
            "Not enough tokens left for sale"
        );

        // Transfer tokens to the buyer
        require(
            tokenToSell.transfer(msg.sender, _tokenAmount * 1e18),
            "Token transfer failed"
        );

        soldTokens += _tokenAmount;
    }

    function addAcceptedToken(address _token) public onlyOwner {
        acceptedTokens[_token] = true;
    }

    function removeAcceptedToken(address _token) public onlyOwner {
        acceptedTokens[_token] = false;
    }

    function getTokenDetails()
        public
        view
        returns (
            string memory name,
            string memory symbol,
            uint256 balance,
            uint256 supply,
            uint256 tokenPrice,
            address tokenAddr
        )
    {
        ERC20 token = ERC20(tokenAddress);
        return (
            token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress
        );
    }

    function transferToOwner(uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");
        (bool success, ) = owner.call{value: _amount}("");
        require(success, "Transfer failed");
    }

    function transferEther(
        address payable _receiver,
        uint256 _amount
    ) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");
        (bool success, ) = _receiver.call{value: _amount}("");
        require(success, "Transfer failed");
    }

    function withdrawAllTokens() public onlyOwner {
        ERC20 token = ERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(token.transfer(owner, balance), "Transfer failed");
    }
}

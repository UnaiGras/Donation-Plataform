//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

pragma solidity ^0.8.17;

contract FastPlug {
    //Local Variables

    ERC20 public erc20;
    
    address public owner;

    
    //Mappings

    mapping(address => uint256) public proceeds;
    mapping(address => uint256) public donatedAmount;

    //Events
    event DonationSucces(address from, uint256 amount);
    event SuccessWithdraw(address from, uint256 number);

    //Constructor

    constructor(){
        owner = msg.sender;
        erc20 = ERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    }

    //Functions

    function donate(
        address from, 
        address to, 
        uint256 amount
    ) public {
        require(erc20.balanceOf(msg.sender) >= amount, 'Insuficient founds');
        require(to != address(0), 'Invalid address');
        erc20.transferFrom(from, address(this), amount);
        donatedAmount[from] += amount;
        proceeds[to] += amount;

        emit DonationSucces(from, amount);
    }

    function withdraw(uint32 number) public payable {
        require(number <= 100, '');
        _withdraw(number);

    }

    function _withdraw(uint32 number) public payable {
        require(number <= 100, '');
        uint256 maxWithdraw = proceeds[msg.sender];
        uint256 amountToWithdraw = (maxWithdraw / 100 * number);
        proceeds[msg.sender] -= amountToWithdraw;
        erc20.transferFrom(address(this), msg.sender, amountToWithdraw);

    }

    function whosOwner() public view returns(address) {
        return owner;
    }

    function whosErc20() public view returns(ERC20) {
        return erc20;
    }
}
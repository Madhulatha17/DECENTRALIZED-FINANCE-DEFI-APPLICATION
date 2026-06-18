pragma solidity ^0.8.20;

contract DeFiLending {

    struct User {
        uint256 balance;
        uint256 borrowed;
        uint256 lastUpdated;
    }

    mapping(address => User) public users;

    uint256 public baseInterestRate = 5; // 5% base

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        users[msg.sender].balance += msg.value;
    }

    function getInterestRate() public view returns (uint256) {
        if (address(this).balance > 10 ether) {
            return baseInterestRate + 2;
        } else {
            return baseInterestRate + 5;
        }
    }

    function borrow(uint256 amount) public {
        require(address(this).balance >= amount, "Not enough liquidity");

        users[msg.sender].borrowed += amount;
        payable(msg.sender).transfer(amount);

        users[msg.sender].lastUpdated = block.timestamp;
    }

    function repay() public payable {
        require(msg.value >= users[msg.sender].borrowed, "Insufficient repayment");

        users[msg.sender].borrowed = 0;
    }

    function getUser(address user) public view returns (uint256, uint256) {
        return (users[user].balance, users[user].borrowed);
    }
}

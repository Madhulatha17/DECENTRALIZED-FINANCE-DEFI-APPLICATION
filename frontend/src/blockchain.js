import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

export const ABI = [
  "function deposit() payable",
  "function borrow(uint256 amount)",
  "function repay() payable",
  "function getUser(address) view returns(uint256,uint256)",
  "function getInterestRate() view returns(uint256)"
];

export const getContract = (providerOrSigner) =>
  new ethers.Contract(CONTRACT_ADDRESS, ABI, providerOrSigner);

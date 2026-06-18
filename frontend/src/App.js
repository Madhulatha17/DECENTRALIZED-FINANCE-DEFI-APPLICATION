import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./blockchain";

function App() {
  const [amount, setAmount] = useState("");

  async function connectWallet() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function deposit() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    await contract.deposit({
      value: ethers.parseEther(amount)
    });
  }

  async function borrow() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    await contract.borrow(ethers.parseEther(amount));
  }

  return (
    <div>
      <h1>DeFi Lending & Borrowing DApp</h1>

      <button onClick={connectWallet}>Connect Wallet</button>

      <input
        placeholder="Amount in ETH"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={deposit}>Deposit</button>
      <button onClick={borrow}>Borrow</button>
    </div>
  );
}

export default App;

import { useState } from "react";
import { requestAccess, getAddress, signTransaction } from "@stellar/freighter-api";
import * as StellarSdk from "@stellar/stellar-sdk";
import "./App.css";

const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

function App() {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      await requestAccess();
      const result = await getAddress();
      const key = result.address;
      setPublicKey(key);
      fetchBalance(key);
    } catch (err) { alert("Error: " + err.message); }
  };

  const disconnectWallet = () => {
    setPublicKey("");
    setBalance("");
    setTxStatus("");
    setTxHash("");
  };

  const fetchBalance = async (key) => {
    try {
      const account = await server.loadAccount(key);
      const xlmBalance = account.balances.find((b) => b.asset_type === "native");
      setBalance(xlmBalance ? xlmBalance.balance : "0");
    } catch (err) { setBalance("Not funded yet"); }
  };

  const sendPayment = async () => {
    if (!destination || !amount) { alert("Enter destination and amount!"); return; }
    setLoading(true);
    setTxStatus("");
    setTxHash("");
    try {
      const sourceAccount = await server.loadAccount(publicKey);
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(StellarSdk.Operation.payment({
          destination: destination,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        }))
        .setTimeout(30)
        .build();

      const xdr = transaction.toXDR();
      const signed = await signTransaction(xdr, { networkPassphrase: StellarSdk.Networks.TESTNET });
      console.log("Freighter signed result:", JSON.stringify(signed));

      let signedXdr;
      if (typeof signed === "string") {
        signedXdr = signed;
      } else if (signed && signed.signedTxXdr) {
        signedXdr = signed.signedTxXdr;
      } else if (signed && signed.xdr) {
        signedXdr = signed.xdr;
      } else {
        throw new Error("Could not get signed XDR from Freighter");
      }

      const tx = StellarSdk.TransactionBuilder.fromXDR(signedXdr, StellarSdk.Networks.TESTNET);
      const txResult = await server.submitTransaction(tx);
      setTxHash(txResult.hash);
      setTxStatus("success");
      fetchBalance(publicKey);
    } catch (err) {
      setTxStatus("error");
      console.error("Payment error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Stellar Payment dApp</h1>
      <p className="subtitle">Testnet</p>
      {!publicKey ? (
        <button className="btn-connect" onClick={connectWallet}>
          Connect Freighter Wallet
        </button>
      ) : (
        <div className="wallet-section">
          <div className="card">
            <h2>Wallet Connected</h2>
            <p className="address">{publicKey.slice(0, 8)}...{publicKey.slice(-8)}</p>
            <p className="balance">{balance} XLM</p>
            <button className="btn-disconnect" onClick={disconnectWallet}>Disconnect</button>
          </div>
          <div className="card">
            <h2>Send XLM</h2>
            <input type="text" placeholder="Destination Address (G...)" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <input type="number" placeholder="Amount (XLM)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button className="btn-send" onClick={sendPayment} disabled={loading}>
              {loading ? "Sending..." : "Send XLM"}
            </button>
          </div>
          {txStatus === "success" && (
            <div className="card success">
              <h2>Transaction Successful!</h2>
              <p>Hash: {txHash.slice(0, 16)}...{txHash.slice(-8)}</p>
              <a href={"https://stellar.expert/explorer/testnet/tx/" + txHash} target="_blank" rel="noreferrer">View on Explorer</a>
            </div>
          )}
          {txStatus === "error" && (
            <div className="card error">
              <h2>Transaction Failed</h2>
              <p>Check console for details.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
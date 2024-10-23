"use client";
import { useTonConnectUI, useTonWallet, useIsConnectionRestored } from "@tonconnect/ui-react";
import { useFormik } from "formik";
import { useState } from "react";
import { Form, Button  } from "react-bootstrap";

const transaction = (address, amount) => ({
  validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
  messages: [
    {
      address,
      amount,
    },
  ],
});

export default function Body() {
  const isConnectionRestored = useIsConnectionRestored();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [txInProgress, setTxInProgress] = useState(false);

  let content = '';
  switch(true) {
    case !isConnectionRestored:
      content = 'Loading...';
      break;
    case txInProgress:
      content = 'Tx in progress';
      break;
    case !!wallet:
      content = 'Send transaction';
      break;
      default:
        content = 'Connect Wallet';
        break;
  }

  const formik = useFormik({
    initialValues: {
      address: '',
      amount: '',
    },
    onSubmit: async (values) => {
      if (!wallet) {
        tonConnectUI.openModal();
      } else {
        setTxInProgress(true);
        try {
          await tonConnectUI.sendTransaction(transaction(values.address, values.amount));
        } catch (e) {
          console.error(e);
        }
        

        setTxInProgress(false);
      }
      
    }
  })

  return (
    <main>
      <div>
        <Form disabled={!isConnectionRestored || txInProgress} onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="address">Address</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Address"
              id="address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="amount">Amount</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter Amount"
              id="amount"
              name="amount"
              onChange={formik.handleChange}
              value={formik.values.amount}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">{content}</Button>
        </Form>
      </div>
    </main>
  );
}


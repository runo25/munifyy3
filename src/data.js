/**
 * Munify Central Data Store
 * Powered by src/data.json with reactive event triggers for live app state updates.
 */
import initialData from "./data.json";

// In-memory reactive mutable state
export const profileData = {
  ...initialData.profile
};

export const bankData = {
  // Primary EUR Account Details (Paysera LT, UAB)
  accountName: initialData.eurReceiving?.accountHolder || "Torbjoern Juhlin",
  eurAccountName: initialData.eurReceiving?.accountHolder || "Torbjoern Juhlin",
  recipient: initialData.eurReceiving?.recipient || initialData.eurReceiving?.accountHolder || "Torbjoern Juhlin",
  eurIban: initialData.eurReceiving?.iban || "LT763500010019118917",
  eurRoutingNumber: initialData.eurReceiving?.routingNumber || "EVIULT2V",
  eurBic: initialData.eurReceiving?.bicSwift || "EVIULT2VXXX",
  eurSwift: initialData.eurReceiving?.bicSwift || "EVIULT2VXXX",
  eurAccountType: initialData.eurReceiving?.accountType || "CHECKING",
  eurBankName: initialData.eurReceiving?.bankName || "Paysera LT, UAB",
  eurCurrency: "EUR",
  eurBankAddress: initialData.eurReceiving?.bankAddress || "Pilatés pr. 16, Vilnius, LT-04352, Lithuania",

  // Generic fallback aliases
  iban: initialData.eurReceiving?.iban || "LT763500010019118917",
  routingNumber: initialData.eurReceiving?.routingNumber || "EVIULT2V",
  wireRouting: initialData.eurReceiving?.routingNumber || "EVIULT2V",
  swiftCode: initialData.eurReceiving?.bicSwift || "EVIULT2VXXX",
  accountNumber: initialData.eurReceiving?.iban || "LT763500010019118917",
  bankName: initialData.eurReceiving?.bankName || "Paysera LT, UAB",
  bankAddress: initialData.eurReceiving?.bankAddress || "Pilatés pr. 16, Vilnius, LT-04352, Lithuania",
  address: initialData.eurReceiving?.bankAddress || "Pilatés pr. 16, Vilnius, LT-04352, Lithuania",
  country: "Lithuania",
  accountType: initialData.eurReceiving?.accountType || "CHECKING",
  currency: "EUR",

  // Secondary USD Receiving Details
  usdBankName: initialData.usdReceiving?.bankName || "Lead Bank",
  usdAccountName: initialData.usdReceiving?.accountHolder || "Torbjoern Juhlin",
  usdAccountNumber: initialData.usdReceiving?.accountNumber || "217677388684",
  usdRoutingNumber: initialData.usdReceiving?.routingNumber || "101019644",
  usdAccountType: initialData.usdReceiving?.accountType || "CHECKING",
  usdBankAddress: initialData.usdReceiving?.bankAddress || "1801 Main St., Kansas City, MO 64108",
  usdSwiftCode: initialData.usdReceiving?.bicSwift || "LEADUS49XXX"
};

export const usdcWallet = {
  ...initialData.usdcWallet
};

export const dashboardData = {
  balance: initialData.balance.displayAmount || "€0.50",
  totalBalanceRaw: initialData.balance.amount !== undefined ? initialData.balance.amount : 0.50,
  currency: initialData.balance.currency || "EUR",
  currencySymbol: initialData.balance.currencySymbol || "€",
  totalDisplay: initialData.balance.totalDisplay || "€0.50",
  sekDisplay: initialData.balance.sekDisplay || "SEK 0",
  gbpDisplay: initialData.balance.gbpDisplay || "£0",
  apy: initialData.balance.apy,
  onboarding: initialData.onboarding,
  dailyEarnings: initialData.dailyEarnings
};

export const cardData = {
  ...initialData.card
};

export const transactions = [
  ...initialData.transactions
];

// Transaction-specific notifications catalog (1+ notification per transaction)
export const notificationsData = [
  {
    id: "notif_refund_yesterday_ladislav",
    transactionId: "tx_yesterday_ladislav",
    title: "Return of Funds (Refund) Initiated",
    body: "Following compliance verification of incoming SEPA transfer TR-420918-LS (+€420.00 from LADISLAV SUNKOVSKY), a return of funds to the originating remitter account has been initiated. In accordance with interbank clearing and regulatory settlement procedures, please allow 60 to 90 calendar days from the initiation date for the refund to reflect in the sender's account.",
    time: "Today, 09:42",
    unread: true,
    actionRequired: false,
    type: "refund",
    badge: "60–90 Days Settlement",
    amount: "+€420"
  },
  {
    id: "notif_refund_yesterday_pall",
    transactionId: "tx_yesterday_pall",
    title: "Return of Funds (Refund) Initiated",
    body: "Following compliance verification of incoming SEPA transfer TR-850124-PH (+€850.00 from PALL HEIMIR PALSSON), a return of funds to the originating remitter account has been initiated. In accordance with interbank clearing and regulatory settlement procedures, please allow 60 to 90 calendar days from the initiation date for the refund to reflect in the sender's account.",
    time: "Today, 09:40",
    unread: true,
    actionRequired: false,
    type: "refund",
    badge: "60–90 Days Settlement",
    amount: "+€850"
  },
  {
    id: "notif_tx_yesterday_ladislav",
    transactionId: "tx_yesterday_ladislav",
    title: "Documentation Submitted — Verification Processing",
    body: "Supporting compliance documentation for incoming transfer TR-420918-LS (+€420.00 from LADISLAV SUNKOVSKY) has been received and logged. AML & Compliance verification is currently being processed.",
    time: "Yesterday, 14:12",
    unread: false,
    actionRequired: false,
    type: "verification",
    badge: "Verification Processing",
    amount: "+€420"
  },
  {
    id: "notif_tx_yesterday_pall",
    transactionId: "tx_yesterday_pall",
    title: "Documentation Submitted — Verification Processing",
    body: "Supporting compliance documentation for incoming transfer TR-850124-PH (+€850.00 from PALL HEIMIR PALSSON) has been received and logged. AML & Compliance verification is currently being processed.",
    time: "Yesterday, 13:50",
    unread: false,
    actionRequired: false,
    type: "verification",
    badge: "Verification Processing",
    amount: "+€850"
  },
  {
    id: "notif_tx_yesterday_alvaro_1",
    transactionId: "tx_yesterday_alvaro_1",
    title: "Payment Sent",
    body: "You sent a payment of -€30.00 to Alvaro Padilla Llamas.",
    time: "Yesterday, 11:15",
    unread: false,
    actionRequired: false,
    type: "payment",
    amount: "-€30"
  },
  {
    id: "notif_tx_yesterday_danish",
    transactionId: "tx_yesterday_danish",
    title: "Transfer Received",
    body: "Incoming transfer of +€30.00 from DANISH SHAIKH via SEPA Instant was credited.",
    time: "Yesterday, 10:45",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "+€30"
  },
  {
    id: "notif_tx_yesterday_alvaro_2",
    transactionId: "tx_yesterday_alvaro_2",
    title: "Payment Sent",
    body: "You sent a payment of -€420.00 to Alvaro Padilla Llamas.",
    time: "Yesterday, 09:05",
    unread: false,
    actionRequired: false,
    type: "payment",
    amount: "-€420"
  },
  {
    id: "notif_tx_20261108_klarna",
    transactionId: "tx_20261108_klarna",
    title: "Direct Debit Processed",
    body: "SEPA Direct Debit of -€124.50 to Klarna Bank AB was completed.",
    time: "8 Nov, 14:20",
    unread: false,
    actionRequired: false,
    type: "payment",
    amount: "-€124.50"
  },
  {
    id: "notif_tx_20261106_apple",
    transactionId: "tx_20261106_apple",
    title: "Card Payment",
    body: "Card payment of -€16.99 to Apple Services (iCloud & Media) was successful.",
    time: "6 Nov, 09:15",
    unread: false,
    actionRequired: false,
    type: "card",
    amount: "-€16.99"
  },
  {
    id: "notif_tx_20261104_lindberg",
    transactionId: "tx_20261104_lindberg",
    title: "Transfer Received",
    body: "Incoming transfer of +€85.00 from JOHAN LINDBERG was credited.",
    time: "4 Nov, 20:45",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "+€85.00"
  },
  {
    id: "notif_tx_20261102_ica",
    transactionId: "tx_20261102_ica",
    title: "Card Payment",
    body: "Contactless payment of -€64.30 at ICA Kvantum Supermarket authorized.",
    time: "2 Nov, 17:30",
    unread: false,
    actionRequired: false,
    type: "card",
    amount: "-€64.30"
  },
  {
    id: "notif_tx_20261101_spotify",
    transactionId: "tx_20261101_spotify",
    title: "Subscription Paid",
    body: "Subscription renewal of -€11.99 to Spotify AB was processed.",
    time: "1 Nov, 08:00",
    unread: false,
    actionRequired: false,
    type: "card",
    amount: "-€11.99"
  },
  {
    id: "notif_tx_20261013_1",
    transactionId: "tx_20261013_1",
    title: "USDC Withdrawal Sent",
    body: "Withdrawal of 380.00 USDC to 0x86..7ffd confirmed on Base network.",
    time: "13 Oct, 14:45",
    unread: false,
    actionRequired: false,
    type: "withdrawal",
    amount: "USDC -380.00"
  },
  {
    id: "notif_tx_20261013_2",
    transactionId: "tx_20261013_2",
    title: "USD Deposit Settled",
    body: "Deposit of $20.00 from MARCUS WOKOCHA credited to checking account.",
    time: "13 Oct, 13:15",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 20.00"
  },
  {
    id: "notif_tx_20261013_3",
    transactionId: "tx_20261013_3",
    title: "USD Deposit Settled",
    body: "Deposit of $60.00 from MARCUS WOKOCHA credited to checking account.",
    time: "13 Oct, 11:30",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 60.00"
  },
  {
    id: "notif_tx_20261013_4",
    transactionId: "tx_20261013_4",
    title: "USD Deposit Settled",
    body: "Deposit of $300.00 from MARCUS WOKOCHA credited to checking account.",
    time: "13 Oct, 09:05",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 300.00"
  },
  {
    id: "notif_tx_20261006_1",
    transactionId: "tx_20261006_1",
    title: "USDC Withdrawal Sent",
    body: "Withdrawal of 100.00 USDC confirmed on Base network.",
    time: "6 Oct, 16:20",
    unread: false,
    actionRequired: false,
    type: "withdrawal",
    amount: "USDC -100.00"
  },
  {
    id: "notif_tx_20261006_2",
    transactionId: "tx_20261006_2",
    title: "USD Deposit Settled",
    body: "Deposit of $100.79 from MARCUS WOKOCHA credited.",
    time: "6 Oct, 10:14",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 100.79"
  },
  {
    id: "notif_tx_20261005_1",
    transactionId: "tx_20261005_1",
    title: "USDC Withdrawal Sent",
    body: "Withdrawal of 250.92 USDC confirmed on Base network.",
    time: "5 Oct, 18:50",
    unread: false,
    actionRequired: false,
    type: "withdrawal",
    amount: "USDC -250.92"
  },
  {
    id: "notif_tx_20261005_2",
    transactionId: "tx_20261005_2",
    title: "USD Deposit Settled",
    body: "Deposit of $250.79 from MARCUS WOKOCHA credited.",
    time: "5 Oct, 12:08",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 250.79"
  },
  {
    id: "notif_tx_20261002_1",
    transactionId: "tx_20261002_1",
    title: "USDC Withdrawal Sent",
    body: "Withdrawal of 50.00 USDC confirmed on Base network.",
    time: "2 Oct, 15:30",
    unread: false,
    actionRequired: false,
    type: "withdrawal",
    amount: "USDC -50.00"
  },
  {
    id: "notif_tx_20261002_2",
    transactionId: "tx_20261002_2",
    title: "USD Deposit Settled",
    body: "Deposit of $50.00 from MARCUS WOKOCHA credited.",
    time: "2 Oct, 11:22",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 50.00"
  },
  {
    id: "notif_tx_20261001_1",
    transactionId: "tx_20261001_1",
    title: "USDC Withdrawal Sent",
    body: "Withdrawal of 215.00 USDC confirmed on Base network.",
    time: "1 Oct, 17:12",
    unread: false,
    actionRequired: false,
    type: "withdrawal",
    amount: "USDC -215.00"
  },
  {
    id: "notif_tx_20261001_2",
    transactionId: "tx_20261001_2",
    title: "USD Deposit Settled",
    body: "Deposit of $215.42 from DANDELION PAYMEN credited.",
    time: "1 Oct, 13:45",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 215.42"
  },
  {
    id: "notif_tx_20260929_1",
    transactionId: "tx_20260929_1",
    title: "USDC Withdrawal Sent",
    body: "Withdrawal of 66.79 USDC confirmed on Base network.",
    time: "29 Sep, 19:00",
    unread: false,
    actionRequired: false,
    type: "withdrawal",
    amount: "USDC -66.79"
  },
  {
    id: "notif_tx_20260929_2",
    transactionId: "tx_20260929_2",
    title: "USD Deposit Settled",
    body: "Deposit of $66.89 from SABRINA KOZOROSKI credited.",
    time: "29 Sep, 14:10",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 66.89"
  },
  {
    id: "notif_tx_20260928_1",
    transactionId: "tx_20260928_1",
    title: "USDC Withdrawal Sent",
    body: "Withdrawal of 39.17 USDC confirmed on Base network.",
    time: "28 Sep, 20:40",
    unread: false,
    actionRequired: false,
    type: "withdrawal",
    amount: "USDC -39.17"
  },
  {
    id: "notif_tx_20260928_2",
    transactionId: "tx_20260928_2",
    title: "USD Deposit Settled",
    body: "Deposit of $37.06 from MARCUS WOKOCHA credited.",
    time: "28 Sep, 09:18",
    unread: false,
    actionRequired: false,
    type: "deposit",
    amount: "USD 37.06"
  }
];

export const availableNotificationsCatalog = {
  lead_bank: {
    id: "notif_lead_bank",
    title: "Checking Account Ready",
    body: "Your Lead Bank USD checking account is active and ready for transfers."
  },
  usdc_out: {
    id: "notif_usdc_out",
    title: "USDC Withdrawal Sent",
    body: "380.00 USDC has been broadcast to Base network."
  },
  card_issued: {
    id: "notif_card_issued",
    title: "Virtual Card Issued",
    body: "Your Munify USD Virtual Visa is ready to spend globally."
  }
};

// Dispatch helper functions for Admin Panel & Modals
export function dispatchNotification(id) {
  const item = availableNotificationsCatalog[id];
  if (!item) return;
  const existing = notificationsData.find((n) => n.id === item.id);
  if (!existing) {
    notificationsData.unshift({
      ...item,
      time: "Just now",
      unread: true
    });
  }
  window.dispatchEvent(new CustomEvent("munify_notifications_updated"));
}

export function removeNotification(id) {
  const index = notificationsData.findIndex((n) => n.id === id);
  if (index !== -1) {
    notificationsData.splice(index, 1);
    window.dispatchEvent(new CustomEvent("munify_notifications_updated"));
  }
}

export function markNotificationAsRead(id) {
  const item = notificationsData.find((n) => n.id === id);
  if (item) {
    item.unread = false;
    window.dispatchEvent(new CustomEvent("munify_notifications_updated"));
  }
}

export function setTransactionStatus(txId, status) {
  const tx = transactions.find((t) => t.id === txId);
  if (tx) {
    tx.status = status;
    window.dispatchEvent(new CustomEvent("munify_transaction_updated"));
  }
}

export function submitTransactionVerification(txId, verificationPayload) {
  const tx = transactions.find((t) => t.id === txId);
  if (tx) {
    tx.verificationSubmitted = true;
    tx.verificationData = verificationPayload;
    tx.status = "Verification Processing";
    tx.subtitle = "Docs Submitted • Processing";
    tx.note = `${verificationPayload.purpose || "Compliance verification"} - Documentation Submitted`;
  }

  // Update notification
  const notif = notificationsData.find((n) => n.transactionId === txId && n.type !== "refund");
  if (notif) {
    notif.title = "Documentation Submitted — Verification Processing";
    notif.body = `Supporting compliance documentation for ${tx ? tx.displayAmount : "funds"} from ${tx ? tx.counterparty : "sender"} has been received and logged. AML & Compliance verification is currently being processed.`;
    notif.actionRequired = false;
    notif.type = "verification";
    notif.badge = "Verification Processing";
  }

  window.dispatchEvent(new CustomEvent("munify_transaction_updated"));
  window.dispatchEvent(new CustomEvent("munify_notifications_updated"));
  return true;
}

export function recalculateBalance() {
  // Calculates net EUR balance from settled transactions
  let eurTotal = 0;
  transactions.forEach((tx) => {
    if (tx.currency === "EUR" && !tx.isPending && tx.status !== "Pending") {
      if (tx.type === "Deposit" || tx.direction === "in") {
        eurTotal += Math.abs(tx.amount);
      } else if (tx.type === "Refund" || tx.type === "Withdrawal" || tx.direction === "out") {
        eurTotal -= Math.abs(tx.amount);
      }
    }
  });

  dashboardData.totalBalanceRaw = eurTotal;
  dashboardData.balance = `€${eurTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  window.dispatchEvent(new CustomEvent("munify_balance_updated"));
  return dashboardData.balance;
}

export function updateBalance(newAmount, currency = "€") {
  dashboardData.totalBalanceRaw = newAmount;
  dashboardData.currency = currency;
  dashboardData.balance = `${currency} ${newAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  window.dispatchEvent(new CustomEvent("munify_balance_updated"));
}

export function triggerCustomPush(title, message) {
  window.dispatchEvent(
    new CustomEvent("munify_push_received", {
      detail: { title, message }
    })
  );
}

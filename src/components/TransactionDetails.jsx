import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transactions, submitTransactionVerification } from "../data";
import {
  IconArrowUpRight,
  IconArrowDownLeft,
  IconCopy,
  IconClose,
  HourglassOverlay
} from "./Vectors";

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");

  const transaction = transactions.find((t) => t.id === id) || transactions[0];
  const isOutgoing =
    transaction.type === "Withdrawal" ||
    transaction.type === "Payment" ||
    transaction.direction === "out" ||
    (typeof transaction.amount === "number" && transaction.amount < 0);
  const isRefund =
    transaction.type === "Refund" || transaction.iconType === "refund";
  const isPending =
    transaction.status === "Pending" || transaction.isPending;
  const requiresInfo =
    transaction.requiresInfo ||
    isPending ||
    transaction.id === "tx_yesterday_ladislav" ||
    transaction.id === "tx_yesterday_pall";

  // Verification form state
  const [isSubmitted, setIsSubmitted] = useState(() => {
    return (
      transaction.verificationSubmitted ||
      localStorage.getItem(`munify_verify_${transaction.id}`) === "true"
    );
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purpose, setPurpose] = useState("Family Support (Ajutor Familiar)");
  const [relationship, setRelationship] = useState("Immediate Family Member (Spouse, Child, Parent, Sibling)");
  const [notes, setNotes] = useState("");
  const [documents, setDocuments] = useState({
    invoice: null,
    contract: null,
    agreement: null,
    receipt: null
  });

  useEffect(() => {
    // If navigated with hash #compliance-form-section, auto-scroll
    if (window.location.hash === "#compliance-form-section") {
      setTimeout(() => {
        document.getElementById("compliance-form-section")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied!`);
  };

  const handleShareReceipt = () => {
    const text = `Munify Transaction Receipt:\nType: ${transaction.type}\nAmount: ${transaction.displayAmount}\nCounterparty: ${transaction.counterparty || transaction.subtitle}\nDate: ${transaction.dateTime || transaction.date}\nStatus: ${transaction.status}\nReference: ${transaction.transactionId || transaction.id}`;
    if (navigator.share) {
      navigator.share({ title: "Munify Receipt", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      showToast("Receipt copied to clipboard!");
    }
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;
      setDocuments((prev) => ({
        ...prev,
        [field]: { name: file.name, size: sizeStr }
      }));
      showToast(`${file.name} attached!`);
    }
  };

  const removeDocument = (field) => {
    setDocuments((prev) => ({ ...prev, [field]: null }));
  };

  const handleAttachSamples = () => {
    const initials = transaction.initials || "DOC";
    const refCode = transaction.transactionId?.replace("TR-", "") || initials;
    setDocuments({
      invoice: { name: `Commercial_Invoice_${initials}-2026.pdf`, size: "1.4 MB" },
      contract: { name: `Service_Contract_${initials}_Agreement.pdf`, size: "2.1 MB" },
      agreement: { name: `Declaration_${initials}_Signed.pdf`, size: "1.8 MB" },
      receipt: { name: `SEPA_Transfer_Slip_${refCode}.png`, size: "620 KB" }
    });
    showToast("Sample documents attached!");
  };

  const handleSubmitVerification = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      localStorage.setItem(`munify_verify_${transaction.id}`, "true");
      submitTransactionVerification(transaction.id, {
        purpose,
        relationship,
        notes,
        documents
      });
      showToast("Verification & documents submitted successfully!");
    }, 700);
  };

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col pb-10 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
          <span className="text-[#16A34A]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 sticky top-0 bg-[#F4F5F8]/90 backdrop-blur-md z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-700 hover:text-gray-900 active:scale-95 transition"
          title="Back"
        >
          <IconClose className="w-5 h-5" color="#1F2937" />
        </button>

        <span className="text-sm font-bold text-gray-800">Transfer Details</span>

        <button
          onClick={handleShareReceipt}
          className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-700 hover:text-gray-900 active:scale-95 transition"
          title="Share Receipt"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 scrollbar-hide">
        {/* ACTION REQUIRED NOTICE BANNER FOR PENDING TRANSFER */}
        {requiresInfo && !isSubmitted && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 shadow-xs animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 text-base font-bold shadow-xs">
                ⚠️
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-bold text-amber-950">
                    Action Required: Information Requested
                  </h3>
                  <span className="text-[10px] font-black uppercase bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">
                    Action Needed
                  </span>
                </div>
                <p className="text-[12px] text-amber-900/90 mt-1 leading-snug">
                  This incoming transfer of <strong>{transaction.displayAmount}</strong> from <strong>{transaction.counterparty}</strong> is pending compliance review. Please submit the transaction purpose and supporting documents (Invoice, Contract, Agreement, or Receipt) below to release the funds.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("compliance-form-section")?.scrollIntoView({
                      behavior: "smooth"
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 underline mt-2 hover:text-amber-950 transition"
                >
                  <span>Provide Information & Upload Documents</span>
                  <span>↓</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBMITTED CONFIRMATION BANNER */}
        {requiresInfo && isSubmitted && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 shadow-xs animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center flex-shrink-0 text-base font-bold shadow-xs">
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-bold text-emerald-950">
                    Documents Submitted — Under Fast-Track Review
                  </h3>
                  <span className="text-[10px] font-black uppercase bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded">
                    Under Review
                  </span>
                </div>
                <p className="text-[12px] text-emerald-900/90 mt-1 leading-snug">
                  Your information and documentation have been received by the compliance desk. Clearance review is in progress (est. 15–30 minutes).
                </p>
                <span className="inline-block text-[11px] font-mono text-emerald-800 font-semibold mt-1.5">
                  Reference: #DOC-VERIFY-{transaction.transactionId?.replace("TR-", "") || transaction.id?.toUpperCase()}-EU
                </span>
              </div>
            </div>
          </div>
        )}

        {isRefund ? (
          /* Deposit Returned / Rejected View */
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold mb-3">
              <span>●</span>
              <span>Deposit Returned</span>
            </div>

            <h1 className="text-gray-900 text-[26px] font-black tracking-tight leading-tight mb-2 font-sans">
              Your deposit was returned
            </h1>

            <p className="text-gray-500 text-[13px] leading-relaxed mb-6 font-normal">
              {transaction.note ||
                "We were not able to process your deposit of 6,500.00 EUR and have returned it. Contact support in the app if you have questions."}
            </p>

            {/* Timeline Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
              <h3 className="text-gray-900 text-[15px] font-bold mb-4">
                Where your money is
              </h3>

              <div className="relative pl-1">
                <div className="flex items-start gap-3.5 relative z-10">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-gray-900 text-[14px] font-bold leading-snug">
                      Deposit returned
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5 font-medium">
                      {Math.abs(transaction.amount)} EUR
                    </div>
                  </div>
                </div>

                <div className="w-[2px] h-7 bg-gray-200 ml-[9px] my-1" />

                <div className="flex items-start gap-3.5 relative z-10">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  </div>
                  <div>
                    <div className="text-gray-900 text-[14px] font-bold leading-snug">
                      Back in your sending account
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5 font-medium">
                      SEPA Reversal Timeline
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3.5 mb-5 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Status</span>
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                  Rejected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Amount</span>
                <span className="font-bold text-gray-900">{transaction.displayAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Original Sender</span>
                <span className="font-semibold text-gray-900">{transaction.counterparty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Date</span>
                <span className="font-medium text-gray-700">{transaction.dateTime || transaction.date}</span>
              </div>
            </div>

            {/* Support CTA */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/chat")}
                className="w-full bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-[15px] py-3.5 rounded-full active:scale-[0.98] transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        ) : (
          /* Standard Transfer Details View */
          <div>
            {/* Status Pill */}
            <div className="flex items-center justify-center mb-2">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isPending
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-emerald-50 text-[#16A34A] border border-emerald-200"
                }`}
              >
                <span>●</span>
                <span>
                  {isSubmitted
                    ? "Under Compliance Review"
                    : isPending
                    ? "Pending Verification"
                    : "Completed"}
                </span>
              </div>
            </div>

            {/* Hero Amount */}
            <div className="text-center mb-6">
              <h1
                className={`text-[36px] font-black tracking-tight font-sans leading-none ${
                  isPending
                    ? "text-gray-600"
                    : isOutgoing
                    ? "text-[#DC2626]"
                    : "text-[#16A34A]"
                }`}
              >
                {transaction.displayAmount}
              </h1>
              <p className="text-gray-500 text-xs font-medium mt-2">
                {transaction.dateTime || transaction.date}
              </p>
            </div>

            {/* Transaction Metadata Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 mb-6">
              {/* Counterparty Row */}
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-500 font-medium">
                  {isOutgoing ? "Recipient" : "Sender"}
                </span>
                <span className="text-[14px] font-bold text-gray-900 tracking-tight">
                  {transaction.counterparty || "Munify User"}
                </span>
              </div>

              {/* Note / Subtitle */}
              {transaction.subtitle && (
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500 font-medium">Reference</span>
                  <span className="text-[13px] font-medium text-gray-700">
                    {transaction.subtitle}
                  </span>
                </div>
              )}

              {/* Payment Method / Channel */}
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-500 font-medium">Payment method</span>
                <span className="text-[13px] font-medium text-gray-900">
                  {transaction.channel || "SEPA Instant Transfer"}
                </span>
              </div>

              {/* Account */}
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-500 font-medium">Destination</span>
                <span className="text-[13px] font-medium text-gray-900">
                  {transaction.receivingAccount || "Payment account"}
                </span>
              </div>

              {/* Fee */}
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-500 font-medium">Fee</span>
                <span className="text-[13px] font-bold text-[#16A34A]">
                  Free (0.00 EUR)
                </span>
              </div>

              {/* Transaction ID */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
                <span className="text-[13px] text-gray-500 font-medium">Transaction ID</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-mono text-gray-800 tracking-tight font-medium">
                    {transaction.transactionId || transaction.id}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        transaction.transactionId || transaction.id,
                        "Transaction ID"
                      )
                    }
                    className="text-gray-400 hover:text-gray-700 p-1"
                    title="Copy Transaction ID"
                  >
                    <IconCopy className="w-3.5 h-3.5" color="#6B7280" />
                  </button>
                </div>
              </div>
            </div>

            {/* COMPLIANCE VERIFICATION & DOCUMENT UPLOAD SECTION */}
            {requiresInfo && (
              <div
                id="compliance-form-section"
                className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-sm mb-6 scroll-mt-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center flex-shrink-0">
                      !
                    </span>
                    <div>
                      <h2 className="text-[14px] font-bold text-gray-900">
                        Transfer Verification & Documentation
                      </h2>
                      <p className="text-[11px] text-gray-500 font-medium">
                        Required to release incoming transfer of {transaction.displayAmount}
                      </p>
                    </div>
                  </div>

                  {!isSubmitted && (
                    <button
                      type="button"
                      onClick={handleAttachSamples}
                      className="text-[11px] font-bold text-[#1E5BF8] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full transition flex items-center gap-1 flex-shrink-0"
                      title="Auto-attach sample documents to test fast"
                    >
                      <span>⚡ Sample Files</span>
                    </button>
                  )}
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmitVerification} className="space-y-4">
                    {/* FIELD 1: Purpose of Transaction */}
                    <div>
                      <label className="block text-[12px] font-bold text-gray-800 mb-1.5">
                        1. Purpose of Transaction <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-gray-900 focus:outline-none focus:border-[#1E5BF8] transition"
                      >
                        <option value="Family Support (Ajutor Familiar)">Family Support (Ajutor Familiar)</option>
                        <option value="Commercial Invoice / Business Services">Commercial Invoice / Business Services</option>
                        <option value="Contract / Service Fee">Contract / Service Fee</option>
                        <option value="Personal Gift / Living Expenses">Personal Gift / Living Expenses</option>
                        <option value="Loan Agreement Repayment">Loan Agreement Repayment</option>
                        <option value="Other">Other Purpose</option>
                      </select>
                    </div>

                    {/* FIELD 2: Relationship to Sender & Nature */}
                    <div>
                      <label className="block text-[12px] font-bold text-gray-800 mb-1.5">
                        2. Relationship to Sender <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-gray-900 focus:outline-none focus:border-[#1E5BF8] transition"
                      >
                        <option value="Immediate Family Member (Spouse, Child, Parent, Sibling)">Immediate Family Member (Spouse, Child, Parent, Sibling)</option>
                        <option value="Extended Relative / Family">Extended Relative / Family</option>
                        <option value="Business Partner / Client">Business Partner / Client</option>
                        <option value="Employer / Contractor">Employer / Contractor</option>
                        <option value="Friend / Acquaintance">Friend / Acquaintance</option>
                      </select>

                      <div className="mt-2">
                        <input
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Optional explanation notes for compliance officer..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-[12px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1E5BF8] transition"
                        />
                      </div>
                    </div>

                    {/* MULTIPLE DOCUMENT FIELDS: Invoice, Contract, Agreement, Receipt */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-[12px] font-bold text-gray-800">
                          3. Submit Supporting Documents <span className="text-gray-400 font-normal">(Attach files)</span>
                        </label>
                      </div>

                      <div className="space-y-2.5">
                        {/* Document 1: Invoice */}
                        <DocumentUploadSlot
                          id="upload-invoice"
                          label="Invoice"
                          description="Commercial invoice or billing statement"
                          doc={documents.invoice}
                          onFileChange={(e) => handleFileChange("invoice", e)}
                          onRemove={() => removeDocument("invoice")}
                        />

                        {/* Document 2: Contract */}
                        <DocumentUploadSlot
                          id="upload-contract"
                          label="Contract"
                          description="Signed work or service agreement"
                          doc={documents.contract}
                          onFileChange={(e) => handleFileChange("contract", e)}
                          onRemove={() => removeDocument("contract")}
                        />

                        {/* Document 3: Agreement */}
                        <DocumentUploadSlot
                          id="upload-agreement"
                          label="Agreement"
                          description="Family support, loan, or gift declaration"
                          doc={documents.agreement}
                          onFileChange={(e) => handleFileChange("agreement", e)}
                          onRemove={() => removeDocument("agreement")}
                        />

                        {/* Document 4: Receipt */}
                        <DocumentUploadSlot
                          id="upload-receipt"
                          label="Receipt"
                          description="Bank transfer confirmation slip or receipt"
                          doc={documents.receipt}
                          onFileChange={(e) => handleFileChange("receipt", e)}
                          onRemove={() => removeDocument("receipt")}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-[14px] py-3.5 rounded-full active:scale-[0.98] transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Documents...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Information & Documents</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                        <span className="text-[13px] font-bold text-emerald-950">
                          Documents Received & Queued for Fast-Track Review
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900 leading-relaxed">
                        Your transaction purpose and {Object.values(documents).filter(Boolean).length || 3} supporting documents have been submitted to compliance. Funds will be released once review is complete.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3.5 space-y-2 text-xs border border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Purpose:</span>
                        <span className="font-semibold text-gray-900">{purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Relationship:</span>
                        <span className="font-semibold text-gray-900">{relationship}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Review Status:</span>
                        <span className="font-semibold text-amber-600">Pending Clearance</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="w-full py-2 text-center text-xs font-bold text-[#1E5BF8] hover:underline transition"
                    >
                      Edit or Upload Additional Documents
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleShareReceipt}
                className="w-full bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-[15px] py-3.5 rounded-full active:scale-[0.98] transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Share Receipt</span>
              </button>

              <button
                onClick={() => navigate("/support")}
                className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-full active:scale-[0.98] transition"
              >
                Need Help with this Transfer?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DocumentUploadSlot({ id, label, description, doc, onFileChange, onRemove }) {
  return (
    <div className="border border-gray-200 rounded-xl p-3 bg-gray-50/60 hover:bg-white hover:border-gray-300 transition">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-xs ${
              doc ? "bg-emerald-100 text-[#16A34A]" : "bg-gray-200 text-gray-600"
            }`}
          >
            {doc ? "✓" : "📄"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-gray-900 truncate">
                {label}
              </span>
              {doc && (
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                  Attached
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 truncate">
              {doc ? `${doc.name} (${doc.size})` : description}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0">
          {doc ? (
            <button
              type="button"
              onClick={onRemove}
              className="text-xs text-red-500 hover:text-red-700 font-bold p-1 hover:bg-red-50 rounded-lg transition"
              title="Remove file"
            >
              ✕
            </button>
          ) : (
            <label
              htmlFor={id}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E5BF8] bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full cursor-pointer transition shadow-xs"
            >
              <span>+ Upload</span>
              <input
                id={id}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

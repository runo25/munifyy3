import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transactions, submitTransactionVerification } from "../data";
import { IconClose } from "./Vectors";

export default function ProvideInformation() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find target pending transaction or fallback to first pending
  const targetTx =
    transactions.find((t) => t.id === id) ||
    transactions.find((t) => t.isPending || t.status === "Pending") ||
    transactions[0];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    relationship: "Family Support (Immediate Family)",
    explanation: "Assistance with general living and travel expenses.",
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Save submission state
      try {
        localStorage.setItem(`munify_verify_${targetTx.id}`, "true");
        sessionStorage.setItem("munify_docs_submitted", "true");
      } catch (err) {
        // safe fallback
      }

      // Submit verification in data store
      submitTransactionVerification(targetTx.id, {
        purpose: formData.explanation,
        relationship: formData.relationship,
        documents: {
          invoice: formData.file ? { name: formData.file.name, size: "1.2 MB" } : null,
          contract: null,
          agreement: { name: "Declaration_Signed.pdf", size: "1.4 MB" },
          receipt: { name: "Bank_Receipt.png", size: "480 KB" }
        }
      });

      // Navigate back after animation
      setTimeout(() => {
        navigate(`/transaction/${targetTx.id}`);
      }, 2000);
    }, 1200);
  };

  if (success) {
    return (
      <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300 select-none">
        <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-5 shadow-md">
          <div className="w-12 h-12 rounded-full bg-[#16A34A] flex items-center justify-center text-white text-2xl font-black">
            ✓
          </div>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Documents Submitted</h2>
        <p className="text-gray-500 text-sm max-w-[300px] leading-relaxed">
          Thank you for providing the required documentation. Your funds of{" "}
          <strong className="text-gray-900">{targetTx.displayAmount}</strong> will be cleared upon review.
        </p>
      </div>
    );
  }

  return (
    <div className="app-screen bg-[#F4F5F8] text-gray-900 min-h-screen flex flex-col pb-24 select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/80 sticky top-0 bg-[#F4F5F8]/90 backdrop-blur-md z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-700 hover:text-gray-900 active:scale-95 transition"
        >
          <IconClose className="w-5 h-5" color="#1F2937" />
        </button>
        <h1 className="text-[16px] font-bold tracking-tight text-gray-900">Compliance Verification</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 scrollbar-hide">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 shadow-xs">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h2 className="text-sm font-bold text-amber-950 mb-1">Documentation Required</h2>
              <p className="text-amber-900/90 text-xs leading-relaxed">
                Please complete the form below to release your pending transfer of{" "}
                <strong className="text-amber-950">{targetTx.displayAmount}</strong> from{" "}
                <strong className="text-amber-950">{targetTx.counterparty}</strong>.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Relationship with Sender */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
            <label className="text-xs font-bold text-gray-800 tracking-tight block">
              1. Relationship with Sender ({targetTx.counterparty})
            </label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:border-[#1E5BF8] transition"
            >
              <option value="Family Support (Immediate Family)">Immediate Family Member</option>
              <option value="Extended Family Member">Extended Family Member</option>
              <option value="Business Client / Consultant">Business Client / Consultant</option>
              <option value="Friend / Personal Contact">Friend / Personal Contact</option>
              <option value="Other">Other Relationship</option>
            </select>
          </div>

          {/* Explanation of Transfer */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
            <label className="text-xs font-bold text-gray-800 tracking-tight block">
              2. Transaction Purpose & Description
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the nature of this transaction (e.g., family living expenses, gift, services)..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E5BF8] resize-none transition"
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
            />
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-800 tracking-tight">
                3. Supporting Document (Invoice, Agreement, or Receipt)
              </label>
              <button
                type="button"
                onClick={() => {
                  const fakeFile = new File(["dummy content"], `${targetTx.initials}_Declaration_Doc.pdf`, {
                    type: "application/pdf"
                  });
                  setFormData({ ...formData, file: fakeFile });
                }}
                className="text-[11px] font-bold text-[#1E5BF8] bg-blue-50 px-2 py-0.5 rounded-full hover:bg-blue-100 transition"
              >
                ⚡ Sample File
              </button>
            </div>

            <div className="border border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center gap-2 relative bg-gray-50/50 hover:bg-white hover:border-[#1E5BF8] transition cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
              />
              {formData.file ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-gray-900 max-w-[220px] truncate">
                    {formData.file.name}
                  </span>
                  <span className="text-[11px] text-gray-400">Tap to replace document</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-xl">📄</span>
                  <span className="text-xs font-bold text-gray-800">Tap to upload file</span>
                  <span className="text-[11px] text-gray-400">PDF, PNG, JPG up to 25 MB</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E5BF8] hover:bg-[#194fd6] text-white font-extrabold text-sm py-3.5 rounded-full active:scale-[0.98] transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Uploading & Verifying...</span>
              </>
            ) : (
              <span>Submit Information & Documents →</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

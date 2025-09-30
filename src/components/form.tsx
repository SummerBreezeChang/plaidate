"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface FormProps {
  onSuccessChange?: (success: boolean) => void;
}

export default function WaitlistForm({ onSuccessChange }: FormProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Single-step: submit when both fields valid
    if (!formData.name) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email || !isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const promise = new Promise((resolve, reject) => {
        const { name, email } = formData;

        fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname: name, email }),
        })
          .then((mailResponse) => {
            if (!mailResponse.ok) {
              if (mailResponse.status === 429) {
                reject("Rate limited");
              } else {
                reject("Email sending failed");
              }
              return null;
            }

            return fetch("/api/notion", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            });
          })
          .then((notionResponse) => {
            if (!notionResponse) return;

            if (!notionResponse.ok) {
              if (notionResponse.status === 429) {
                reject("Rate limited");
              } else {
                reject("Notion insertion failed");
              }
            } else {
              resolve({ name });
            }
          })
          .catch((error) => {
            reject(error);
          });
      });

      toast.promise(promise, {
        loading: "Getting you on the waitlist... 🚀",
        success: (data) => {
          setFormData({ email: "", name: "" });
          setSuccess(true);
          onSuccessChange?.(true);
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: [
                "#ff0000",
                "#00ff00",
                "#0000ff",
                "#ffff00",
                "#ff00ff",
                "#00ffff",
              ],
            });
          }, 100);
          return "Thank you for joining the waitlist 🎉";
        },
        error: (error) => {
          if (error === "Rate limited") {
            return "You're doing that too much. Please try again later";
          }
          if (error === "Email sending failed") {
            return "Failed to send email. Please try again 😢.";
          }
          if (error === "Notion insertion failed") {
            return "Failed to save your details. Please try again 😢.";
          }
          return "An error occurred. Please try again 😢.";
        },
      });

      promise.finally(() => {
        setLoading(false);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ email: "", name: "" });
    setSuccess(false);
    onSuccessChange?.(false);
  };

  return (
    <div className="w-full relative">
      {success ? (
        <motion.div
          className="p-6 flex justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={resetForm}
            className="bg-[#3D98D6] text-[#373737] px-6 py-2 rounded-[12] font-semibold hover:bg-[#3588c0] transition-all"
            type="button"
          >
            Join with another email
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-[#F9F9F9] border border-[#D8D8D8] rounded-lg p-6 w-full" style={{borderWidth: '1.09px', minWidth: '800px'}}>
            <div className="flex flex-col md:flex-row gap-4 items-center w-full">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="bg-white border-0 text-[#2E4F21] px-4 py-3 rounded-lg focus:outline-1 transition-all duration-300 focus:outline-offset-2 focus:outline-[#2E4F21] flex-1"
                style={{borderRadius: '8px'}}
                disabled={loading}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-white border-0 text-[#2E4F21] px-4 py-3 rounded-lg focus:outline-1 transition-all duration-300 focus:outline-offset-2 focus:outline-[#2E4F21] flex-1"
                style={{borderRadius: '8px'}}
                disabled={loading}
                required
              />
              <button
                type="submit"
                className="font-semibold bg-[#2E4F21] text-white px-6 py-3 rounded-lg hover:bg-[#27451c] transition-all disabled:opacity-50 whitespace-nowrap flex-shrink-0"
                style={{borderRadius: '8px'}}
                disabled={loading}
              >
                {loading ? "Joining..." : "Join Plaidate Waitlist"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

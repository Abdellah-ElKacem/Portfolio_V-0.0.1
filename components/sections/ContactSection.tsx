"use client";
import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { sendEmail } from "@/app/_email/send-email";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import SpinWord from "@/components/SpinWord";

export default function ContactSection() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    if (submitStatus.type === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const services_check = (service: string) => {
    return selectedService === service
      ? "border-foreground-title1 text-foreground-title1 underline"
      : "border-[#93A2A3] text-[#93A2A3]";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !message) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("service", selectedService || "");

      const result = await sendEmail(formData);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully!",
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setSelectedService(null);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full flex flex-col items-center scroll-mt-[80px]"
    >
      <div className="w-full relative max-w-[1536px] flex gap-2 justify-between p-6 pb-20">
        <div className="flex flex-col gap-2">
          <SplitText
            text="Let's Talk"
            className="text-6xl md:text-8xl lg:text-9xl font-medium font-ankish"
            splitType="words"
          />
          <SplitText
            text="Every great project begins with a conversation,"
            className="text-sm md:text-lg w-[80%]"
            splitType="words"
          />
        </div>
        <AnimatedContent direction="vertical" duration={0.9} delay={0.2}>
          <SpinWord
            text="✦"
            className="grid h-15 mt-10 place-items-center text-6xl md:text-8xl lg:text-9xl leading-none md:mr-40 lg:mr-60 text-foreground-title"
            duration={7}
          />
        </AnimatedContent>
      </div>
      <div className="bg-background4 w-full py-15 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-[1536px] flex flex-col gap-15 md:gap-25 p-6"
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-25">
            <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} ease="ease-out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.2}>
              <div className="flex flex-col">
                <h3 className="text-2xl md:text-4xl font-semibold">First name*</h3>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  required
                  className="bg-transparent text-foreground w-full h-[40px] outline-none text-sm"
                />
                <div className="h-px bg-foreground w-full" />
              </div>
            </AnimatedContent>
            <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} ease="ease-out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.3}>
              <div className="flex flex-col">
                <h3 className="text-2xl md:text-4xl font-semibold">Last name*</h3>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                  className="bg-transparent text-foreground w-full h-[40px] outline-none text-sm"
                />
                <div className="h-px bg-foreground w-full" />
              </div>
            </AnimatedContent>
            <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} ease="ease-out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.4}>
              <div className="flex flex-col">
                <h3 className="text-2xl md:text-4xl font-semibold">Email address*</h3>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-transparent text-foreground w-full h-[40px] outline-none text-sm"
                />
                <div className="h-px bg-foreground w-full" />
              </div>
            </AnimatedContent>
            <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} ease="ease-out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.5}>
              <div className="flex flex-col justify-between gap-4 md:gap-3 h-full">
                <h3 className="text-2xl md:text-4xl font-semibold ">Services</h3>
                <div className="flex gap-2 flex-wrap">
                  {["Web Design", "App Design", "Web Development", "logo Branding", "Other"].map((s) => (
                    <div
                      key={s}
                      onClick={() => setSelectedService(s)}
                      className={`p-[4px] px-3 border flex items-center justify-between rounded-lg text-sm w-fit cursor-pointer transition-all ${services_check(s)}`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContent>
          </div>
          <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} ease="ease-out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.6}>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl md:text-4xl font-semibold">Message</h3>
              <textarea
                ref={textareaRef}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                required
                className="bg-transparent text-foreground w-full min-h-[30px] outline-none text-sm resize-none overflow-hidden"
                style={{ height: "auto" }}
              />
              <div className="h-px bg-foreground w-full -mt-2" />
            </div>
          </AnimatedContent>
          {submitStatus.type && (
            <div
              className={` absolute -bottom-8 md:bottom-6 md:right-0 p-4 rounded-lg w-fit text-xs md:text-base ${
                submitStatus.type === "success"
                  ? "text-foreground-title1"
                  : "text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
          <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} ease="ease-out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.7}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex flex-row gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="bg-foreground-title1 text-background p-3 px-8 rounded-full text-sm font-medium underline">
                {isSubmitting ? "Sending..." : "Send Message"}
              </div>
              <div className="bg-foreground-title1 text-background p-3 rounded-full text-sm font-medium underline">
                <ArrowUpRight size={24} />
              </div>
            </button>
          </AnimatedContent>
        </form>
      </div>
    </section>
  );
}

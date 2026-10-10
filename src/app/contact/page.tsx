"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate inquiry dispatch
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    toast.success("Message sent! Our support team will respond shortly.");
    reset();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="tonal-blue" className="mb-3">
              We&apos;re Here To Help
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Get in Touch with MoveInBD
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Have questions about listing your apartment, booking shifting trucks, or resolving a mess dispute? Reach out anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Cards */}
            <div className="space-y-4">
              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Our Headquarters</h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      House 24, Road 11, Gulshan-2, Dhaka 1212, Bangladesh
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Phone Support</h4>
                    <p className="mt-1 text-xs text-slate-500">
                      +880 1700-000000 / +880 1900-000000
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Sat - Thu: 9 AM - 8 PM</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Email Support</h4>
                    <p className="mt-1 text-xs text-slate-500">support@moveinbd.com</p>
                    <p className="mt-0.5 text-xs text-slate-500">partnerships@moveinbd.com</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Form */}
            <Card className="lg:col-span-2 border-border p-6 sm:p-8">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-xl">Send Us a Direct Message</CardTitle>
                <CardDescription className="text-xs">
                  Fill out the form below and we will get back to you within 2 business hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      placeholder="Anisur Rahman"
                      isRequired
                      error={errors.name?.message}
                      {...register("name")}
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="anisur@example.com"
                      isRequired
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>

                  <Input
                    label="Subject"
                    placeholder="e.g. Inquiring about truck booking from Uttara"
                    isRequired
                    error={errors.subject?.message}
                    {...register("subject")}
                  />

                  <Textarea
                    label="Message"
                    rows={4}
                    placeholder="Describe your question, issue, or property detail..."
                    isRequired
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    loading={isSubmitting}
                    loadingText="Sending Message..."
                    rightIcon={<Send className="size-4" />}
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

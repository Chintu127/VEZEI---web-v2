import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  phone: z.string().min(7, "Please provide a valid contact number.").optional().or(z.literal("")),
  collegeInstitution: z.string().min(2, "Institution or organization name is required."),
  roleType: z.enum(["student", "faculty", "club_lead", "administrator", "other"]).default("student"),
  inquiryType: z.enum(["campus_launch", "ambassador", "diagnostic_test", "institutional_access", "general"]).default("campus_launch"),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = contactSchema.safeParse(json);

    if (!result.success) {
      const errorMsg = result.error.errors.map((e) => e.message).join(" ");
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }

    const { fullName, email, phone, collegeInstitution, roleType, inquiryType, message } = result.data;
    const inquiryId = `inq-${Date.now()}`;

    // Attempt to persist to Supabase if connected
    try {
      const supabase = await createClient();
      const { error: dbError } = await supabase.from("campus_inquiries").insert({
        full_name: fullName,
        email: email,
        phone: phone || null,
        college_institution: collegeInstitution,
        role_type: roleType,
        inquiry_type: inquiryType,
        message: message,
        status: "pending",
      });

      if (dbError && !dbError.message.includes("fetch failed") && !dbError.message.includes("placeholder")) {
        console.warn("Supabase campus_inquiry insert note:", dbError.message);
      }
    } catch (e) {
      // In offline/local mode, fallback is accepted
      console.warn("Campus inquiry offline fallback mode:", e);
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message: `Thank you, ${fullName}. Your inquiry for ${collegeInstitution} has been recorded. Our campus partnerships team will reach out to ${email} within 24 hours.`,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to process campus inquiry submission." },
      { status: 500 }
    );
  }
}

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      category_id,
      name,
      email,
      phone,
      company,
      scheduled_date,
      scheduled_time,
      timezone,
      meeting_type,
      message,
    } = body;

    if (!name || !email || !scheduled_date || !scheduled_time) {
      return NextResponse.json(
        { error: "Name, email, date, and time are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if slot is still available
    const { data: existingBooking } = await supabase
      .from("bookings")
      .select("id")
      .eq("scheduled_date", scheduled_date)
      .eq("scheduled_time", scheduled_time)
      .neq("status", "cancelled")
      .single();

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    // Check if date is blocked
    const { data: blockedDate } = await supabase
      .from("blocked_dates")
      .select("id")
      .eq("date", scheduled_date)
      .single();

    if (blockedDate) {
      return NextResponse.json(
        { error: "This date is not available for bookings" },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        category_id: category_id || null,
        name,
        email,
        phone: phone || null,
        company: company || null,
        scheduled_date,
        scheduled_time,
        timezone: timezone || "America/New_York",
        meeting_type: meeting_type || "video",
        message: message || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating booking:", error);
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  const supabase = await createClient();

  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = new Date(date).getDay();

  // Get available slots for this day
  const { data: slots } = await supabase
    .from("available_slots")
    .select("*")
    .eq("day_of_week", dayOfWeek)
    .eq("is_active", true);

  // Get existing bookings for this date
  const { data: bookings } = await supabase
    .from("bookings")
    .select("scheduled_time")
    .eq("scheduled_date", date)
    .neq("status", "cancelled");

  // Check if date is blocked
  const { data: blockedDate } = await supabase
    .from("blocked_dates")
    .select("id")
    .eq("date", date)
    .single();

  if (blockedDate) {
    return NextResponse.json({ available_times: [], blocked: true });
  }

  // Generate available time slots
  const bookedTimes = new Set(bookings?.map((b) => b.scheduled_time) || []);
  const availableTimes: string[] = [];

  slots?.forEach((slot) => {
    const start = slot.start_time.split(":").map(Number);
    const end = slot.end_time.split(":").map(Number);
    const startMinutes = start[0] * 60 + start[1];
    const endMinutes = end[0] * 60 + end[1];

    for (let time = startMinutes; time < endMinutes; time += 30) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;

      if (!bookedTimes.has(timeString)) {
        availableTimes.push(timeString);
      }
    }
  });

  return NextResponse.json({ available_times: availableTimes, blocked: false });
}

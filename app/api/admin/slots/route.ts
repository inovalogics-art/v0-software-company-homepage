import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session) return false;
  try {
    const data = JSON.parse(session.value);
    return data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function GET() {
  const supabase = createAdminClient();
  
  const [{ data: slots }, { data: blockedDates }] = await Promise.all([
    supabase.from("available_slots").select("*").order("day_of_week"),
    supabase.from("blocked_dates").select("*").order("date"),
  ]);

  return NextResponse.json({ slots, blockedDates });
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, ...data } = body;
  const supabase = createAdminClient();

  if (type === "slot") {
    const { data: slot, error } = await supabase
      .from("available_slots")
      .insert(data)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data: slot });
  } else if (type === "blocked_date") {
    const { data: blocked, error } = await supabase
      .from("blocked_dates")
      .insert(data)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data: blocked });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("available_slots")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const supabase = createAdminClient();

  const table = type === "blocked_date" ? "blocked_dates" : "available_slots";
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

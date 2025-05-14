import { NextResponse } from 'next/server';
import { updateTask } from '@/lib/mockDatabae';
import type { baseTask } from '@/components/types';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const updates: Partial<baseTask> = await request.json();
    const updatedTask = await updateTask(params.id, updates);
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
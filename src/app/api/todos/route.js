import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET(request) {
  const todos = await prisma.todos.findMany();

  console.log(todos)
  return NextResponse.json(todos)
}

export async function POST(request) {
  const {title, completed} = await request.json();
  const todo = await prisma.todos.create({
    data: {
      title: title,
      completed: completed,
    },
  });

  return NextResponse.json(todo);
}

export async function PUT(request) {
  const { id, title, completed } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const updatedTodo = await prisma.todos.update({
    where: { id: id },
    data: {
      title: title,
      completed: completed,
    },
  });

  return NextResponse.json(updatedTodo);
}

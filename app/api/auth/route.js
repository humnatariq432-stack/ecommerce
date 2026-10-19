import { connectDb } from "@/app/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { createToken } from "@/utilities"; // Apni utilities ki spelling check kar lein
import * as jose from "jose";

/**
 * Handles an incoming POST request, parses its JSON body, and returns a JSON response.
 *
 * @async
 * @function POST
 * @param {Request} incoming - The incoming HTTP POST request.
 * @returns {Promise<NextResponse>} A JSON response containing the name "ali".
 *
 * @example
 * // Response:
 * // {
 * //   "name": "ali"
 * // }
 */
export async function POST(incoming) {
  await connectDb();

  // user create krna
  let some = await incoming.json();

  if (some.type == "login") {
    let user = await User.findOne({
      email: some.email,
      password: some.password,
    });

    let token = await createToken({
      b1: user._id.toString(),
    });

    return NextResponse.json({ token, user });
  } else if (some.type == "signup") {
    let userExists = await User.findOne({ email: some.email });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists with this email!" },
        { status: 400 },
      );
    }
    let u1 = new User(some);
    await u1.save();
  } else if (some.type == "sessionCheckKaro") {
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

    const { payload, protectedHeader } = await jose.jwtVerify(
      some.key,
      secret,
      {
        issuer: "urn:example:issuer",
        audience: "urn:example:audience",
      },
    );

    let user = await User.findById(payload.b1);
    return NextResponse.json(user);
  }

  // CRUD
  // create, retrieve, update, delete

  // await User.findByIdAndDelete('6accb9a58197bd66fd2d96a9');
  // await User.findByIdAndUpdate('6accb9a58197bd66fd2d96a9', {$set:{city:"lahore"}});
  // await User.findById('6accb9a58197bd66fd2d96a9');

  return NextResponse.json({ token, user: u1 }, { status: 201 });
}

// DELETE and GET m kabhi senstive info nahi send krte hote

export async function GET(incoming) {
  await connectDb();

  let users = await User.find();

  return NextResponse.json(users);
}

export async function DELETE(incoming) {
  await connectDb();

  //http://localhost:3001/api/auth?city=fsd&uni=gc
  let a1 = incoming?.nextUrl?.searchParams.get("a1");
  await User.findByIdAndDelete(a1);

  return NextResponse.json({ success: true });
}

// 1) dlete a funtion bnega
// 2) user ki ID frontend se send krni h via query param
// 3) mongoo ka function use hoga findByIdAndDeleteWala

// REST API
// POST - data create
// PUT - update data
// DELETE - data delete  (data nahi jasakta)
// GET - data mgwana (data nahi jasakta)

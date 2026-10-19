import * as jose  from "jose";

export async function createToken(userKaData) {
  const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

  const alg = "HS256";

  const token = await new jose.SignJWT(userKaData)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .sign(secret);

  return token;
}
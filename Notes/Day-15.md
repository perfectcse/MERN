Day-15 — JWT Expiry Handling
     Topics:
• JWT payload decoding
• exp timestamp
• Base64 decoding
• Token validation on app load
• Auto logout implementation

Key concept:

payload = JSON.parse(atob(token.split(".")[1]))
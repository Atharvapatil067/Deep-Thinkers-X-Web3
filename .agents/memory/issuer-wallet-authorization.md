---
name: Issuer wallet authorization
description: Rules for matching MetaMask issuer accounts in the current CertiFlow demo.
---

Real injected wallet addresses must be compared case-insensitively against active issuer records; display-only placeholder strings cannot authorize a MetaMask account.

**Why:** The demo started with shortened fictional issuer addresses, so no real connected wallet could pass the authorization check.

**How to apply:** Keep the admin flow able to authorize the currently connected wallet, validate Ethereum addresses before saving them, and treat client-side authorization as demo-only until contract or server enforcement is added.
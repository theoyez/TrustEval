import hashlib
def sha256_hex(b: bytes) -> str: return hashlib.sha256(b).hexdigest()
def leaf(text: str) -> str: return sha256_hex(text.encode("utf-8"))
def merkle_root(chunks): 
    if not chunks: return None
    L = [leaf(c) for c in chunks]
    while len(L) > 1:
        if len(L) % 2 == 1: L.append(L[-1])
        L = [sha256_hex((L[i]+L[i+1]).encode("utf-8")) for i in range(0,len(L),2)]
    return L[0]

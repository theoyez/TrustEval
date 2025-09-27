import re, unicodedata
from difflib import SequenceMatcher

def normalise(s, strip_punct=True, case_fold=True, collapse_ws=True):
    if s is None: return ""
    s = unicodedata.normalize("NFKC", s)
    if case_fold: s = s.lower()
    if strip_punct: s = re.sub(r"[^\w\s:/.-]", "", s)
    if collapse_ws: s = re.sub(r"\s+", " ", s).strip()
    return s

def tokens(s):
    return [t for t in re.split(r"\W+", s) if t]

def jaccard(a, b):
    A, B = set(a), set(b)
    if not A and not B: return 1.0
    if not A or not B: return 0.0
    return len(A & B) / len(A | B)

def lev_norm(a, b):
    return SequenceMatcher(None, a, b).ratio()

export const validExample = `-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

This message was signed with the private key that is currently active
-----BEGIN PGP SIGNATURE-----

wsFzBAEBCAAGBQJhv+hxACEJEIrI00XF0ybzFiEEMIXRk1fOMC5FYBFnisjT
RcXTJvMrtxAAkDuJg3QvYOgK3Mqc6+4RPqmQz2CQe5rtgyltsOh1kqP7OuXb
jPHAHA/g4mu401CdjIi6Drq5FuzC2gzFfojJ8+7NWuAPkSuDqbSxBEoMfR4G
/f+WCW2xFhihkG3NAQagjYEqG/Dyil/VVsYU+v34GVT2UVW/jhAtsLSv/btW
XDZLzu5sheksZh4+FQXLokb5I/HXnk6/CaqUOKwhBeZTaWvBevv9XOFd1EXx
tqrsrYDGsfksooTP7IuewA43uQOCQDQlpoqoDj8+fRuTgS1iyjbo/d7FHUYS
bGC28GFCVvpKA6PJwNzXM8Brhd60fJpbau0gXkadlzyTRIRgTP5FufwLO4XE
a3Ca1mVXl/Ds6qeEhhDJZtiyGj2BgNfTmi9+e/q0GOkTf5jzL8iPEn+1Z4+R
ge3Iw69ohLt53j0cPemhnoErYbPsmGeJh0hxA464tmnJ7+GDTKYbm76L+eTT
PtOqBvf9IVhZ0ik14d38mv2iwzKBfaP8UwMHw+2BncCV7Lt1MkMEdHdq6oMZ
ErxJL8nOmHCcPA9RwqftkXBfkkGwSRSoa/RaD9tkNbfQZ/WgHbP9X7SAwR5v
gv+oDRffMoh1ARpWuTmCWZdsndfC7Lluj1h/F0USLt3xusW/krI5CEjR9Jy+
Thl9rc01iVL520o5uk8Sv4D5/YyjUVhT3mE=
=PTET
-----END PGP SIGNATURE-----`;
export const invalidExample = `-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

This message was signed with a different private key
-----BEGIN PGP SIGNATURE-----

wsFzBAEBCAAGBQJhvjrZACEJEK8WujUv4/UnFiEEqzjuybmkbhVdQLywrxa6
NS/j9Se6VRAAg/cogw1vDZZQGVouup0vEiz5gBDSMXXlQd/RgqP/ggZHtMkx
LQCmvvjsWkKE5a2ufblbD9ox3WdwGXJ8ww2GGtWZFdgZ9SjNBbXi5B4p5qBR
Ty9h3DMAowI9g2sD7Gv/eR8UfQvvQ8iWst1FGXyEsQNeGRopy6ucPqST1che
/9Am+mfonA3Oox935XcszmToQhFCjrhwaZHWlT3JP5wB06iC+WQQ0Q7B1pR4
kQzXcWVzrxP4E/RrdTXznlI3Sv+f9s0/kHCO401TaApVpZavDnszDZZRc9h6
WH76y73DZfkfqQGaRvTYR/TWox8mJQodHAdFmC23TTIuDZI/MT8Ab6G4aGiz
+EAm84jntlTVbhhTduK/wxhYZ0hgNp/IoPl/lEmQVlFb+fjR6XpCEz7HUA20
ATukxvka468g+xTe1lpOlkcET23jZjlFYiRYe1laQfpaOIsiarpmK12t9Zku
iE9PufTjcTtXFdmnTHqtnRMmR9z4v6Op+aGv36YUo1Z6s6T2cCx6W1+NqjB+
xVUSbvX7/15W0q/PILMmJFHsbo5Z7Mi3q+TgNMckPblBJLAYAbpm36hOBXfD
ZG1Y0tqIc77OmERq1QK/+PW9v3uvNL6tH4AAAtUfg1VFbq43uO5q7+J7sI3f
rq8Hp7aBVwEd6aDibKatzwjaCpfE0aLwH0U=
=DNkV
-----END PGP SIGNATURE-----`;
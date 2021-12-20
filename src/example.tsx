export const validExample = `
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

This message was signed with the private key that is currently active
-----BEGIN PGP SIGNATURE-----

wsFzBAEBCAAGBQJhv9MaACEJEMj9xnOaKHr0FiEE6H8MBZ40pv8ygKeYyP3G
c5ooevQx3xAAgP27FLM60XFV806oiQz/4HeHLbD2ebYUajHxoF9oA+nlt3/o
EEEz9qdc7mauZ+MnGjvw13OAEda/G80Vtu0MPxM6XZnQFyquHZqxKn54ANkK
LjoAEyYEMgPVct3EpsYnL9fCl7UXN5Rvyqr54nsy1AeiT1CVCNIQBKRV6a87
Slx2KeVHqwtWTEG7okr1yvL3XCrPLO2jWMTaSAwfxC+GQNKvA26lZI3dODu5
KxiqKloKMca4hhk3xvRWWJis5PY1vS4IhcxAckh5BZoVJvw4Ki9o0qL0ehjB
mdYoz/LcMUGv/cA9xdvTZTklaP6RJd0csdjLBo3a+/nBerESdnnTYeg6ikIS
uNinpETYeFtp/+w1n5DQwMN6b9eIKxvgYMohBy5i7W1wvRUd0y26lvZp//na
tSdGSmp1pxNaIrqmA9uXHoVd797CNRk8i6Qw6o3cL5A3gGv3dNYNeBoU25Aq
7H+/Ajk8zLBCgx9taSNs0ck467oLY1iM9zf/mk0kpJtxHEAB1hDo5MuC61Lq
IFM/OXwPTbhtdW2Cw09DQOSScG/SnOohzjphLFQeq8uNHT60C0IuJyZRWrPO
nSu/8PxVwAe5STBlI8KJvcfhKq0AH0fWCtNBSQoyvEJJPZIhoFMgAo/GCjpH
FK4M8Hj9Wykp5aiOIYSMIYI/lrMob7BLjSM=
=nXfd
-----END PGP SIGNATURE-----
`;
export const invalidExample = ` -----BEGIN PGP SIGNED MESSAGE-----
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
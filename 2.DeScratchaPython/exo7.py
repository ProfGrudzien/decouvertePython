a = int(input("Quelle est la valeur de a ? "))
b = int(input("Quelle est la valeur de b ? "))
while a != b :
    if a > b :
        a = a - b
    else :
        b = b - a
print("Le PGCD de a et b est", a)

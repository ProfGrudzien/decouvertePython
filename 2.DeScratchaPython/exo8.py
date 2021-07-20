a = float(input("Choisir un premier nombre "))
b = float(input("Choisir un deuxième nombre "))
c = float(input("Choisir un troisième nombre "))
if a > b :
    if a > c :
        print("le plus grand des trois nombres est", a)
    else :
        print("le plus grand des trois nombres est", c)
else :
    if b > c :
        print("le plus grand des trois nombres est", b)
    else :
        print("le plus grand des trois nombres est", c)

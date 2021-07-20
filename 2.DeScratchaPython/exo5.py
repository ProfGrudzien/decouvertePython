AB = float(input("Donner la longueur du côté AB "))
AC = float(input("Donner la longueur du côté AC "))
BC = float(input("Donner la longueur du côté BC "))
if AB * AB + BC * BC == AC * AC :
    print("Le triangle ABC est rectangle en B.")
else :
    print("Le triangle ABC n'est pas rectangle en B.")

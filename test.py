seuil = int(input("Entier strictement positif : "))
puissance = 1 
exposant = 0 
while puissance < seuil :
    puissance = puissance * 2 
    exposant = exposant + 1 
print(seuil, "est compris entre 2 puissance", exposant - 1, "et 2 puissance", exposant)

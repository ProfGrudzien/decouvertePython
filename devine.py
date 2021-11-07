from random import randint

def choix_cible() :
    return randint(1, 99)

def comparer(proposition, cible) :
    '''
        Compare la proposition du joueur à la cible puis retourne deux valeurs :
          + Le joeur a-t-il trouvé la réponse ? (booléen)
          + Le message à afficher
    '''
    if proposition > cible :
        return(False, "Le nombre recherché est plus petit.")
    elif proposition < cible :
        return(False, "Le nombre recherché est plus grand.")
    else :
        return(True, "Bravo, vous avez trouvé.")

def demander_entier(message) :
    reponse = ""
    while reponse == "" :
        try :
            reponse = int(input(message))
        except :
            print("Saisie non valide")
    return reponse
    
if __name__ == "__main__" :
    print("Bienvenu dans le jeu « devine mon nombre ».")
    print("Vous devez trouvé le nombre compris entre 1 et 99 auquel je pense.")
    print("A chaque proposition, je vous dirai si mon nombre est plus grand ou plus petit que votre proposition.")
    print("Bonne chance !")
    continuer = True
    cible = choix_cible()
    while continuer :
        proposition = demander_entier("Votre proposition : ")
        fin, message = comparer(proposition, cible)
        print(message)
        if fin :
            reponse = input("Souhaitez-vous rejouer ? (oui|non) ")
            if reponse == "oui" :
                cible = choix_cible()
                print("Très bien, commençons une nouvelle partie !")
                continuer = True
            else :
                continuer = False

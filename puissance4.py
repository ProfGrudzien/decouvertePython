def reponse_est_correcte(n) :
    return(0 <= n and n < 7)

def demander_colonne() :
    col = ""
    while col == "" :
        try :
            col = int(input("colonne : "))-1
            if not reponse_est_correcte(col) :
                col = ""
        except :
            print("Saisie non valide")
    return(col)

def creer_grille() :
    return [[0]*7 for i in range(6)]
    
def afficher_grille(G) :
    grille = ""
    for i in range(6) :
        grille += "|".join([str(G[i][j]) for j in range(7)]) + "\n"
    grille = grille.replace("0", "   ")
    grille = grille.replace("1", " O ")
    grille = grille.replace("2", " X ")
    grille += "="*31 + "\n"
    grille += "|".join([" "+str(j+1)+" " for j in range(7)])
    print(grille)
    
def verifier_colonne(grille, col) :
    return grille[0][col] == 0

def enregistrer_choix(G, col, joueur) :
    ligne = 0
    while ligne<5 and G[ligne+1][col]==0 :
        ligne = ligne + 1
    G[ligne][col] = joueur

def verifier_victoire(G, joueur) :
    # vertical :
    for col in range(7) :
        for ligne in range(3) :
            if G[ligne][col]==joueur and G[ligne+1][col]==joueur and G[ligne+2][col]==joueur and G[ligne+3][col]==joueur :
                return True
    # horizontal :
    for ligne in range(6) :
        for col in range(4) :
            if G[ligne][col]==joueur and G[ligne][col+1]==joueur and G[ligne][col+2]==joueur and G[ligne][col+3]==joueur :
                return True
    # diagonale 1 :
    for col in range(4) :
        for ligne in range(3) :
            if G[ligne][col]==joueur and G[ligne+1][col+1]==joueur and G[ligne+2][col+2]==joueur and G[ligne+3][col+3]==joueur :
                return True
    # diagonale 2 :
    for col in range(4) :
        for ligne in range(3,6) :
            if G[ligne][col]==joueur and G[ligne-1][col+1]==joueur and G[ligne-2][col+2]==joueur and G[ligne-3][col+3]==joueur :
                return True
    return False
            
    # diagonale 2 :

def jouer_tour(G, joueur) :
    print("Au tour du joueur ", joueur)
    col = demander_colonne()
    while not verifier_colonne(G, col) :
        print("Cette colonne est pleine !")
        col = demander_colonne()
    enregistrer_choix(G, col, joueur)

def jouer_partie() :
    G = creer_grille()
    n = 42 # nombre de cases vides
    joueur = 2
    while n > 0 and not verifier_victoire(G, joueur) :
        joueur = 3 - joueur
        afficher_grille(G)
        jouer_tour(G, joueur)
    afficher_grille(G)
    if verifier_victoire(G, joueur) :
        print("Le joueur", joueur, "a gagné !")
    else :
        print("La partie se terminer sur une égalité.")

if __name__ == "__main__" :
    jouer_partie()

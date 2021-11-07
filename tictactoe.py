def case_est_vide(G, i, j) :
    return G[i][j] == 0
    
def reponse_est_correcte(n) :
    return(0 <= n and n < 3)

def demander_case() :
    i = ""
    while i == "" :
        try :
            i = int(input("ligne : "))
            if not reponse_est_correcte(i-1) :
                i = ""
        except :
            print("Saisie non valide")
    j = ""
    while j == "" :
        try :
            j = int(input("colonne : "))
            if not reponse_est_correcte(j-1) :
                j = ""
        except :
            print("Saisie non valide") 
    return(i-1, j-1)
    
def afficher_grille(G) :
    grille = str(G[0][0])+"|"+str(G[0][1])+"|"+str(G[0][2])
    grille = grille + "\n---+---+---\n" 
    grille = grille + str(G[1][0])+"|"+str(G[1][1])+"|"+str(G[1][2])
    grille = grille + "\n---+---+---\n"
    grille = grille + str(G[2][0])+"|"+str(G[2][1])+"|"+str(G[2][2])
    grille = grille.replace("0", "   ")
    grille = grille.replace("1", " O ")
    grille = grille.replace("2", " X ")
    print(grille)

def enregistrer_choix(G, i, j, joueur) :
    G[i][j] = joueur

def verifier_victoire(G, joueur) :
    for i in range(3) :
        if G[i][0]==joueur and G[i][1]==joueur and G[i][2]==joueur :
            return True
    for j in range(3) :
        if G[0][j]==joueur and G[1][j]==joueur and G[2][j]==joueur :
            return True
    if G[0][0]==joueur and G[1][1]==joueur and G[2][2]==joueur :
        return True
    if G[0][2]==joueur and G[1][1]==joueur and G[2][0]==joueur :
        return True
    return False

def jouer_tour(G, joueur) :
    print("Au tour du joueur ", joueur)
    i, j = demander_case()
    while not case_est_vide(G, i, j) :
        print("Cette case n'est pas vide !")
        i, j = demander_case()
    enregistrer_choix(G, i, j, joueur)

def tictactoe() :
    G = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    n = 9 # nombre de cases vides
    joueur = 2
    while n > 0 and not verifier_victoire(G, joueur) :
        joueur = 3 - joueur
        afficher_grille(G)
        jouer_tour(G, joueur)
        n = n - 1
    afficher_grille(G)
    if verifier_victoire(G, joueur) :
        print("Le joueur", joueur, "a gagné !")
    else :
        print("La partie se terminer sur une égalité.")

if __name__ == "__main__" :
    tictactoe()

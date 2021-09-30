from random import shuffle, randint, choice
from time import sleep
import UNO

def demander_texte() :
    nom = input("  > ")
    if len(nom) == 0 :
        print("Saisie non valide")
        return demander_texte()
    else :
        return nom
        
def demander_entier_positif() :
    try :
        entier = int(input("  > "))
        if entier > 0 :
            return entier
        print("Saisie non valide")
        return demander_entier_positif()
    except :
        print("Saisie non valide")
        return demander_entier_positif()
        
def demander_couleur() :
    couleur = input("  > ")
    if couleur in ["rouge", "vert", "bleu", "jaune"] :
        return couleur
    else :
        print("Saisie non valide")
        return demander_couleur()

def demander_carte(cartes, valeur, couleur) :
    no = demander_entier_positif() - 1
    if no >= len(cartes) :
        print("Saisie non valide")
        return demander_carte(cartes, valeur, couleur)
    carte = cartes[no]
    if carte.couleur == "noir" or carte.valeur == valeur or carte.couleur == couleur :
        return carte
    print("Impossible de jouer la carte «", carte, "»")
    return demander_carte(cartes, valeur, couleur)

def preparer_affichage(carte) :
    couleurs = {
        "bleu" : "\x1b[1;37;44m",
        "rouge" : "\x1b[1;37;41m",
        "vert" : "\x1b[1;37;42m",
        "jaune" : "\x1b[1;37;43m",
        "noir" : "\x1b[1;37;40m"
    }
    if len(carte.valeur) == 1 :
        texte = "  " + carte.valeur + "  "
    else :
        dico = {
            'changement de sens' : "  🔄 ",
            'interdit de jouer' : "  🚫 ",
            '+2' : " +2🂠 ",
            '+4' : " +4🂠 ",
            'joker' : "  🃏 ",
        }
        texte = dico[carte.valeur]
    return [
        couleurs[carte.couleur] + "     " + "\x1b[0m",
        couleurs[carte.couleur] + texte + "\x1b[0m",
        couleurs[carte.couleur] + "     " + "\x1b[0m",
    ]
    
def afficher_carte(carte) :
    for ligne in preparer_affichage(carte) :
        print("     " + ligne)
    
def afficher_main(main, offset=1) :
    if len(main) > 0 :
        grille = [preparer_affichage(carte) for carte in main[:10]]
        for i in range(3) :
            print(" ".join([partie[i] for partie in grille]))
        if offset == 1 :
            print("  "+"     ".join([str(offset+i) for i in range(len(grille))]))
        else :
            print("  "+"    ".join([str(offset+i) for i in range(len(grille))]))
        afficher_main(main[10:], offset+10)

def choix_carte_humain(joueur, valeur, couleur) :
    joueur.trier_cartes()
    afficher_main(joueur.cartes)
    cartes_jouables = [carte for carte in joueur.cartes if carte.couleur == couleur or carte.valeur == valeur or carte.couleur == 'noir']
    if len(cartes_jouables) > 0 :
        return demander_carte(joueur.cartes, valeur, couleur)
    sleep(5)
    return None

def choix_carte_IA(joueur, valeur, couleur) :
    cartes_jouables = [carte for carte in joueur.cartes if carte.couleur == couleur or carte.valeur == valeur]
    if len(cartes_jouables) > 0 :
        return choice(cartes_jouables)
    cartes_jouables = [carte for carte in joueur.cartes if carte.couleur == "noir"]
    if len(cartes_jouables) > 0 :
        return choice(cartes_jouables)
    return None

def choix_couleur(joueur) :
    if joueur.IA :
        liste_couleur = [carte.couleur for carte in joueur.cartes if carte.couleur != "noir"]
        if len(liste_couleur) == 0 :
            couleur = choice(["rouge", "vert", "bleu", "jaune"])
        else :
            couleur = choice(liste_couleur)
        print(joueur.nom, "demande du", couleur + ".")
        return couleur
    else :
        print("Quelle couleur désirez-vous ?")
        return demander_couleur()

def jouer_tour(jeu, valeur, couleur) :
    sleep(3)
    joueur = jeu.joueur_en_cours()
    if joueur.IA :
        print("Au tour de", joueur.nom + ", il lui reste", joueur.nombre_cartes(), "cartes.")
        carte = choix_carte_IA(joueur, valeur, couleur)
    else :
        print("A vous de jouer :")
        carte = choix_carte_humain(joueur, valeur, couleur)
    if carte == None :
        print(joueur.nom, "pioche 1 carte.")
        joueur.piocher(jeu.pioche)
    else :
        print(joueur.nom, "joue la carte «", carte, "»")
        afficher_carte(carte)
        valeur = carte.valeur
        couleur = carte.couleur
        if carte.valeur == "+4" :
            joueur_suivant = jeu.joueur_suivant()
            print(joueur_suivant.nom, "pioche 4 cartes et passe son tour.")
            for i in range(4) :
                joueur_suivant.piocher(jeu.pioche)
            jeu.interdir_jouer_joueur_suivant()
            couleur = choix_couleur(joueur)
        if carte.valeur == "+2" :
            joueur_suivant = jeu.joueur_suivant()
            print(joueur_suivant.nom, "pioche 2 cartes et passe son tour.")
            for i in range(2) :
                joueur_suivant.piocher(jeu.pioche)
            jeu.interdir_jouer_joueur_suivant()
        if carte.valeur == "changement de sens" :
            print("Le jeu change de sens")
            jeu.changement_de_sens()
        if carte.valeur == "interdit de jouer" :
            joueur_suivant = jeu.joueur_suivant()
            print(joueur_suivant.nom, "passe son tour.")
            jeu.interdir_jouer_joueur_suivant()
        if carte.valeur == "joker" :
            couleur = choix_couleur(joueur)
        jeu.pioche.defausser(jeu.carte_en_cours)
        jeu.carte_en_cours = carte
        joueur.jouer_carte(carte)
    if joueur.main_est_vide() :
        afficher_carte(jeu.carte_en_cours)
        print(joueur.nom, "a gagné ! Bravo !")
    else :
        jeu.fin_tour()
        jouer_tour(jeu, valeur, couleur)
    
def jouer() :
    noms_joueurs = []
    print("Votre nom ?")
    nom = demander_texte()
    print("Combien d'adversaires ?")
    noms_joueurs.append(nom)
    nb_adversaires = demander_entier_positif()
    for i in range(nb_adversaires) :
        print("Le nom de l'adveraire n°", i+1, "?")
        nom = demander_texte()
        noms_joueurs.append(nom)
    jeu = UNO.Jeu(noms_joueurs)
    jeu.joueurs[0].IA= False
    for joueur in jeu.joueurs[1:] :
        joueur.IA = True
    print("Le jeu peut commencer !")
    afficher_carte(jeu.carte_en_cours)
    jouer_tour(jeu, jeu.carte_en_cours.valeur, jeu.carte_en_cours.couleur)

jouer()

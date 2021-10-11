'''Interface pour des automates cellulaires tels que le jeu de la vie de Conway
   '''

from tkinter import *
from grille import Grille
from Conway import Cellule_Conway as Cellule

def automate(cote, hauteur, largeur, coordonnees_cellules_vivantes) :

    grille = Grille(hauteur, largeur, Cellule)

    for coordonnees in coordonnees_cellules_vivantes :
        cellule = grille.lire_valeur(coordonnees[0], coordonnees[1])
        cellule.naitre()

    def dessiner() :
        ''' actualise l'état des cellules dans le canevas '''
        for i in range(hauteur):
            for j in range(largeur):
                cellule = grille.lire_valeur(i, j)
                if cellule.est_en_vie() :
                    canvas.itemconfig(cellule.rectangle, fill="black")
                else :
                    canvas.itemconfig(cellule.rectangle, fill="white")

    def evolution() :
        for i in range(hauteur):
            for j in range(largeur):
                cellule = grille.lire_valeur(i, j)
                cellule.calcul_evolution(grille)
        for i in range(hauteur):
            for j in range(largeur):
                cellule = grille.lire_valeur(i, j)
                cellule.evoluer()

    def suivant() :
        ''' calcul puis dessine l'étape suivante '''
        evolution()
        dessiner()

    def suivant_100() :
        ''' calcul puis dessine l'état après 100 évolutions '''
        for i in range(100) :
            evolution()
        dessiner()

    def redemarrer() :
        ''' reprends un tableau inital et l'affiche '''
        for i in range(hauteur):
            for j in range(largeur):
                cellule = grille.lire_valeur(i, j)
                cellule.mourir()
        for coordonnees in coordonnees_cellules_vivantes :
            cellule = grille.lire_valeur(coordonnees[0], coordonnees[1])
            cellule.naitre()
        dessiner()
    
    def animer() :
        fenetre.continuer = not fenetre.continuer
        start()
    
    def start() :
        if fenetre.continuer :
            suivant()
            fenetre.after(10, start)
   
    fenetre = Tk()
    fenetre.title("Automate cellulaire")
    fenetre.continuer = False

    canvas = Canvas(fenetre, width=cote*largeur, height=cote*hauteur)
    canvas.pack()

    for i in range(hauteur) :
        for j in range(largeur) :
            grille.lire_valeur(i,j).rectangle = canvas.create_rectangle((i*cote, j*cote, (i+1)*cote, (j+1)*cote), outline="gray", fill="white")

    boite = Frame(fenetre)
    boite.pack()

    bouton_suivant = Button(boite, text="évoluer", command = suivant)
    bouton_suivant.pack(side = LEFT)

    bouton_suivant_100 = Button(boite, text="évoluer 100 fois", command = suivant_100)
    bouton_suivant_100.pack(side = LEFT)

    bouton_redemarrer = Button(boite, text="redemarrer", command = redemarrer)
    bouton_redemarrer.pack(side = LEFT)

    bouton_animation = Button(boite, text="start/stop", command = animer)
    bouton_animation.pack(side = LEFT)

    dessiner()

    fenetre.mainloop()

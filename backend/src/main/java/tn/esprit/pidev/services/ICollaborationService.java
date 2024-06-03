package tn.esprit.pidev.services;

import tn.esprit.pidev.entities.Collaboration;
import tn.esprit.pidev.entities.Projet;
import tn.esprit.pidev.entities.User;

import javax.sound.sampled.Port;

public interface ICollaborationService {
    public Collaboration AffecterCollab(User user , Projet projet);
}

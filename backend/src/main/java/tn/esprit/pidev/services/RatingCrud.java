package tn.esprit.pidev.services;


import tn.esprit.pidev.entities.Rating;

public interface RatingCrud {
    public void addRating(Rating r);
    public void deleteRating(Rating r);
}

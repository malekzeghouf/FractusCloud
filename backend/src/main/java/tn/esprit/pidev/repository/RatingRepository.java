package tn.esprit.pidev.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.pidev.entities.Rating;
import tn.esprit.pidev.entities.RendezVous;

@Repository
public interface RatingRepository  extends JpaRepository<Rating,Long> {
    public Rating findByRdv(RendezVous rdv);
    @Modifying
    @Query("DELETE FROM Rating r WHERE r.rdv = :id")
    public void deleteByRdvId(@Param("id")RendezVous id);
}

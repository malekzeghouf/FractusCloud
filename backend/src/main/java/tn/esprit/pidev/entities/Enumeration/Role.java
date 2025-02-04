package tn.esprit.pidev.entities.Enumeration;

import lombok.RequiredArgsConstructor;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static tn.esprit.pidev.entities.Enumeration.Permission.*;


@RequiredArgsConstructor
public enum Role {
   // ADMIN,ETUDIANT,ENTREPRISE

    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_CREATE,
                    ADMIN_PATCH,
                    ADMIN_DELETE,
                    USER_CREATE,
                    USER_DELETE,
                    USER_UPDATE,
                    USER_PATCH,
                    USER_READ
            )
    ),
    ETUDIANT(
            Set.of(
                    USER_CREATE,
                    USER_DELETE,
                    USER_UPDATE,
                    USER_PATCH,
                    USER_READ
            )
    ),

    ENTREPRISE(
            Set.of(
            ENTREPRISE_CREATE,
            ENTREPRISE_DELETE,
            ENTREPRISE_UPDATE,
            ENTREPRISE_PATCH,
            ENTREPRISE_READ
            )
    );


    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities(){
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority( "ROLE_"+ this.name()));
        return authorities;

    }

}
